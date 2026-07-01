
import { GalleryItem } from './types';

export const MAIN_CHARACTER_IMAGE = "/assets/branding/logo-mark.webp";

export const PROFILE_IMAGE = "/assets/branding/profile-portrait.webp";

// Link del CV para el botón de descarga. 
export const CV_URL = "/assets/documents/alejandro-bonilla-cv.pdf";

export const INITIAL_CONTENT = {
    tagline: "Arte Digital, Diseño, 3D, Fotografía.",
    bio: "Creando mundos visuales únicos que inspiran y cautivan. Arte digital, concept art y fotografía para cine, videojuegos y proyectos creativos",
    aboutMe: "Mi nombre es Alejandro Bonilla, un dedicado artista digital freelance, ilustrador y amante de la fotografía con más de 4 años de experiencia profesional. Mi pasión radica en crear narrativas visuales atractivas y mundos únicos. Me especializo en transformar ideas en visuales cautivadores. Ya sea que necesites ilustraciones impactantes, arte conceptual detallado o pinturas digitales dinámicas, aporto una mezcla de habilidad técnica y visión creativa a cada proyecto.",
    qualities: [
        { title: "Creatividad", description: "Conceptos únicos fuera de lo común", icon: "bulb" },
        { title: "Técnica", description: "Precisión en cada trazo y pixel", icon: "pen" },
        { title: "Innovación", description: "Mezclando estilos 2D y 3D", icon: "cube" }
    ]
};

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 1,
        title: "Crimson Requiem",
        category: "Digital Painting",
        description: "Conocida solo como la Sacerdotisa de la Serpiente, su rostro marcado por un estigma divino y demoníaco, lidera una procesión silenciosa a través de las ruinas de una antigua fe. Se rumorea que posee el poder de controlar las corrientes de la vida y la muerte, mientras una serpiente albina, símbolo de tentación y sabiduría, se enrosca a su alrededor. 'Crimson Requiem' es una ventana a un momento crucial, donde el destino de un mundo pende de la balanza de sus decisiones, un acto final en una sinfonía de sangre y redención.",
        url: "/assets/gallery/crimson-requiem-final.webp",
        media: [
            { type: 'image', url: "/assets/gallery/crimson-requiem-final.webp" },
            { type: 'image', url: "/assets/gallery/crimson-requiem-sketch.webp" },
            {
                type: 'video',
                url: "/assets/gallery/crimson-requiem-process.mp4",
                thumbnail: "/assets/gallery/crimson-requiem-final.webp"
            }
        ]
    },
    {
        id: 2,
        title: "Wukong",
        category: "Digital Painting",
        objectPosition: "left center",
        description: "Esta impactante ilustración digital retrata a Sun Wukong, el Rey Mono, en una pose de batalla feroz y dinámica, en medio de una tormenta. Con pelaje blanco y una barba imponente que enmarca un rostro lleno de determinación, sus ojos brillan con una luz amarilla intensa. Viste un atuendo oscuro, posiblemente de color púrpura o granate, y luce brazaletes dorados en sus muñecas, un gran collar de cuentas oscuras alrededor de su cuello y la icónica diadema dorada (el filete dorado) flotando justo encima de su cabeza.",
        url: "/assets/gallery/alejandro-bonilla-wukong3-color-correct.webp",
        media: [
            { type: 'image', url: "/assets/gallery/alejandro-bonilla-wukong3-color-correct.webp" },
            { type: 'image', url: "/assets/gallery/alejandro-bonilla-wukong3.webp" },
            {
                type: 'video',
                url: "/assets/gallery/wukong-process.mp4",
                thumbnail: "/assets/gallery/alejandro-bonilla-wukong3-color-correct.webp"
            }
        ]
    },
    {
        id: 3,
        title: "Aurora",
        category: "3d",
        description: "Una fusión de tecnología y arte, irradiando desde la frontera digital. Este diseño 3D encarna a un guardián silencioso, emitiendo un brillo etéreo que invita a la exploración. Una nueva forma que redefine la belleza de la forma digital.",
        url: "/assets/gallery/aurora-1.jpg",
        media: [
            { type: 'image', url: "/assets/gallery/aurora-1.jpg" },
            { type: 'image', url: "/assets/gallery/aurora-2.jpg" }
        ]
    },
    {
        id: 4,
        title: "Vending Machine Serenity",
        category: "3d",
        description: "Esta pieza es un render 3D con una animación sutil, creado en Blender, que retrata una máquina expendedora solitaria. Aunque es un modelo tridimensional, se ha aplicado un estilo visual de cel-shading (o toon shading) para emular la estética de un dibujo animado 2D, con contornos definidos y una paleta de colores suaves. La máquina está ubicada en un entorno natural inesperado —sobre un pequeño parche de adoquines rodeado de hierba y flores—, creando un contraste intrigante. La animación consiste en una línea blanca y etérea que serpentea por la escena, interactuando de forma abstracta con la máquina y añadiendo un toque de misterio o magia al ambiente tranquilo y ligeramente melancólico.",
        url: "/assets/gallery/vending-machine-serenity-1.webp",
        media: [
            { type: 'image', url: "/assets/gallery/vending-machine-serenity-1.webp" },
            { type: 'image', url: "/assets/gallery/vending-machine-serenity-2.webp" },
            {
                type: 'video',
                url: "/assets/gallery/vending-machine-serenity-animation.mp4",
                thumbnail: "/assets/gallery/vending-machine-serenity-1.webp"
            }
        ]
    },
    {
        id: 5,
        title: "Vida Salvaje y Doméstica: Una Mirada Cercana",
        category: "Photography",
        description: "Esta colección fotográfica explora la belleza y singularidad del mundo animal, capturando momentos íntimos y expresiones auténticas. Desde la serenidad del reposo hasta la alerta curiosidad, cada imagen busca revelar la esencia de sus protagonistas en su entorno natural o cotidiano, jugando con la luz y la textura para transmitir la emoción del instante",
        url: "/assets/gallery/wildlife-portrait-1.webp",
        media: [
            { type: 'image', url: "/assets/gallery/wildlife-portrait-1.webp" },
            { type: 'image', url: "/assets/gallery/wildlife-portrait-2.webp" },
            { type: 'image', url: "/assets/gallery/feathered-visitors-1.webp" },
            { type: 'image', url: "/assets/gallery/wildlife-portrait-3.webp" }
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
        title: "Horizonte Neón",
        category: "Sketches",
        description: "Estudio de perspectiva y atmósfera ambientado en un paisaje retro-futurista inspirado en la estética synthwave de los años 80: horizontes bajos, luces de neón y una paleta de contraste cálido-frío para explorar profundidad y mood antes de pasar a piezas finales.",
        url: "/assets/gallery/neon-horizon-1.webp",
        media: [
            { type: 'image', url: "/assets/gallery/neon-horizon-1.webp" },
            { type: 'image', url: "/assets/gallery/neon-horizon-2.webp" },
            { type: 'image', url: "/assets/gallery/neon-horizon-3.webp" },
            { type: 'image', url: "/assets/gallery/neon-horizon-4.webp" }
        ]
    },
    {
        id: 7,
        title: "Visitantes Emplumados",
        category: "Photography",
        description: "Esta serie fotográfica presenta una colección de aves capturadas en momentos espontáneos, a menudo a través del umbral de una ventana o en la cercanía del hogar. Cada imagen es un testimonio de la belleza y adaptabilidad de estas criaturas aladas, revelando sus colores, texturas y expresiones en encuentros fugaces que invitan a la observación paciente y al aprecio por la naturaleza que nos rodea",
        url: "/assets/gallery/feathered-visitors-3.webp",
        media: [
            { type: 'image', url: "/assets/gallery/feathered-visitors-3.webp" },
            { type: 'image', url: "/assets/gallery/feathered-visitors-1.webp" },
            { type: 'image', url: "/assets/gallery/feathered-visitors-5.webp" },
            { type: 'image', url: "/assets/gallery/feathered-visitors-4.webp" }
        ]
    },
    {
        id: 8,
        title: "Aquarium Agustín Codazzi",
        category: "Design",
        description: "Un sistema integral de identidad de marca diseñado para el Aquarium Agustín Codazzi. Este proyecto abarca el rediseño del logotipo, la selección de una paleta de colores marinos y vibrantes, la jerarquía tipográfica y la aplicación en diversos soportes. El objetivo fue crear una imagen fresca y moderna que invite a la conservación y el aprendizaje.",
        url: "/assets/gallery/aquarium-cover.webp",
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
                img: '/assets/gallery/aquarium-logo-icon.webp'
            },
            // 2. T-Shirt Mockup (Large Square, Top Right)
            {
                type: 'mockup',
                colSpan: 2,
                rowSpan: 2,
                img: '/assets/gallery/aquarium-tshirt-mockup.webp'
            },
            // 3. Secondary Logo / Badge (Wide Rectangle, Middle Left)
            {
                type: 'logo',
                colSpan: 2,
                rowSpan: 1,
                backgroundColor: '#0f172a', // Dark theme for contrast
                img: '/assets/gallery/aquarium-logo-secondary.webp'
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
                img: '/assets/gallery/aquarium-brand-manual.webp',
            },
            // 6. Logo Variation White (Small)
            {
                type: 'logo',
                colSpan: 1,
                rowSpan: 1,
                backgroundColor: '#28285B', // Navy bg for white logo
                imgFit: 'contain',
                img: '/assets/gallery/aquarium-logo-white.webp'
            },
            // 7. Logo Variation Black (Small)
            {
                type: 'logo',
                colSpan: 1,
                rowSpan: 1,
                backgroundColor: '#F5F9FF', // Light bg for black logo
                imgFit: 'contain',
                img: '/assets/gallery/aquarium-logo-black.webp'
            },
            // 8. Brand Pattern (Small Filler)
            {
                type: 'pattern',
                colSpan: 1,
                rowSpan: 1,
                backgroundColor: '#6990CB', // Serenity Blue
                img: '/assets/gallery/aquarium-logo-icon.webp'
            },
            // 9. Instagram Mockup (Large Square, Bottom Left)
            {
                type: 'mockup',
                colSpan: 2,
                rowSpan: 2,
                img: '/assets/gallery/aquarium-instagram-mockup.webp'
            },
            // 10. Pendon Mockup (Large Square, Bottom Right)
            {
                type: 'mockup',
                colSpan: 2,
                rowSpan: 2,
                img: '/assets/gallery/aquarium-banner-mockup.webp'
            }
        ],
        mockups: [
            { url: "/assets/gallery/aquarium-tshirt-mockup.webp", title: "Merchandising", description: "Camisetas oficiales." },
            { url: "/assets/gallery/aquarium-banner-mockup.webp", title: "Señalética", description: "Identidad en espacios." },
            { url: "/assets/gallery/aquarium-instagram-mockup.webp", title: "Social Media", description: "Feed de Instagram." }
        ],
        process: [
            {
                url: "/assets/gallery/aquarium-process-concept-a.webp",
                title: "Concepto A: Pez Completo",
                description: "Una exploración figurativa buscando representar la vida marina de forma directa, utilizando la silueta completa para generar reconocimiento inmediato."
            },
            {
                url: "/assets/gallery/aquarium-process-concept-b.webp",
                title: "Concepto B: Arquitectura",
                description: "Abstracción geométrica inspirada en los arcos y líneas estructurales de la fachada icónica del edificio del Acuario Agustín Codazzi."
            },
            {
                url: "/assets/gallery/aquarium-process-concept-c.webp",
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
