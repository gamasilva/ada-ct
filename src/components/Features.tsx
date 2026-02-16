import React, { useState } from 'react';
import { ShieldCheck, HeartPulse, Trees, PawPrint, VolumeX, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: ShieldCheck,
        title: "Monitoramento 24h",
        description: "Câmeras de alta definição e supervisão constante para garantir a segurança do seu pet."
    },
    {
        icon: HeartPulse,
        title: "Saúde em Primeiro Lugar",
        description: "Controle rigoroso de vacinas, ectoparasitas e acompanhamento veterinário preventivo."
    },
    {
        icon: Trees,
        title: "Ambiente Controlado",
        description: "Área verde ampla, segura e dedetizada, projetada para explorar os instintos naturais."
    }
];

export const Features = () => {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <section id="diferenciais" className="py-24 bg-gradient-to-b from-white to-gray-50/50 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                        Por que o RK9 é a melhor escolha?
                    </h2>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Two Column Layout: Video Left, Cards Right */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Left Column: Phone-Style Video with Decorative Frame */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative mx-auto"
                    >
                        {/* Decorative Floating Paw Prints */}
                        <motion.div
                            className="absolute -top-6 -left-6 z-20 text-yellow-500 drop-shadow-lg"
                            animate={{
                                y: [0, -8, 0],
                                rotate: [-15, -12, -15]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <PawPrint size={48} strokeWidth={2} fill="currentColor" />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-6 -right-6 z-20 text-primary drop-shadow-lg"
                            animate={{
                                y: [0, 8, 0],
                                rotate: [25, 28, 25]
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        >
                            <PawPrint size={52} strokeWidth={2} fill="currentColor" />
                        </motion.div>

                        <motion.div
                            className="absolute -top-8 -right-8 z-20 text-yellow-600 drop-shadow-lg hidden lg:block"
                            animate={{
                                y: [0, -6, 0],
                                rotate: [10, 15, 10]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        >
                            <PawPrint size={42} strokeWidth={1.5} fill="currentColor" />
                        </motion.div>

                        {/* Phone-Style Video Frame */}
                        <div className="relative max-w-[300px] lg:max-w-[320px] aspect-[9/16] mx-auto rounded-[2rem] overflow-hidden border-4 border-gray-900 shadow-2xl shadow-green-900/40 group">
                            <video
                                autoPlay
                                muted={isMuted}
                                loop
                                playsInline
                                width={320}
                                height={568}
                                className="w-full h-full object-cover"
                                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 16'%3E%3Crect fill='%2365a30d' width='9' height='16'/%3E%3C/svg%3E"
                            >
                                <source
                                    src="https://res.cloudinary.com/drun5ro6g/video/upload/v1769642062/WhatsApp_Video_2026-01-28_at_15.48.38_a8pkrg.mp4"
                                    type="video/mp4"
                                />
                                Seu navegador não suporta vídeos HTML5.
                            </video>

                            {/* Audio Toggle Button */}
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="absolute bottom-4 right-4 z-30 bg-black/60 text-white p-3 rounded-full hover:scale-110 hover:bg-black/80 transition-all duration-300 backdrop-blur-sm shadow-lg"
                                aria-label={isMuted ? "Ativar som" : "Desativar som"}
                            >
                                {isMuted ? (
                                    <VolumeX size={20} strokeWidth={2} />
                                ) : (
                                    <Volume2 size={20} strokeWidth={2} />
                                )}
                            </button>

                            {/* Decorative overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>

                        {/* Background Glow Effects */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                    </motion.div>

                    {/* Right Column: Differentiator Cards */}
                    <div className="flex flex-col gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="group relative"
                            >
                                <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:bg-green-50/30 transition-all duration-300 shadow-sm hover:shadow-lg">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <feature.icon size={28} className="text-primary" strokeWidth={2} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
