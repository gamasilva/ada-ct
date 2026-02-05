import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
    const response = await next();

    // Add security headers
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: https: blob:; " +
        "media-src 'self' https://res.cloudinary.com https://videos.pexels.com; " +
        "connect-src 'self'; " +
        "frame-src https://maps.google.com https://www.google.com https://*.google.com https://*.google.com.br; " +
        "frame-ancestors 'none';"
    );

    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
};
