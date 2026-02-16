import React from 'react';
import { motion } from 'framer-motion';
import { Bone } from 'lucide-react';
import { getOptimizedImage, getResponsiveSrcSet } from '../utils/cloudinary';

const galleryImages = [
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.22.04.webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.40.16 (1).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.40.16 (2).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.40.16 (3).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.40.16 (4).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.40.16 (6).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.40.16 (7).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.40.16.webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.48.42 (2).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.48.42.webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.48.43 (1).webp",
    "/images/dog-gallery/WhatsApp Image 2026-02-16 at 13.48.45.webp"
];

export const DogGallery = () => {
    // Duplicate images for seamless loop
    const carouselImages = [...galleryImages, ...galleryImages];

    return (
        <section id="dog-gallery" className="py-24 bg-white/60 backdrop-blur-sm relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-yellow-100 border border-yellow-200">
                        <span className="text-yellow-700 font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <Bone size={16} className="text-yellow-600" />
                            Cãoleria
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Momentos de fofura e diversão
                    </h2>
                </div>
            </div>

            {/* Carousel Full Width */}
            <div className="w-full overflow-hidden">
                <motion.div
                    className="flex w-max"
                    animate={{ x: "-50%" }}
                    initial={{ x: 0 }}
                    transition={{
                        duration: 60, // Slower speed for better viewing
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {carouselImages.map((image, index) => (
                        <div key={index} className="pr-8 flex-shrink-0">
                            <div className="min-w-[300px] md:min-w-[400px] h-[300px] relative group">
                                {/* Treat Frame */}
                                <div className="absolute inset-0 border-4 border-yellow-400 rounded-3xl z-20 pointer-events-none group-hover:border-yellow-500 transition-colors duration-300"></div>



                                {/* Image */}
                                <div className="w-full h-full rounded-2xl overflow-hidden relative z-10 p-1 bg-white">
                                    <img
                                        src={getOptimizedImage(image, 600)}
                                        srcSet={getResponsiveSrcSet(image, [400, 600, 800])}
                                        sizes="(max-width: 768px) 300px, 400px"
                                        alt={`Momento RK9 ${index + 1}`}
                                        width={400}
                                        height={300}
                                        loading="lazy"
                                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            objectPosition: image.includes('(3)') ? 'center 15%' :
                                                image.endsWith('at 13.40.16.webp') ? 'center 20%' :
                                                    'center'
                                        }}
                                        draggable="false"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
