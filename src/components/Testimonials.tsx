import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Michel Lima",
        dog: "Cliente RK9",
        text: "Se quer ter um cão feliz, educado e protegido, o lugar é aqui. Seja para educar, hospedar ou até mesmo para passar o dia se divertindo. Nossos cães merecem.",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Michel+Lima&background=0D9488&color=fff`,
        date: "7 meses atrás"
    },
    {
        id: 2,
        name: "Aline Lima",
        dog: "Cliente RK9",
        text: "Recomendo demais para quem precisa hospedar seu cachorro na região de Anchieta. Eles foram super atenciosos com meus dois cachorros, não tenho palavras para expressar minha gratidão pela hospedagem.",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Aline+Lima&background=0D9488&color=fff`,
        date: "1 ano atrás"
    },
    {
        id: 3,
        name: "Lucas Mallmann",
        dog: "Cliente RK9",
        text: "Você que mora em Anchieta, ou está passando um tempo por lá, e precise de uma estadia para seu cãozinho, este é o lugar perfeito para ele! Infraestrutura sensacional para o seu pet brincar, descontrair e depois descansa em paz.",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Lucas+Mallmann&background=0D9488&color=fff`,
        date: "1 ano atrás"
    },
    {
        id: 4,
        name: "Leonardo Alves",
        dog: "Cliente RK9",
        text: "O RK9 é um centro de treinamento e hotel para dogs. Tenho total confiança e admiração pelo trabalho que eles executam.",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Leonardo+Alves&background=0D9488&color=fff`,
        date: "8 meses atrás"
    },
    {
        id: 5,
        name: "Raquel Dos santos silva",
        dog: "Cliente RK9",
        text: "O espaço é ótimo. O gelinho meu cachorro que nunca esteve em contato com outros, adorou.",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Raquel+Silva&background=0D9488&color=fff`,
        date: "5 meses atrás"
    },
    {
        id: 6,
        name: "Ricardo Gomes de Abreu",
        dog: "Cliente RK9",
        text: "Total segurança e responsabilidade com nosso Pet.",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Ricardo+Gomes&background=0D9488&color=fff`,
        date: "1 ano atrás"
    },
    {
        id: 7,
        name: "Raquel Teixeira",
        dog: "Cliente RK9",
        text: "Ótimo lugar, ambiente super agradável, limpo e lindo para os cães. Super indico!!",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Raquel+Teixeira&background=0D9488&color=fff`,
        date: "3 anos atrás"
    },
    {
        id: 8,
        name: "Isabella Sarmento",
        dog: "Cliente RK9",
        text: "Excelente localização e atendimento, além de profissionais super qualificados!!!",
        rating: 5,
        image: `https://ui-avatars.com/api/?name=Isabella+Sarmento&background=0D9488&color=fff`,
        date: "3 anos atrás"
    }
];

export const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-play functionality
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    // Calculate which cards to show based on screen size and current index
    const getVisibleCards = () => {
        const cards = [];
        for (let i = 0; i < 3; i++) {
            cards.push(reviews[(currentIndex + i) % reviews.length]);
        }
        return cards;
    };

    const visibleCards = getVisibleCards();

    return (
        <section
            id="depoimentos"
            className="py-24 relative z-10 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/20"
                    >
                        <span className="text-yellow-600 font-bold text-sm tracking-wider uppercase">
                            Depoimentos
                        </span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        O que dizem nossos clientes
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A confiança de centenas de tutores que já viveram a experiência RK9.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Multi-Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {visibleCards.map((review, index) => (
                            <motion.div
                                key={`${review.id}-${currentIndex}-${index}`}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeInOut"
                                }}
                                className={`${index === 2 ? 'hidden lg:block' : ''} ${index === 1 ? 'hidden md:block' : ''}`}
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full flex flex-col relative border border-gray-100 group">
                                    {/* Google Review Badge */}
                                    <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                    </div>

                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-4 relative z-10">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow italic relative z-10">
                                        "{review.text}"
                                    </p>

                                    {/* Reviewer Info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100 relative z-10">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            width={48}
                                            height={48}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-green-100"
                                        />
                                        <div>
                                            <p className="font-bold text-gray-900">{review.name}</p>
                                            <p className="text-xs text-gray-400 font-medium">{review.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-20 border border-gray-200 items-center justify-center"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-20 border border-gray-200 items-center justify-center"
                        aria-label="Próximo"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-10">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label={`Ir para grupo ${index + 1}`}
                            >
                                <div className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-primary w-8'
                                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                                    }`} />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Navigation Buttons */}
                    <div className="flex lg:hidden justify-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all border border-gray-200"
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all border border-gray-200"
                            aria-label="Próximo"
                        >
                            <ChevronRight size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
