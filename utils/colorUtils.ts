
// Simple implementation to extract dominant colors from an image URL
// Uses HTML5 Canvas to sample pixels

export const extractColorsFromUrl = async (imageUrl: string, sampleCount: number = 5): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        if (!imageUrl) {
            resolve(['#1e293b', '#0f172a', '#334155', '#475569', '#64748b']); // Slate fallbacks
            return;
        }

        // Fix for Dropbox links to allow Canvas access (CORS)
        let safeUrl = imageUrl;
        if (safeUrl.includes('www.dropbox.com')) {
            safeUrl = safeUrl.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
        }
        
        // Add cache buster to avoid browser caching opaque responses
        if (safeUrl.includes('?')) {
            safeUrl += `&cacheBust=${Date.now()}`;
        } else {
            safeUrl += `?cacheBust=${Date.now()}`;
        }

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = safeUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(['#1e293b', '#0f172a', '#334155']);
                return;
            }

            // Downscale significantly for performance (50x50 is enough for dominant colors)
            canvas.width = 50;
            canvas.height = 50;
            
            try {
                ctx.drawImage(img, 0, 0, 50, 50);
                
                const imageData = ctx.getImageData(0, 0, 50, 50).data;
                const colorMap: Record<string, number> = {};

                // Sample every pixel (since image is small now)
                for (let i = 0; i < imageData.length; i += 4) {
                    const r = imageData[i];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const a = imageData[i + 3];

                    // Skip transparent or very dark/white pixels for better palettes
                    if (a < 128) continue;
                    // if (r < 10 && g < 10 && b < 10) continue; // Skip pure black
                    // if (r > 250 && g > 250 && b > 250) continue; // Skip pure white

                    // Quantize colors more aggressively to group similar shades
                    // Round to nearest 24 to reduce noise
                    const bucket = 24;
                    const qR = Math.round(r / bucket) * bucket;
                    const qG = Math.round(g / bucket) * bucket;
                    const qB = Math.round(b / bucket) * bucket;

                    const key = `${qR},${qG},${qB}`;
                    colorMap[key] = (colorMap[key] || 0) + 1;
                }

                // Sort by frequency
                let sortedColors = Object.entries(colorMap)
                    .sort(([, a], [, b]) => b - a)
                    .map(([key]) => {
                        const [r, g, b] = key.split(',').map(Number);
                        return rgbToHex(r, g, b);
                    });
                
                // Limit to sampleCount
                sortedColors = sortedColors.slice(0, sampleCount);

                // Pad with fallbacks if we didn't find enough colors
                while (sortedColors.length < sampleCount) {
                    sortedColors.push('#1e293b');
                }

                resolve(sortedColors);
            } catch (e) {
                console.warn("Canvas access failed (CORS): Using fallback palette.");
                resolve(['#1e293b', '#0f172a', '#334155', '#475569', '#64748b']);
            }
        };

        img.onerror = () => {
            console.warn(`Could not load image for palette extraction: ${imageUrl}`);
            resolve(['#1e293b', '#0f172a', '#334155', '#475569', '#64748b']);
        };
    });
};

const componentToHex = (c: number) => {
    const hex = Math.min(255, Math.max(0, c)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
