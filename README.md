# Bonialeart Portfolio

Un portafolio de arte digital inmersivo y moderno, diseñado para exhibir obras de ilustración, modelado 3D y fotografía. Construido con tecnologías web modernas para ofrecer una experiencia de usuario fluida y visualmente impactante.

## 🚀 Características

*   **Diseño Visual Premium**: Estética cuidada con efectos de vidrio (glassmorphism), animaciones suaves y transiciones dinámicas.
*   **Galería Interactiva**: Visualización de obras de arte con filtrado por categorías y modales de vista previa en alta resolución.
*   **Experiencia 3D**: Integración de elementos 3D interactivos para un fondo dinámico.
*   **Secciones Informativas**:
    *   **Sobre Mí**: Biografía y presentación del artista.
    *   **Skills**: Visualización gráfica de habilidades técnicas y software.
    *   **Servicios**: Oferta de servicios profesionales (Ilustración, 3D, Fotografía).
*   **Contacto Funcional**: Formulario de contacto integrado con EmailJS para comunicación directa.
*   **Media Kit**: Acceso directo al Media Kit profesional.
*   **Totalmente Responsivo**: Adaptado perfectamente para móviles, tablets y escritorio.

## 🛠️ Tecnologías Utilizadas

*   **Core**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
*   **3D**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei)
*   **Iconos**: [Lucide React](https://lucide.dev/)
*   **Formularios**: [EmailJS](https://www.emailjs.com/)

## ⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/bonialeart-portfolio.git
    cd bonialeart-portfolio
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env.local` en la raíz del proyecto (basado en `.env.example`) y añade tus credenciales de EmailJS:
    ```env
    VITE_EMAILJS_SERVICE_ID=tu_service_id
    VITE_EMAILJS_TEMPLATE_ID=tu_template_id
    VITE_EMAILJS_PUBLIC_KEY=tu_public_key
    ```

4.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique la consola).

## 📦 Scripts Disponibles

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción.
*   `npm run preview`: Vista previa de la build de producción localmente.
*   `npm run lint`: Ejecuta el linter para encontrar errores en el código.

## 📄 Licencia

Este proyecto es para uso personal de portafolio. Todos los derechos de las obras de arte mostradas pertenecen a **Bonialeart**.
