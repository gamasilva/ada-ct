import React, { useRef, useState, useEffect } from 'react';
import { Bone, ChevronLeft, ChevronRight } from 'lucide-react';
import { getOptimizedImage, getResponsiveSrcSet } from '../utils/cloudinary';

const galleryImages = [
    "/images/dog-gallery/dog-01.webp",
    "/images/dog-gallery/dog-02.webp",
    "/images/dog-gallery/dog-03.webp",
    "/images/dog-gallery/dog-04.webp",
    "/images/dog-gallery/dog-05.webp",
    "/images/dog-gallery/dog-06.webp",
    "/images/dog-gallery/dog-07.webp",
    "/images/dog-gallery/dog-08.webp",
    "/images/dog-gallery/dog-09.webp",
    "/images/dog-gallery/dog-10.webp",
    "/images/dog-gallery/dog-11.webp",
    "/images/dog-gallery/dog-12.webp"
];

export const DogGallery = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showControls, setShowControls] = useState(false);

    // Initial scroll centering effect to not start at the very edge if desired,
    // though usually starting at 0 is fine.

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -320 : 320; // Scroll by roughly one card width
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Mouse Drag Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section
            id="dog-gallery"
            className="py-24 bg-white/60 backdrop-blur-sm relative z-10 overflow-hidden"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-yellow-100 border border-yellow-200">
                        <span className="text-yellow-700 font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <Bone size={16} className="text-yellow-600" />
                            Cãoleria
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Momentos de fofura e diversão
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg hidden md:block">
                        Deslize para ver mais fotos dos nossos hóspedes se divertindo.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative group/carousel">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className={`absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-30 bg-white/90 md:bg-white text-green-700 p-2 md:p-3 rounded-full shadow-lg border-2 border-green-100/50 md:border-green-100 hover:bg-green-50 hover:scale-110 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm ${showControls ? 'opacity-100' : 'opacity-0 md:opacity-100'} group-hover/carousel:opacity-100`}
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className={`absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-30 bg-white/90 md:bg-white text-green-700 p-2 md:p-3 rounded-full shadow-lg border-2 border-green-100/50 md:border-green-100 hover:bg-green-50 hover:scale-110 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm ${showControls ? 'opacity-100' : 'opacity-0 md:opacity-100'} group-hover/carousel:opacity-100`}
                        aria-label="Próximo"
                    >
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </button>

                    {/* Scroll Area */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 snap-center first:pl-4 last:pr-4 md:first:pl-0 md:last:pr-0"
                            >
                                <div className="min-w-[280px] md:min-w-[400px] h-[280px] md:h-[400px] relative group transition-transform duration-300 hover:scale-[1.02]">
                                    {/* Treat Frame */}
                                    <div className="absolute inset-0 border-4 border-yellow-400 rounded-3xl z-20 pointer-events-none shadow-sm"></div>

                                    {/* Image */}
                                    <div className="w-full h-full rounded-2xl overflow-hidden relative z-10 p-1 bg-white shadow-lg">
                                        <img
                                            src={getOptimizedImage(image, 600)}
                                            srcSet={getResponsiveSrcSet(image, [400, 600])}
                                            sizes="(max-width: 768px) 280px, 400px"
                                            alt={`Momento RK9 ${(index % galleryImages.length) + 1}`}
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover rounded-xl select-none"
                                            style={{
                                                objectPosition: image.includes('dog-04') ? 'center 15%' :
                                                    image.includes('dog-08') ? 'center 20%' :
                                                        'center'
                                            }}
                                            draggable="false"
                                        />

                                        {/* Overlay Gradient on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-15 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Swipe Hint */}
                    <div className="flex md:hidden justify-center mt-4 gap-2">
                        <div className="text-gray-400 text-sm flex items-center gap-2 animate-pulse">
                            <ChevronLeft size={16} />
                            <span>Deslize</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};
