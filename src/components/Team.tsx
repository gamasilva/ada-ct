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
}

const team: TeamMember[] = [
    {
        id: 'romeiro',
        name: 'Michel Romeiro',
        role: 'Adestrador Chefe & Comportamentalista',
        image: '/team-romeiro.jpg',
        bio: 'Especialista em modificação comportamental e obediência avançada. Dedicado a transformar a relação entre cães e tutores com técnica e respeito.',
        badge: 'Certificação Profissional'
    },
    {
        id: 'monitora',
        name: 'Ada Romeiro',
        role: 'Coordenadora de Bem-Estar & Recreação',
        image: '/team-monitora.jpg',
        bio: 'Responsável pelo enriquecimento ambiental e socialização segura. Seu olhar atento garante que cada cão se divirta com segurança total.',
        badge: 'Especialista em Comportamento de Matilha'
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

                {/* Team Grid - Large Vertical Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                            className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-green-500 transition-all duration-500 shadow-lg hover:shadow-2xl"
                        >
                            {/* Decorative Gold Corner Accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-transparent -z-0" />

                            {/* Professional Photo */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Verified Badge Overlay */}
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-600" strokeWidth={3} />
                                    <span className="text-xs font-bold text-gray-900">Verificado</span>
                                </div>
                            </div>

                            {/* Professional Info Card */}
                            <div className="p-8 relative">
                                {/* Name */}
                                <h3 className="text-2xl md:text-3xl font-black text-green-900 mb-2 tracking-tight">
                                    {member.name}
                                </h3>

                                {/* Role */}
                                <p className="text-yellow-600 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Award size={16} strokeWidth={2.5} />
                                    {member.role}
                                </p>

                                {/* Bio */}
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {member.bio}
                                </p>

                                {/* Credential Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl">
                                    <Heart size={16} className="text-yellow-600" fill="currentColor" />
                                    <span className="text-sm font-semibold text-gray-800">
                                        {member.badge}
                                    </span>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/0 via-yellow-500/0 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-2xl" />
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
