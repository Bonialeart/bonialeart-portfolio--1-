
import { GalleryItem } from './types';

// In a real scenario, the user would upload their image to an assets folder.
// Since this is a generated environment, we use a placeholder that represents the "Bonialeart" style described (black and white).
// The user should replace this URL with their actual image path.
// Updated to a black and white sketch style image to simulate the logo.
export const MAIN_CHARACTER_IMAGE = "https://www.dropbox.com/scl/fi/qiqiv707pneox7mov6k2l/Logourl.png?rlkey=6xf5lm2cdy24g03ku0xffbqkg&st=undtitur&raw=1";

// New Professional Portrait for About Section
// Dropbox links need 'raw=1' to be used as an image source directly
export const PROFILE_IMAGE = "https://www.dropbox.com/scl/fi/mpmg7z24dvr7j026z2wpt/mifoto.jpg?rlkey=rvelqnb4bautjm3g7q3ppxn52&st=679p4z34&raw=1";

// Link del CV para el botón de descarga. 
export const CV_URL = "https://www.dropbox.com/scl/fi/2ohizarln2fcyyewui401/CV.pdf?rlkey=0jpsyddimwfrf8ovq1nf6r9nh&st=1hy3vidj&dl=1";

export const INITIAL_CONTENT = {
    tagline: "Arte Digital, Diseño, 3D, Fotografia.",
    bio: "Creando mundos visuales únicos que inspiran y cautivan. Arte digital, concept art y fotografía para cine, videojuegos y proyectos creativos",
    aboutMe: "Mi nombre es Alejandro Bonilla, un dedicado artista digital freelance, ilustrador y amante de la fotografia con más de 4 años de experiencia profesional. Mi pasión radica en crear narrativas visuales atractivas y mundos únicos. Me especializo en transformar ideas en visuales cautivadores. Ya sea que necesites ilustraciones impactantes, arte conceptual detallado o pinturas digitales dinámicas, aporto una mezcla de habilidad técnica y visión creativa a cada proyecto.",
    qualities: [
        { title: "Creatividad", description: "Conceptos únicos fuera de lo común", icon: "bulb" },
        { title: "Técnica", description: "Precisión en cada trazo y pixel", icon: "pen" },
        { title: "Innovación", description: "Mezclando estilos 2D y 3D", icon: "cube" }
    ]
};

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 1,
        title: "Crimsom Requiem",
        category: "Digital Painting",
        description: "Conocida solo como la Sacerdotisa de la Serpiente, su rostro marcado por un estigma divino y demoníaco, lidera una procesión silenciosa a través de las ruinas de una antigua fe. Se rumorea que posee el poder de controlar las corrientes de la vida y la muerte, mientras una serpiente albina, símbolo de tentación y sabiduría, se enrosca a su alrededor. 'Crimson Requiem' es una ventana a un momento crucial, donde el destino de un mundo pende de la balanza de sus decisiones, un acto final en una sinfonía de sangre y redención.",
        url: "https://www.dropbox.com/scl/fi/d7qztimmnw6qc8c0l2qvf/Monja.jpg?rlkey=2l3n87ekbu4n3ph7e5h2cgphq&st=2lk7314k&raw=1",
        media: [
            { type: 'image', url: "https://www.dropbox.com/scl/fi/d7qztimmnw6qc8c0l2qvf/Monja.jpg?rlkey=2l3n87ekbu4n3ph7e5h2cgphq&st=2lk7314k&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/y0qihe3kvjtp2yin37vih/Monjasketch.png?rlkey=oy7bwf2yb9mpdvmx770bjjtpu&st=h0cyc9zq&raw=1" },
            {
                type: 'video',
                url: "https://www.dropbox.com/scl/fi/nqupjuawfwp6702wv0ivx/video4967876765910304751.mp4?rlkey=v3o255vbzij1r18apdd4g3n0e&st=wck567c2&raw=1",
                thumbnail: "https://www.dropbox.com/scl/fi/d7qztimmnw6qc8c0l2qvf/Monja.jpg?rlkey=2l3n87ekbu4n3ph7e5h2cgphq&st=2lk7314k&raw=1"
            }
        ]
    },
    {
        id: 2,
        title: "Wukong",
        category: "Digital Painting",
        objectPosition: "left center",
        description: "Esta impactante ilustración digital retrata a Sun Wukong, el Rey Mono, en una pose de batalla feroz y dinámica, en medio de una tormenta. Con pelaje blanco y una barba imponente que enmarca un rostro lleno de determinación, sus ojos brillan con una luz amarilla intensa. Viste un atuendo oscuro, posiblemente de color púrpura o granate, y luce brazaletes dorados en sus muñecas, un gran collar de cuentas oscuras alrededor de su cuello y la icónica diadema dorada (el filete dorado) flotando justo encima de su cabeza.",
        url: "https://www.dropbox.com/scl/fi/ar6n72ydqsk7qbjpfhnfj/alejandro-bonilla-wukong3-color-correct.jpg?rlkey=isspq41p8ub3adv96ra958ugs&st=ufbz9ydm&raw=1",
        media: [
            { type: 'image', url: "https://www.dropbox.com/scl/fi/ar6n72ydqsk7qbjpfhnfj/alejandro-bonilla-wukong3-color-correct.jpg?rlkey=isspq41p8ub3adv96ra958ugs&st=ufbz9ydm&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/2z64byr1i3hbk09zjeqvp/alejandro-bonilla-wukong3.jpg?rlkey=9uhkbyebh8ee7dsbohtt9sosy&st=tm48rggj&raw=1" },
            {
                type: 'video',
                url: "https://cdn.artstation.com/p/video_sources/001/589/471/video-sin-titulo-hecho-con-clipchamp.mp4",
                thumbnail: "https://cdnb.artstation.com/p/assets/images/images/068/156/463/large/alejandro-bonilla-wukong3-color-correct.jpg?1697115257"
            }
        ]
    },
    {
        id: 3,
        title: "Aurora",
        category: "3d",
        description: "Una fusión de tecnología y arte, irradiando desde la frontera digital. Este diseño 3D encarna a un guardián silencioso, emitiendo un brillo etéreo que invita a la exploración. Una nueva forma que redefine la belleza de la forma digital.",
        url: "https://cdna.artstation.com/p/assets/images/images/054/247/668/large/alejandro-bonilla-practica-final7.jpg?1664113123",
        media: [
            { type: 'image', url: "https://cdna.artstation.com/p/assets/images/images/054/247/668/large/alejandro-bonilla-practica-final7.jpg?1664113123" },
            { type: 'image', url: "https://cdna.artstation.com/p/assets/images/images/054/247/700/large/alejandro-bonilla-captura-de-pantalla-2022-09-25-093917.jpg?1664113171" }
        ]
    },
    {
        id: 4,
        title: "Vending Machine Serenity",
        category: "3d",
        description: "Esta pieza es un render 3D con una animación sutil, creado en Blender, que retrata una máquina expendedora solitaria. Aunque es un modelo tridimensional, se ha aplicado un estilo visual de cel-shading (o toon shading) para emular la estética de un dibujo animado 2D, con contornos definidos y una paleta de colores suaves. La máquina está ubicada en un entorno natural inesperado —sobre un pequeño parche de adoquines rodeado de hierba y flores—, creando un contraste intrigante. La animación consiste en una línea blanca y etérea que serpentea por la escena, interactuando de forma abstracta con la máquina y añadiendo un toque de misterio o magia al ambiente tranquilo y ligeramente melancólico..",
        url: "https://www.dropbox.com/scl/fi/ei3n1qpns1agovxei0ocn/Maquina.png?rlkey=eyxl9ggd3mo4iukgry5ln0zft&st=ge5zmfk8&raw=1",
        media: [
            { type: 'image', url: "https://www.dropbox.com/scl/fi/ei3n1qpns1agovxei0ocn/Maquina.png?rlkey=eyxl9ggd3mo4iukgry5ln0zft&st=ge5zmfk8&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/1i068iulj23wh2hrfatpi/Maquina-3.png?rlkey=bylob2c1ygi1w9br9ug6gtpwv&st=2sti98wi&raw=1" },
            {
                type: 'video',
                url: "https://www.dropbox.com/scl/fi/p9phbmc0pptwie7illm14/Maquina.mp4?rlkey=93n1fdxwsumyai7t6z1qln4pu&st=oje40q8o&raw=1",
                thumbnail: "https://www.dropbox.com/scl/fi/ei3n1qpns1agovxei0ocn/Maquina.png?rlkey=eyxl9ggd3mo4iukgry5ln0zft&st=ge5zmfk8&raw=1"
            }
        ]
    },
    {
        id: 5,
        title: "Vida Salvaje y Doméstica: Una Mirada Cercana",
        category: "Photography",
        description: "Esta colección fotográfica explora la belleza y singularidad del mundo animal, capturando momentos íntimos y expresiones auténticas. Desde la serenidad del reposo hasta la alerta curiosidad, cada imagen busca revelar la esencia de sus protagonistas en su entorno natural o cotidiano, jugando con la luz y la textura para transmitir la emoción del instante",
        url: "https://www.dropbox.com/scl/fi/f2yzgd0jm8rpba69a6nwt/IMG_1489.jpg?rlkey=1l3tt91ve10yjbqmx6uy0jq0c&st=gw8q8l1g&raw=1",
        media: [
            { type: 'image', url: "https://www.dropbox.com/scl/fi/f2yzgd0jm8rpba69a6nwt/IMG_1489.jpg?rlkey=1l3tt91ve10yjbqmx6uy0jq0c&st=gw8q8l1g&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/tku62frxlap1400s90o6g/animal4.JPG?rlkey=q3c5csxnus2k0s811npiip3kd&st=afzz1fw4&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/s47271i6eco3p0bce3hie/pajarito1.jpg?rlkey=cv3nwueee9z1lzje7nixp8ayg&st=aeu67rlo&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/83kxg7q1ub84un05zf6nj/animal5.jpg?rlkey=fi71xxmzjiuhahlzae6tgunfi&st=ydyxdn64&raw=1" }
        ],
        cameraInfo: {
            model: "Canon EOS R5",
            lens: "RF 85mm f/1.2L USM",
            aperture: "f/1.8",
            shutterSpeed: "1/200s",
            iso: "100"
        }
    },
    {
        id: 6,
        title: "Practica",
        category: "Sketches",
        description: "Paisaje retro-futurista inspirado en la estética de los años 80.",
        url: "https://www.dropbox.com/scl/fi/wmmrk2b9kfht33eyyyicr/sketch5.jpg?rlkey=bvt92p1o1hrzncpcbssa3fwo1&st=qrawr5ub&raw=1",
        media: [
            { type: 'image', url: "https://www.dropbox.com/scl/fi/wmmrk2b9kfht33eyyyicr/sketch5.jpg?rlkey=bvt92p1o1hrzncpcbssa3fwo1&st=qrawr5ub&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/habbt5m2pvzz5v5l2rt11/sketch3.jpg?rlkey=yhcp3mes3d9bjmyalma930zn6&st=pnsy5hv0&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/6abgj8wspws4hxsd1p0sa/Sketch.jpg?rlkey=270n385azlyhq3pdfp1elmjcq&st=sw47tzgk&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/jkek4cbvkfy78soz99r8a/skecth4.png?rlkey=w39etx4h24i0xyk9296chg5id&st=3r9smzgz&raw=1" }
        ]
    },
    {
        id: 7,
        title: "Visitantes Emplumados",
        category: "Photography",
        description: "Esta serie fotográfica presenta una colección de aves capturadas en momentos espontáneos, a menudo a través del umbral de una ventana o en la cercanía del hogar. Cada imagen es un testimonio de la belleza y adaptabilidad de estas criaturas aladas, revelando sus colores, texturas y expresiones en encuentros fugaces que invitan a la observación paciente y al aprecio por la naturaleza que nos rodea",
        url: "https://www.dropbox.com/scl/fi/ympd2mwx1nkq0qa7hzm5n/pajarito3.jpg?rlkey=i984evqnisxgrcd6owjdqkpdo&st=9ucetxxs&raw=1",
        media: [
            { type: 'image', url: "https://www.dropbox.com/scl/fi/ympd2mwx1nkq0qa7hzm5n/pajarito3.jpg?rlkey=i984evqnisxgrcd6owjdqkpdo&st=9ucetxxs&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/s47271i6eco3p0bce3hie/pajarito1.jpg?rlkey=cv3nwueee9z1lzje7nixp8ayg&st=fc6p22un&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/54kcrd4fpw1cx6rul0wen/pajarito5.jpg?rlkey=au88w4uk9o41wz7thoqrporz5&st=ctes28is&raw=1" },
            { type: 'image', url: "https://www.dropbox.com/scl/fi/x1ly2qwgq6ts6c1kzw9uh/pajarito4.jpg?rlkey=6nkiqo8rd0oi0xo8cs5ywhgf0&st=lbruqfrf&raw=1" }
        ]
    },
    {
        id: 8,
        title: "Aquarium Agustin Codazzi",
        category: "Design",
        description: "Un sistema integral de identidad de marca diseñado para el Aquarium Agustin Codazzi. Este proyecto abarca el rediseño del logotipo, la selección de una paleta de colores marinos y vibrantes, la jerarquía tipográfica y la aplicación en diversos soportes. El objetivo fue crear una imagen fresca y moderna que invite a la conservación y el aprendizaje.",
        url: "https://www.dropbox.com/scl/fi/erwe5ypbrw6npwbf782xa/Portfolio-Cover.png?rlkey=pssu0u5q3n31rpjeiy6ax7uxp&st=3xahkbvo&raw=1",
        media: [],
        technicalInfo: {
            software: "Adobe Illustrator, Photoshop",
            year: "2024",
            dimensions: "Vectorial",
            technique: "Branding & Identidad Visual"
        },
        bentoData: [
            // 1. Main Logo (Large Square, Top Left)
            {
                type: 'logo',
                colSpan: 2,
                rowSpan: 2,
                backgroundColor: '#ffffff',
                img: 'https://www.dropbox.com/scl/fi/mvdt32ctuafz33wdhdsol/Recurso-126biologia_ucv-logotipo-isotipo-traspa.png?rlkey=l5tggnbujnhpto0hkdkqxnzwa&st=t1wc0vlq&raw=1'
            },
            // 2. T-Shirt Mockup (Large Square, Top Right)
            {
                type: 'mockup',
                colSpan: 2,
                rowSpan: 2,
                img: 'https://www.dropbox.com/scl/fi/z6qrrqmp19sfi81crvoj1/Camisa-acuario-agustin-codazzi.png?rlkey=78xfuvgmtu8dfqmm8zf9j269l&st=8qpzdul3&raw=1'
            },
            // 3. Secondary Logo / Badge (Wide Rectangle, Middle Left)
            {
                type: 'logo',
                colSpan: 2,
                rowSpan: 1,
                backgroundColor: '#0f172a', // Dark theme for contrast
                img: 'https://www.dropbox.com/scl/fi/w0t22hrqs0dpekv59e22g/Logotipo.png?rlkey=3rxy8gh4ja0frwokshsjqa6cw&st=gaieduua&raw=1'
            },
            // 4. Color Palette (Wide Rectangle, Middle Right)
            {
                type: 'color-palette',
                colSpan: 2,
                rowSpan: 1,
                backgroundColor: '#ffffff',
                colors: [
                    { hex: '#6990CB', name: 'Serenity' },
                    { hex: '#F5F9FF', name: 'Ice' },
                    { hex: '#28285B', name: 'Navy' }
                ]
            },
            // 5. Manual de Marca (Small)
            {
                type: 'logo',
                colSpan: 1,
                rowSpan: 1,
                backgroundColor: '#000000ff',
                imgFit: 'contain',
                img: 'https://www.dropbox.com/scl/fi/9274l6uac2jhx2sp5k0tv/manual.png?rlkey=5wbkjbvh6p3xorfd6wce8zjgf&st=jrqgvm7g&raw=1',
            },
            // 6. Logo Variation White (Small)
            {
                type: 'logo',
                colSpan: 1,
                rowSpan: 1,
                backgroundColor: '#28285B', // Navy bg for white logo
                imgFit: 'contain',
                img: 'https://www.dropbox.com/scl/fi/g1hyknmful91c7pnoxsii/logo-en-blanco.png?rlkey=nl6f3vfegl6645n7e9oawenx6&st=emhntt0i&raw=1'
            },
            // 7. Logo Variation Black (Small)
            {
                type: 'logo',
                colSpan: 1,
                rowSpan: 1,
                backgroundColor: '#F5F9FF', // Light bg for black logo
                imgFit: 'contain',
                img: 'https://www.dropbox.com/scl/fi/x2s3j6p75vl3u4fnicgnl/logo-negro.png?rlkey=xg0btulviqcl0i3e9vd1bz3vu&st=04yuk5ob&raw=1'
            },
            // 8. Brand Pattern (Small Filler)
            {
                type: 'pattern',
                colSpan: 1,
                rowSpan: 1,
                backgroundColor: '#6990CB', // Serenity Blue
                img: 'https://www.dropbox.com/scl/fi/mvdt32ctuafz33wdhdsol/Recurso-126biologia_ucv-logotipo-isotipo-traspa.png?rlkey=l5tggnbujnhpto0hkdkqxnzwa&st=t1wc0vlq&raw=1'
            },
            // 9. Instagram Mockup (Large Square, Bottom Left)
            {
                type: 'mockup',
                colSpan: 2,
                rowSpan: 2,
                img: 'https://www.dropbox.com/scl/fi/5gltfp2zre6gtmczq5pbm/Instagram-acuario-agustin-codazzi.png?rlkey=221sihfqtn4azmw9vkb3ce0mo&st=c3t47nmi&raw=1'
            },
            // 10. Pendon Mockup (Large Square, Bottom Right)
            {
                type: 'mockup',
                colSpan: 2,
                rowSpan: 2,
                img: 'https://www.dropbox.com/scl/fi/yb6p2zci4ewp9il4tybk7/Pendon.png?rlkey=ahju6aiypjxzst37qm7y4cyyf&st=9nais0ga&raw=1'
            }
        ],
        mockups: [
            { url: "https://www.dropbox.com/scl/fi/z6qrrqmp19sfi81crvoj1/Camisa-acuario-agustin-codazzi.png?rlkey=78xfuvgmtu8dfqmm8zf9j269l&st=8qpzdul3&raw=1", title: "Merchandising", description: "Camisetas oficiales." },
            { url: "https://www.dropbox.com/scl/fi/yb6p2zci4ewp9il4tybk7/Pendon.png?rlkey=ahju6aiypjxzst37qm7y4cyyf&st=9nais0ga&raw=1", title: "Señalética", description: "Identidad en espacios." },
            { url: "https://www.dropbox.com/scl/fi/5gltfp2zre6gtmczq5pbm/Instagram-acuario-agustin-codazzi.png?rlkey=221sihfqtn4azmw9vkb3ce0mo&st=c3t47nmi&raw=1", title: "Social Media", description: "Feed de Instagram." }
        ],
        process: [
            {
                url: "https://www.dropbox.com/scl/fi/nqobokxve1dt5gsskiges/Logo-version-1.png?rlkey=596z2ctysyel9nwijo0x6hsw3&st=60gd9crc&raw=1",
                title: "Concepto A: Pez Completo",
                description: "Una exploración figurativa buscando representar la vida marina de forma directa, utilizando la silueta completa para generar reconocimiento inmediato."
            },
            {
                url: "https://www.dropbox.com/scl/fi/tdjq66u8ly6teg5iguh2t/Logo-version-2.png?rlkey=oso92usmcmkvmwzq7br0h4pi8&st=ax3gzjj8&raw=1",
                title: "Concepto B: Arquitectura",
                description: "Abstracción geométrica inspirada en los arcos y líneas estructurales de la fachada icónica del edificio del Acuario Agustin Codazzi."
            },
            {
                url: "https://www.dropbox.com/scl/fi/8p2rn6pgqeu63ab4rjr0p/Logo-version-3.png?rlkey=vdbivcdn9x2i705af3wywvw0p&st=0hyoyurm&raw=1",
                title: "Concepto C: Evolución",
                description: "Una iteración previa a la final, donde se busca sintetizar la forma orgánica del pez con un estilo más moderno y minimalista, acercándose a la solución definitiva."
            }
        ]
    }
];

export const CATEGORY_TRANSLATIONS: Record<string, string> = {
    'Digital Painting': 'Ilustración Digital',
    '3d': '3D',
    'Sketches': 'Bocetos',
    'Design': 'Diseño',
    'Photography': 'Fotografía'
};

export const POLAROID_TEXT = {
    left: "23 AÑOS",
    right: "Vnzl"
};

export const SERVICES = [
    {
        id: 1,
        title: "Ilustración Digital",
        description: "Creación de personajes, arte conceptual y portadas de libros con un estilo único y detallado.",
        icon: "palette",
        price: "Desde $50"
    },
    {
        id: 2,
        title: "Modelado 3D",
        description: "Modelado de assets, personajes y entornos 3D optimizados para videojuegos o renderizado.",
        icon: "box",
        price: "Desde $80"
    },
    {
        id: 3,
        title: "Fotografía",
        description: "Sesiones fotográficas de retrato, producto y eventos. Capturando la esencia de cada momento.",
        icon: "camera",
        price: "Consultar"
    }
];
