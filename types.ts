export interface ArtPiece {
    id: number;
    title: string;
    url: string;
    description: string;
}

export interface Quality {
    title: string;
    description: string;
    icon: string;
}

export interface GeneratedContent {
    bio: string; // Short bio for hero
    aboutMe: string; // Long bio for About section
    tagline: string;
    qualities: Quality[];
}

export type MediaType = 'image' | 'video';

export interface MediaItem {
    type: MediaType;
    url: string;
    thumbnail?: string; // Optional poster for videos
}

export interface TechnicalInfo {
    software?: string;
    year?: string;
    dimensions?: string;
    technique?: string;
}

export interface BentoCardData {
    color?: string; // Legacy support
    title?: string;
    description?: string;
    label?: string;
    img?: string; // URL for logo/icon/image
    video?: string;
    type?: 'default' | 'image' | 'video' | 'font' | 'color-palette' | 'pattern' | 'logo' | 'link' | 'mockup';
    fontFamily?: string; // For typography cards

    // Grid Spanning
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;

    // Styling
    backgroundColor?: string;
    textColor?: string;

    // Palette
    colors?: { hex: string; name: string }[];

    // Image Fit
    imgFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    description: string;
    url: string; // Main thumbnail for grid
    media?: MediaItem[]; // Array for the modal slider
    technicalInfo?: TechnicalInfo;
    bentoData?: BentoCardData[];
    mockups?: { url: string; title?: string; description?: string }[];
    process?: { url: string; title?: string; description?: string }[];
    cameraInfo?: CameraInfo;
    objectPosition?: string;
}

export interface CameraInfo {
    model?: string;
    lens?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
}