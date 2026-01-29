import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Bone } from 'lucide-react';

interface FloatingItem {
    id: number;
    x: number;
    y: number;
    size: number;
    rotation: number;
    type: 'bone' | 'paw';
    duration: number;
    delay: number;
}

export const FloatingBackground = () => {
    const [items, setItems] = useState<FloatingItem[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Generate random floating items
        const newItems: FloatingItem[] = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 30 + 20, // 20px to 50px
            rotation: Math.random() * 360,
            type: Math.random() > 0.5 ? 'bone' : 'paw',
            duration: 15 + Math.random() * 10, // 15-25s
            delay: Math.random() * 5 // 0-5s delay
        }));
        setItems(newItems);

        // Track mouse position for parallax
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY, currentTarget } = e;
            const target = currentTarget as Window;
            const { innerWidth, innerHeight } = target;

            const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1

            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {items.map((item) => {
                // Calculate parallax offset based on item size (depth)
                const depth = item.size / 50; // 0.4 to 1.0
                const parallaxX = mousePos.x * depth * 30;
                const parallaxY = mousePos.y * depth * 30;

                return (
                    <motion.div
                        key={item.id}
                        className="absolute"
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: parallaxX,
                            y: parallaxY
                        }}
                        animate={{
                            opacity: [0, 0.06, 0.1, 0.06, 0],
                            scale: [0.8, 1, 1.2, 1, 0.8],
                            rotate: [item.rotation, item.rotation + 180, item.rotation + 360],
                            y: [parallaxY, parallaxY - 30, parallaxY - 60, parallaxY - 30, parallaxY],
                            x: parallaxX
                        }}
                        transition={{
                            duration: item.duration,
                            delay: item.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="text-primary/20" style={{ filter: 'blur(0.5px)' }}>
                            {item.type === 'paw' ? (
                                <PawPrint size={item.size} strokeWidth={1.5} />
                            ) : (
                                <Bone size={item.size} strokeWidth={1.5} />
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
