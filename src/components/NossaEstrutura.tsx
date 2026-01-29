import React from 'react';
import { motion } from 'framer-motion';

const structureItems = [
    {
        title: "Suítes de Descanso Climatizadas",
        description: "Baias individuais, higienizadas e com temperatura controlada para uma noite de sono tranquila e segura.",
        image: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indoor comfort/bed
        alt: "Cão dormindo confortavelmente"
    },
    {
        title: "Ampla Área Verde de Lazer",
        description: "Milhares de metros quadrados de gramado cercado para corridas, brincadeiras e gasto de energia supervisionado.",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Wide grassy field
        alt: "Cães correndo na grama"
    },
    {
        title: "Pista de Treinamento e Agility",
        description: "Estrutura profissional completa para exercícios físicos e sessões de adestramento focadas e dinâmicas.",
        image: "/agility-dog.png", // Agility/Training
        alt: "Cão saltando obstáculo de agility"
    },
    {
        title: "Segurança e Monitoramento 24h",
        description: "Ambiente totalmente murado, com câmeras de vigilância e equipe capacitada sempre atenta ao bem-estar dos cães.",
        image: "/security-dog.png", // Security/Watch dog
        alt: "Cão de guarda em alerta"
    }
];

export const NossaEstrutura = () => {
    return (
        <section id="estrutura" className="py-24 bg-gray-50 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Nossa Estrutura
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
                        Um ambiente pensado para a segurança, conforto e desenvolvimento do seu cão.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {structureItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            {/* Image Container */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    width={400}
                                    height={192}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-green-700 mb-3 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
