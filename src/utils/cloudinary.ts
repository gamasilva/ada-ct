/**
 * Generates an optimized Cloudinary URL.
 * 
 * @param url - The original Cloudinary image URL.
 * @param width - The desired width (optional).
 * @param quality - The quality setting (default: 'auto').
 * @param format - The image format (default: 'auto', which usually selects webp/avif).
 * @returns The optimized URL.
 */
export const getOptimizedImage = (url: string, width?: number, quality: string = 'auto', format: string = 'auto') => {
    if (!url || !url.includes('cloudinary.com')) return url;

    // Split at 'upload/' to insert transformations
    const [base, file] = url.split('/upload/');
    if (!file) return url;

    const transformations = [
        `f_${format}`,
        `q_${quality}`,
        width ? `w_${width}` : ''
    ].filter(Boolean).join(',');

    return `${base}/upload/${transformations}/${file}`;
};

/**
 * Generates standard responsive srcSet for Cloudinary images.
 */
export const getResponsiveSrcSet = (url: string, widths: number[] = [300, 600, 900, 1200]) => {
    if (!url || !url.includes('cloudinary.com')) return undefined;

    return widths
        .map(w => `${getOptimizedImage(url, w)} ${w}w`)
        .join(', ');
};
