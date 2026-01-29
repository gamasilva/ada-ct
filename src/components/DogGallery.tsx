import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bone } from 'lucide-react';

const galleryImages = [
    "https://res.cloudinary.com/drun5ro6g/image/upload/v1769644237/Cachorrada_linda_da_turminha_de_quinta-feira_wcmoyo.jpg",
    "https://res.cloudinary.com/drun5ro6g/image/upload/v1769644236/Cachorrada_linda_da_turminha_de_quinta-feira_1_fu15b3.jpg",
    "https://res.cloudinary.com/drun5ro6g/image/upload/v1769642928/Hoje_nossa_mascote_e_funcion%C3%A1ria_do_m%C3%AAs_completa_8_aninhos_Parab%C3%A9ns_Akirinha_srlvzc.jpg",
    "https://res.cloudinary.com/drun5ro6g/image/upload/v1769642928/O_que_os_c%C3%A3es_nos_ensinam1._Ame_incondicionalmenteCachorros_amam_incondicionalmente._Eles_abanam_1_svu8ru.jpg",
    "https://res.cloudinary.com/drun5ro6g/image/upload/v1769642928/O_que_os_c%C3%A3es_nos_ensinam1._Ame_incondicionalmenteCachorros_amam_incondicionalmente._Eles_abanam_de7tpg.jpg"
];

export const DogGallery = () => {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className="py-24 bg-white/60 backdrop-blur-sm relative z-10 overflow-hidden">
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

                {/* Carousel */}
                <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-8"
                    >
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="min-w-[300px] md:min-w-[400px] h-[300px] relative group"
                            >
                                {/* Treat Frame */}
                                <div className="absolute inset-0 border-4 border-yellow-400 rounded-3xl z-20 pointer-events-none group-hover:border-yellow-500 transition-colors duration-300"></div>

                                {/* Decorative Bones */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-white px-2">
                                    <Bone size={24} className="text-yellow-500 fill-yellow-100" />
                                </div>

                                {/* Image */}
                                <div className="w-full h-full rounded-2xl overflow-hidden relative z-10 p-1 bg-white">
                                    <img
                                        src={image}
                                        alt={`Momento RK9 ${index + 1}`}
                                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                                        draggable="false"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <p className="text-center text-gray-500 mt-8 text-sm flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                    Arraste para ver mais
                </p>
            </div>
        </section>
    );
};
