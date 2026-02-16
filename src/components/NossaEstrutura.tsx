import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// --- Types ---
interface StructureItem {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    badge: string;
    gallery: string[];
    features: string[];
}

// --- Data ---
const structureItems: StructureItem[] = [
    {
        id: 'lazer',
        title: "Ampla Área de Lazer",
        description: "Espaço verde para correr e brincar livremente.",
        fullDescription: "Contamos com uma área de 600m² totalmente gramada e arborizada. O espaço é dividido por porte e temperamento, permitindo que todos os cães socializem e gastem energia com segurança sob a supervisão atenta de nossos monitores.",
        badge: "Diversão",
        gallery: [
            "/images/lazer/WhatsApp Image 2026-02-16 at 13.48.43 (3).webp",
            "/images/lazer/WhatsApp Image 2026-02-16 at 13.48.43 (4).webp"
        ],
        features: [
            "600m² de gramado natural",
            "Divisão por porte",
            "Áreas sombreadas",
            "Supervisão constante"
        ]
    },
    {
        id: 'playground',
        title: "PlayGround e Piscina",
        description: "Exercícios e diversão refrescante.",
        fullDescription: "Para os dias quentes e para manter a forma, oferecemos uma piscina exclusiva para cães e um circuito completo de Agility. Nossas atividades são planejadas para estimular tanto o físico quanto o mental dos hóspedes.",
        badge: "Exercícios",
        gallery: [
            "/images/playground/WhatsApp Image 2026-02-16 at 13.40.16 (5).webp",
            "/images/playground/WhatsApp Image 2026-02-16 at 13.48.43 (2).webp",
            "/images/playground/WhatsApp Image 2026-02-16 at 13.48.44 (1).webp",
            "/images/playground/WhatsApp Image 2026-02-16 at 13.48.44 (2).webp",
            "/images/playground/WhatsApp Image 2026-02-16 at 13.48.44 (3).webp"
        ],
        features: [
            "Piscina tratada",
            "Circuito de Agility",
            "Enriquecimento ambiental",
            "Recreação dirigida"
        ]
    }
];

// --- Components ---

const AutoCarousel = ({ images, alt }: { images: string[], alt: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change every 4 seconds
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={alt}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-yellow-400' : 'w-2 bg-white/50'
                            }`}
                    />
                ))}
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
    );
};

const StructureSection = ({ item, index }: { item: StructureItem, index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-20 ${!isEven ? 'md:flex-row-reverse' : ''}`}>

            {/* Image Side (Carousel) */}
            <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <AutoCarousel images={item.gallery} alt={item.title} />
            </motion.div>

            {/* Text Side */}
            <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {item.badge}
                    </span>
                    <div className="h-px bg-green-200 flex-grow max-w-[100px]" />
                </div>

                <h3 className="font-display text-4xl md:text-5xl text-green-800 mb-6 uppercase leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {item.title}
                </h3>

                <p className="text-gray-600 font-sans text-lg leading-relaxed mb-8">
                    {item.fullDescription}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Check size={14} strokeWidth={3} />
                            </span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export const NossaEstrutura = () => {
    return (
        <section id="estrutura" className="py-24 bg-white relative overflow-hidden font-sans">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-yellow-50/30 -skew-x-12 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Content with Split Layout */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">

                    {/* Left Side: Text Content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block text-4xl mb-2 filter drop-shadow-md"
                        >
                            🏆
                        </motion.div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-green-800 mb-6 uppercase tracking-normal leading-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                            Conheça Nossa Estrutura
                        </h2>
                        <p className="font-sans text-xl text-gray-600 leading-relaxed mb-8">
                            Cada detalhe do nosso espaço foi pensado para proporcionar segurança, conforto e muita diversão para o seu melhor amigo.
                        </p>

                        {/* Feature Tags */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Dormitórios Higienizados e Exclusivos",
                                "Ampla área de atividades",
                                "Monitoramento 24h",
                                "Ambiente Climatizado",
                                "Piscina Tratada",
                                "Áreas de Descanso"
                            ].map((tag, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3 bg-green-50/80 px-4 py-3 rounded-xl border border-green-100"
                                >
                                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                                    <span className="text-sm font-bold text-green-800 uppercase tracking-wide">
                                        {tag}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Intro Video */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-[360px] aspect-[9/16] rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-2xl"
                        >
                            <video
                                src="/images/WhatsApp%20Video%202026-02-16%20at%2015.09.06.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            {/* Decorative Glass Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </div>

                {/* Vertical Zig-Zag Layout */}
                <div className="space-y-12 md:space-y-0">
                    {structureItems.map((item, index) => (
                        <StructureSection key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
