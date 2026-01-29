import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, CreditCard, Syringe, Dog, Utensils } from 'lucide-react';

const rules = [
    {
        icon: Syringe,
        title: "Saúde em Dia",
        description: "Carteira de vacina, vermífugo e anti parasitas em dia. Vacinas necessárias: 3 doses da Polivalente (em FILHOTES), V10/V8, antirrábica (a partir de 1 ano)."
    },
    {
        icon: Dog,
        title: "Fêmeas",
        description: "Fêmeas não castradas serão aceitas apenas fora do período de cio."
    },
    {
        icon: AlertTriangle,
        title: "Comportamento",
        description: "Aceitamos apenas cães que são sociáveis com outros cães e pessoas. Cães com histórico de reatividade deverão passar por uma avaliação antes da hospedagem."
    },
    {
        icon: Utensils,
        title: "Pertences & Alimentação",
        description: "Junto com ele, traga a alimentação. Outros pertences podem ser trazidos conforme critério do tutor. A alimentação deve ser enviada em potes/balde com tampa ou no próprio saco lacrado."
    },
    {
        icon: CreditCard,
        title: "Pagamento & Agendamento",
        description: "O agendamento só será feito mediante ao pagamento de 50% do valor total. (Caso haja desistência, o valor da entrada não será devolvido, ficando como crédito por 30 dias)."
    }
];

export const PreRequisites = () => {
    return (
        <section id="regras" className="py-24 relative z-10 bg-white/60 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-green-100 border border-green-200">
                        <span className="text-green-800 font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-700" />
                            Regras da Casa
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Pré-Requisitos para Hospedagem
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Para garantir a segurança e o bem-estar de todos os hóspedes, seguimos rigorosamente estas diretrizes.
                    </p>
                </div>

                {/* Rules List */}
                <div className="space-y-6">
                    {rules.map((rule, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-r-xl shadow-md border-l-8 border-green-700 p-6 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-shadow"
                        >
                            <div className="bg-green-50 p-3 rounded-full shrink-0">
                                <rule.icon size={28} className="text-green-700" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    {rule.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {rule.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
