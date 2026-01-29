import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: 'Ana Clara',
        dog: 'Thor, Golden Retriever',
        text: 'O único lugar que deixo o Thor tranquilo! Ele volta pra casa cansado, feliz e muito mais obediente. A equipe é sensacional.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
        id: 2,
        name: 'Rodrigo Santos',
        dog: 'Bob, Bulldog Francês',
        text: 'A estrutura é incrível. Recebi fotos e vídeos todos os dias enquanto viajava. O adestramento fez milagres no comportamento dele.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
        id: 3,
        name: 'Mariana Costa',
        dog: 'Nina, SRD',
        text: 'Profissionalismo nota 1000. Dá pra ver que eles amam o que fazem. Recomendo de olhos fechados!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
        id: 4,
        name: 'Felipe Oliveira',
        dog: 'Luna, Border Collie',
        text: 'Melhor investimento. O Day Care ajudou muito na socialização da minha filhote. Agora ela é super tranquila com outros cães!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
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
                                    {/* Background Quote Icon */}
                                    <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Quote size={80} className="text-gray-400" />
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
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                                        />
                                        <div>
                                            <p className="font-bold text-gray-900">{review.name}</p>
                                            <p className="text-sm text-primary font-medium">{review.dog}</p>
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
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-primary w-8'
                                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                                    }`}
                                aria-label={`Ir para grupo ${index + 1}`}
                            />
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
