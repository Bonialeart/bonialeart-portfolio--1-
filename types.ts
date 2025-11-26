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

export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    description: string;
    url: string; // Main thumbnail for grid
    media?: MediaItem[]; // Array for the modal slider
}