import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        id: 1,
        question: "Quais são as vacinas e exames obrigatórios?",
        answer: "Para segurança de todos, exigimos: Carteira de vacina em dia (V10/V8, Antirrábica e 3 doses da Polivalente para filhotes), além de vermífugo e antiparasitário em dia."
    },
    {
        id: 2,
        question: "Aceitam fêmeas no cio?",
        answer: "Não. Fêmeas não castradas serão aceitas apenas fora do período de cio."
    },
    {
        id: 3,
        question: "Meu cão precisa ser sociável?",
        answer: "Aceitamos apenas cães sociáveis com outros cães e pessoas. Cães com histórico de reatividade deverão passar por uma avaliação comportamental antes da hospedagem."
    },
    {
        id: 4,
        question: "O que preciso levar na mala do meu pet?",
        answer: "Traga a alimentação (em potes/balde com tampa ou saco lacrado) e a carteira de vacinação. Outros pertences (caminha, brinquedo) ficam a critério do tutor."
    },
    {
        id: 5,
        question: "Como funciona o pagamento e cancelamento?",
        answer: "O agendamento é confirmado mediante pagamento de 50% do valor. Em caso de desistência, o valor da entrada não é devolvido, mas fica como crédito por 30 dias."
    }
];

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-white/60 backdrop-blur-sm relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-green-100 border border-green-200"
                    >
                        <span className="text-green-700 font-bold text-sm tracking-wider uppercase">
                            Dúvidas Frequentes
                        </span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tudo o que você precisa saber antes de agendar os serviços da RK9.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                {/* Question Button - GREEN BACKGROUND */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-6 bg-green-700 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all group"
                                >
                                    <span className="text-lg font-bold text-white pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isActive ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="flex-shrink-0"
                                    >
                                        {isActive ? (
                                            <Minus className="text-yellow-400 w-6 h-6" strokeWidth={3} />
                                        ) : (
                                            <Plus className="text-yellow-400 w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={3} />
                                        )}
                                    </motion.div>
                                </button>

                                {/* Answer Panel - GREEN BACKGROUND */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-4 bg-green-700 border-t border-white/20">
                                                <p className="text-white leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Below FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 mb-4 font-medium">
                        Ainda tem dúvidas? Fale conosco!
                    </p>
                    <a
                        href="https://wa.me/5527999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-green-600 text-white font-bold py-4 px-8 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Entrar em Contato
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
