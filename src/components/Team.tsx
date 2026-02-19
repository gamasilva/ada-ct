import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Heart } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string; // REPLACE WITH ACTUAL CLOUDINARY URL
    bio: string;
    badge: string;
    specializations?: string[];
}

// --- Data ---
const team: TeamMember[] = [
    {
        id: 'romeiro',
        name: 'Michel Romeiro',
        role: 'Adestrador Chefe & Comportamentalista',
        image: '/images/michel.webp',
        bio: 'Dedicado a transformar a relação entre cães e donos com técnica e respeito, aliando conhecimento teórico e prática avançada.',
        badge: 'Certificação Profissional',
        specializations: [
            "Modificação Comportamental",
            "Obediência Avançada",
            "Cinotecnia Policial",
            "Cães Farejadores",
            "Cães de Rastreamento",
            "Guarda e Proteção",
            "E-Collar",
            "Obediência para Proteção",
            "Aprendizado Canino",
            "APH K9"
        ]
    },
    {
        id: 'monitora',
        name: 'Ada Romeiro',
        role: 'Coordenadora de Bem-Estar & Recreação',
        image: '/images/ada.webp',
        bio: 'Responsável pelo enriquecimento ambiental e socialização segura. Seu olhar atento garante que cada cão se divirta com segurança total.',
        badge: 'Especialista em Comportamento de Matilha- Adestradora',
        specializations: [
            "Psicologia Canina",
            "Avaliação Comportamental",
            "Manejo e Contenção de cães",
            "Obediência Canina",
            "Atendimento pré hospitalar canino",
            "Workshop de Guarda Residencial com cães"
        ]
    },
    {
        id: 'kaike',
        name: 'Kaiky',
        role: 'Monitor',
        image: '/images/Kaiky.webp',
        bio: 'Monitor dedicado e apaixonado por cães, sempre atento às necessidades individuais de cada pet durante a recreação.',
        badge: 'Monitor de Pátio',
        specializations: [
            "Recreação Canina",
            "Monitoramento de Grupo",
            "Primeiros Socorros Básicos"
        ]
    }
];

export const Team = () => {
    return (
        <section id="equipe" className="py-24 bg-white/60 backdrop-blur-sm relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-green-100 border border-green-200"
                    >
                        <span className="text-green-700 font-bold text-sm tracking-wider uppercase">
                            Equipe de Elite
                        </span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Profissionais que Cuidam do Seu Melhor Amigo
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Expertise comprovada, paixão genuína e compromisso total com a segurança e felicidade do seu cão.
                    </p>
                </div>

                {/* Team Grid - Compact Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-green-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col h-full"
                        >

                            {/* Professional Photo */}
                            <div className="relative aspect-square overflow-hidden bg-gray-100 shrink-0">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, 350px"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Verified Badge Overlay */}
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-10">
                                    <CheckCircle2 size={16} className="text-green-600" strokeWidth={3} />
                                    <span className="text-xs font-bold text-gray-900">Verificado</span>
                                </div>
                            </div>

                            {/* Professional Info Card */}
                            <div className="p-6 relative flex-grow flex flex-col">
                                {/* Name */}
                                <h3 className="text-xl md:text-2xl font-black text-green-900 mb-1 tracking-tight">
                                    {member.name}
                                </h3>

                                {/* Role */}
                                <p className="text-yellow-600 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Award size={14} strokeWidth={2.5} />
                                    {member.role}
                                </p>

                                {/* Bio */}
                                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                    {member.bio}
                                </p>

                                {/* Specializations Tags (If available) */}
                                {member.specializations && (
                                    <div className="mb-6">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                            Especializações & Cursos
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {member.specializations.map((spec, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-800 text-[10px] font-bold border border-green-100 hover:bg-green-100 hover:border-green-300 transition-colors cursor-default"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Credential Badge (Pushed to bottom) */}
                                <div className="mt-auto pt-6 border-t border-gray-100">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl w-full justify-center">
                                        <Heart size={16} className="text-yellow-600" fill="currentColor" />
                                        <span className="text-sm font-semibold text-gray-800">
                                            {member.badge}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm">
                        <CheckCircle2 size={20} className="text-green-600" strokeWidth={2.5} />
                        <p className="text-gray-700 font-semibold">
                            Equipe treinada e certificada para garantir o melhor cuidado
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
