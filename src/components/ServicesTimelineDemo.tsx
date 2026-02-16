import { Home, Sun, GraduationCap, Users, PawPrint } from "lucide-react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

const timelineData = [
    {
        id: 1,
        title: "Hospedagem",
        subtitle: "Hotel Pet Premium",
        content:
            "Espaço amplo com dormitórios individuais, climatizados e higienizados diariamente. Seu cão descansa com segurança e conforto total enquanto você viaja tranquilo.",
        category: "Hospedagem",
        icon: Home,
        relatedIds: [2, 3],
        status: "popular" as const,
        tags: [
            "Dormitórios individuais",
            "Ambiente climatizado",
            "Higienização diária",
            "Monitoramento 24h",
            "Atividades recreativas",
            "Alimentação controlada",
        ],
    },
    {
        id: 2,
        title: "Day Care",
        subtitle: "Creche Canina",
        content:
            "Um dia inteiro de socialização, gasto de energia e diversão com a matilha. Ideal para cães que ficam sozinhos em casa e precisam de estímulo físico e mental.",
        category: "Recreação",
        icon: Sun,
        relatedIds: [1, 3],
        status: "popular" as const,
        tags: [
            "Socialização orientada",
            "Gasto de energia",
            "Supervisão constante",
            "Divisão por porte",
            "Enriquecimento ambiental",
            "Piscina e playground",
        ],
    },
    {
        id: 3,
        title: "Adestramento",
        subtitle: "Obediência & Comportamento",
        content:
            "Metodologia motivacional através do adestramento inteligente. Trabalhamos correção comportamental, obediência, guarda e proteção e faro.",
        category: "Educação",
        icon: GraduationCap,
        relatedIds: [4, 2],
        status: "new" as const,
        tags: [
            "Obediência básica e avançada",
            "Correção comportamental",
            "Guarda e proteção",
            "Faro e rastreamento",
            "Socialização controlada",
            "E-Collar",
        ],
    },
    {
        id: 4,
        title: "Consultoria",
        subtitle: "Orientação para Tutores",
        content:
            "Primeiro passo para os tutores. Entendendo a linguagem dos cães, escolha do filhote, adaptação do lar, higiene e correção comportamental.",
        category: "Consultoria",
        icon: Users,
        relatedIds: [3, 5],
        status: "available" as const,
        tags: [
            "Linguagem canina",
            "Escolha de raça",
            "Adaptação do lar",
            "Rotina ideal",
            "Prevenção de problemas",
            "Acompanhamento",
        ],
    },
    {
        id: 5,
        title: "Avaliação",
        subtitle: "Avaliação Comportamental",
        content:
            "Análise completa do perfil do seu cãozinho para garantir que ele seja inserido na matilha ideal, respeitando seu temperamento e necessidades.",
        category: "Triagem",
        icon: PawPrint,
        relatedIds: [1, 2],
        status: "available" as const,
        tags: [
            "Perfil comportamental",
            "Teste de sociabilidade",
            "Avaliação de temperamento",
            "Plano personalizado",
            "Relatório completo",
        ],
    },
];

export default function ServicesTimeline() {
    return (
        <section id="servicos-orbital" className="py-16 pb-32 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-green-100 border border-green-200">
                        <span className="text-green-700 font-bold text-sm tracking-wider uppercase">
                            🐕 Explore Nossos Serviços
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Soluções para seu Melhor Amigo
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Clique em cada serviço para conhecer os detalhes. Toque fora para voltar à rotação.
                    </p>
                </div>
            </div>

            <RadialOrbitalTimeline timelineData={timelineData} />
        </section>
    );
}
