import React, { useState } from 'react';
import { Home, Sun, GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { getOptimizedImage, getResponsiveSrcSet } from '../utils/cloudinary';

interface Service {
    id: string;
    icon: typeof Home;
    title: string;
    image: string;
    details: string;
    whatsappMessage: string;
}

const services: Service[] = [
    {
        id: 'hospedagem',
        icon: Home,
        title: "Hospedagem",
        image: "https://res.cloudinary.com/drun5ro6g/image/upload/v1769644237/Cachorrada_linda_da_turminha_de_quinta-feira_wcmoyo.jpg",
        details: "5 estrelas com quartos individuais e climatizados. Monitoramento 24h. Obrigatório: Vacinas V10/V8 + Antirrábica e proteção contra pulgas.",
        whatsappMessage: "Olá! Gostaria de fazer uma reserva de Hospedagem."
    },
    {
        id: 'daycare',
        icon: Sun,
        title: "Day Care",
        image: "https://res.cloudinary.com/drun5ro6g/image/upload/v1769644236/Cachorrada_linda_da_turminha_de_quinta-feira_1_fu15b3.jpg",
        details: "Socialização e gasto de energia. A solução para cães que ficam sozinhos. Enriquecimento ambiental e rotina de brincadeiras.",
        whatsappMessage: "Olá! Gostaria de saber mais sobre o Day Care."
    },
    {
        id: 'adestramento',
        icon: GraduationCap,
        title: "Adestramento",
        image: "https://res.cloudinary.com/drun5ro6g/image/upload/v1769644236/Cachorrada_linda_da_turminha_de_quinta-feira_2_gagajn.jpg",
        details: "Correção comportamental e obediência. Metodologia positiva para filhotes e adultos. Aulas presenciais ou Board & Train.",
        whatsappMessage: "Olá! Gostaria de agendar uma aula de Adestramento."
    },
    {
        id: 'consultoria',
        icon: Users,
        title: "Consultoria",
        image: "https://res.cloudinary.com/drun5ro6g/image/upload/v1769644236/Cachorrada_linda_da_turminha_de_quinta-feira_3_umnwbh.jpg",
        details: "Primeiros passos para tutores. Escolha do filhote, adaptação do lar e introdução a outros pets.",
        whatsappMessage: "Olá! Gostaria de agendar uma Consultoria."
    }
];

export const Services = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const handleWhatsApp = (message: string) => {
        const phone = "5527999999999"; // Replace with actual phone number
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    };

    return (
        <section id="servicos" className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Nossos Serviços
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Soluções completas para o bem-estar e desenvolvimento do seu cão.
                    </p>
                </div>

                {/* Interactive Image Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        const isActive = activeCard === service.id;
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer group"
                                onMouseEnter={() => setActiveCard(service.id)}
                                onMouseLeave={() => setActiveCard(null)}
                                onClick={() => setActiveCard(isActive ? null : service.id)}
                            >
                                {/* Optimized Background Image */}
                                <img
                                    src={getOptimizedImage(service.image, 800)}
                                    srcSet={getResponsiveSrcSet(service.image, [400, 800])}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    width="400"
                                    height="400"
                                />

                                {/* Default Gradient Overlay (Bottom) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                {/* Default State: Title & Icon */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-4"
                                    animate={{
                                        opacity: isActive ? 0 : 1,
                                        y: isActive ? 20 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <Icon size={28} className="text-white" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">
                                        {service.title}
                                    </h3>
                                </motion.div>

                                {/* Active State: Slide-Up Overlay with Details */}
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: isActive ? "0%" : "100%" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                    className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-sm"
                                >
                                    <div className="h-full flex flex-col justify-between p-6">
                                        {/* Top Section: Icon & Title */}
                                        <div>
                                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                                                <Icon size={32} className="text-white" strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-2xl font-black text-yellow-500 mb-4 tracking-tight">
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* Middle Section: Details */}
                                        <div className="flex-grow flex items-center">
                                            <p className="text-white text-sm leading-relaxed font-medium">
                                                {service.details}
                                            </p>
                                        </div>

                                        {/* Bottom Section: WhatsApp CTA */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWhatsApp(service.whatsappMessage);
                                            }}
                                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            Agendar Agora
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
