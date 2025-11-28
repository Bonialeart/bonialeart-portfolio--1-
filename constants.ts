
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
    tagline: "Arte Digital. Fotografia.",
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
        // Fixed: Changed ArtStation page URL to direct Dropbox image URL
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
        description: "Esta impactante ilustración digital retrata a Sun Wukong, el Rey Mono, en una pose de batalla feroz y dinámica, en medio de una tormenta. Con pelaje blanco y una barba imponente que enmarca un rostro lleno de determinación, sus ojos brillan con una luz amarilla intensa. Viste un atuendo oscuro, posiblemente de color púrpura o granate, y luce brazaletes dorados en sus muñecas, un gran collar de cuentas oscuras alrededor de su cuello y la icónica diadema dorada (el filete dorado) flotando justo encima de su cabeza.",
        url: "https://cdnb.artstation.com/p/assets/images/images/068/156/463/large/alejandro-bonilla-wukong3-color-correct.jpg?1697115257",
        media: [
            { type: 'image', url: "https://cdnb.artstation.com/p/assets/images/images/068/156/459/large/alejandro-bonilla-wukong3.jpg?1697115228" },
            { type: 'image', url: "https://cdnb.artstation.com/p/assets/images/images/068/156/459/large/alejandro-bonilla-wukong3.jpg?1697115228" },
            {
                type: 'video',
                url: "https://cdn.artstation.com/p/video_sources/001/589/471/video-sin-titulo-hecho-con-clipchamp.mp4",
                thumbnail: "https://cdnb.artstation.com/p/assets/images/images/068/156/459/large/alejandro-bonilla-wukong3.jpg?1697115228"
            }
        ]
    },
    {
        id: 3,
        title: "Aurora",
        category: "3d",
        description: "A fusion of technology and artistry, radiating from the digital frontier. This 3D design embodies a silent guardian, emitting an ethereal glow that beckons exploration. A new form that redefines the beauty of the digital form.",
        // FIXED: Used the direct CDNA image link instead of the HTML page link
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
        ]
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
    }
];

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
