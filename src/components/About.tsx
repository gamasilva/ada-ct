import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { getOptimizedImage, getResponsiveSrcSet } from '../utils/cloudinary';

export const About = () => {
    return (
        <section id="quem-somos" className="py-24 bg-white/60 backdrop-blur-sm overflow-hidden relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={getOptimizedImage("https://res.cloudinary.com/drun5ro6g/image/upload/v1769642928/Inaugura%C3%A7%C3%A3o_do_CT_RK9_Agora_estamos_oficialmente_abertos._Obrigado_a_todos_os_envolvidos_c3btue.jpg", 800)}
                                srcSet={getResponsiveSrcSet("https://res.cloudinary.com/drun5ro6g/image/upload/v1769642928/Inaugura%C3%A7%C3%A3o_do_CT_RK9_Agora_estamos_oficialmente_abertos._Obrigado_a_todos_os_envolvidos_c3btue.jpg", [600, 800, 1200])}
                                sizes="(max-width: 768px) 100vw, 600px"
                                alt="Centro de Treinamento RK9 - Fachada"
                                width={600}
                                height={800}
                                loading="lazy"
                                className="w-full aspect-[3/4] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="font-bold text-lg">Amor e Profissionalismo</p>
                                    <p className="text-sm opacity-90">A combinação perfeita para seu pet.</p>
                                </div>
                            </div>
                        </div>
                        {/* Decoration */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-full blur-2xl -z-10"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-100 rounded-full blur-2xl -z-10"></div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-green-100 text-green-700 font-bold text-sm tracking-wider uppercase">
                            Sobre o RK9
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            Muito mais que um hotel, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
                                uma segunda casa para o seu cão.
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Localizado em <strong className="text-gray-900">Anchieta, ES</strong>, o RK9 nasceu da paixão por cães aliada ao profissionalismo.
                        </p>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            O nome RK9 carrega nossa essência: a união do sobrenome Romeiro com a sigla mundial K9 (canine), associada aos cães de serviço e trabalho, reforçada pela nossa experiência com cães policiais. Essa combinação representa quem somos: uma família que une conhecimento, prática e amor pelos cães.
                        </p>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Cada atendimento é individual, respeitando a personalidade, o tempo e as necessidades de cada animal. Acreditamos na comunicação correta, na leitura comportamental e em métodos que fortalecem o vínculo entre tutor e cão.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            A RK9 é a extensão da nossa história e da nossa missão de transformar a convivência entre pessoas e cães com dedicação, conhecimento e cuidado verdadeiro.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                'Monitoramento constante;',
                                'Áreas de lazer separadas por porte;',
                                'Relatórios diários para o tutor.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="/reservas"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-full hover:bg-green-700 shadow-lg hover:shadow-green-900/30 hover:scale-105"
                        >
                            Fazer Reserva
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
