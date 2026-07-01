// One-off migration script: downloads all Dropbox-hosted assets referenced in the
// source and re-hosts them locally under /public/assets, converting images to webp.
// Run with: node scripts/migrate-assets.mjs
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const SOURCE_FILES = [
    'constants.ts',
    'index.html',
    path.join('components', 'Navigation.tsx'),
];

// filename (lowercase, no query) -> { dir, slug }
const SLUG_MAP = {
    'logourl.png': { dir: 'branding', slug: 'logo-mark' },
    'logo.png': { dir: 'branding', slug: 'nav-logo' },
    'mifoto.jpg': { dir: 'branding', slug: 'profile-portrait' },
    'cv.pdf': { dir: 'documents', slug: 'alejandro-bonilla-cv' },
    'monja.jpg': { dir: 'gallery', slug: 'crimson-requiem-final' },
    'monjasketch.png': { dir: 'gallery', slug: 'crimson-requiem-sketch' },
    'video4967876765910304751.mp4': { dir: 'gallery', slug: 'crimson-requiem-process' },
    'maquina.png': { dir: 'gallery', slug: 'vending-machine-serenity-1' },
    'maquina-3.png': { dir: 'gallery', slug: 'vending-machine-serenity-2' },
    'maquina.mp4': { dir: 'gallery', slug: 'vending-machine-serenity-animation' },
    'img_1489.jpg': { dir: 'gallery', slug: 'wildlife-portrait-1' },
    'animal4.jpg': { dir: 'gallery', slug: 'wildlife-portrait-2' },
    'animal5.jpg': { dir: 'gallery', slug: 'wildlife-portrait-3' },
    'pajarito1.jpg': { dir: 'gallery', slug: 'feathered-visitors-1' },
    'pajarito3.jpg': { dir: 'gallery', slug: 'feathered-visitors-3' },
    'pajarito4.jpg': { dir: 'gallery', slug: 'feathered-visitors-4' },
    'pajarito5.jpg': { dir: 'gallery', slug: 'feathered-visitors-5' },
    'sketch5.jpg': { dir: 'gallery', slug: 'neon-horizon-1' },
    'sketch3.jpg': { dir: 'gallery', slug: 'neon-horizon-2' },
    'sketch.jpg': { dir: 'gallery', slug: 'neon-horizon-3' },
    'skecth4.png': { dir: 'gallery', slug: 'neon-horizon-4' },
    'portfolio-cover.png': { dir: 'gallery', slug: 'aquarium-cover' },
    'recurso-126biologia_ucv-logotipo-isotipo-traspa.png': { dir: 'gallery', slug: 'aquarium-logo-icon' },
    'camisa-acuario-agustin-codazzi.png': { dir: 'gallery', slug: 'aquarium-tshirt-mockup' },
    'logotipo.png': { dir: 'gallery', slug: 'aquarium-logo-secondary' },
    'manual.png': { dir: 'gallery', slug: 'aquarium-brand-manual' },
    'logo-en-blanco.png': { dir: 'gallery', slug: 'aquarium-logo-white' },
    'logo-negro.png': { dir: 'gallery', slug: 'aquarium-logo-black' },
    'instagram-acuario-agustin-codazzi.png': { dir: 'gallery', slug: 'aquarium-instagram-mockup' },
    'pendon.png': { dir: 'gallery', slug: 'aquarium-banner-mockup' },
    'logo-version-1.png': { dir: 'gallery', slug: 'aquarium-process-concept-a' },
    'logo-version-2.png': { dir: 'gallery', slug: 'aquarium-process-concept-b' },
    'logo-version-3.png': { dir: 'gallery', slug: 'aquarium-process-concept-c' },
};

function slugify(filename) {
    return filename
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function main() {
    const contents = {};
    for (const file of SOURCE_FILES) {
        contents[file] = await readFile(path.join(ROOT, file), 'utf-8');
    }

    const idRegex = /https:\/\/www\.dropbox\.com\/scl\/fi\/([a-zA-Z0-9]+)\/([^?"'\s]+)\?[^"'\s]*/g;
    const byId = new Map(); // id -> { filename, url }

    for (const file of SOURCE_FILES) {
        for (const match of contents[file].matchAll(idRegex)) {
            const [url, id, filename] = match;
            if (!byId.has(id)) {
                byId.set(id, { filename: decodeURIComponent(filename), url });
            }
        }
    }

    console.log(`Found ${byId.size} unique Dropbox assets to migrate.`);

    const idToLocalPath = new Map();
    let ok = 0, failed = 0;

    for (const [id, { filename, url }] of byId.entries()) {
        const lowerName = filename.toLowerCase();
        const mapped = SLUG_MAP[lowerName];
        const ext = path.extname(lowerName);
        const dir = mapped?.dir ?? 'gallery';
        const slug = mapped?.slug ?? slugify(filename);

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const buffer = Buffer.from(await res.arrayBuffer());

            let outRelPath;
            const outDir = path.join(PUBLIC_DIR, 'assets', dir);
            await mkdir(outDir, { recursive: true });

            if (ext === '.mp4' || ext === '.pdf') {
                outRelPath = `assets/${dir}/${slug}${ext}`;
                await writeFile(path.join(PUBLIC_DIR, outRelPath), buffer);
            } else {
                outRelPath = `assets/${dir}/${slug}.webp`;
                const image = sharp(buffer).rotate();
                const meta = await image.metadata();
                const resized = meta.width && meta.width > 2200 ? image.resize({ width: 2200 }) : image;
                await resized.webp({ quality: 84 }).toFile(path.join(PUBLIC_DIR, outRelPath));
            }

            idToLocalPath.set(id, '/' + outRelPath.replace(/\\/g, '/'));
            console.log(`OK   ${filename} -> ${outRelPath}`);
            ok++;
        } catch (err) {
            console.error(`FAIL ${filename} (${url}): ${err.message}`);
            failed++;
        }
    }

    // Rewrite source files: replace every Dropbox URL occurrence with its local path
    for (const file of SOURCE_FILES) {
        let text = contents[file];
        text = text.replace(idRegex, (full, id) => {
            const local = idToLocalPath.get(id);
            return local ?? full; // leave untouched if download failed
        });
        await writeFile(path.join(ROOT, file), text, 'utf-8');
    }

    console.log(`\nDone. ${ok} migrated, ${failed} failed.`);
    if (failed > 0) {
        console.log('Failed assets were left pointing at Dropbox — rerun the script or fix manually.');
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
