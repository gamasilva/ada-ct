import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Bone } from 'lucide-react';

// Brand colors - more vibrant
const COLORS = ['#65a30d', '#eab308'];

// Generate randomized background elements
const generateElements = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        type: Math.random() > 0.5 ? 'paw' : 'bone',
        top: Math.random() * 300, // Spread over 300vh
        left: Math.random() * 95, // 0% to 95%
        rotation: Math.random() * 90 - 45, // -45deg to 45deg
        scale: Math.random() * 0.8 + 0.9, // 0.9 to 1.7 (LARGER)
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 40 + 40, // 40px to 80px (MUCH BIGGER)
        delay: Math.random() * 0.3 // Random delay for staggered effect
    }));
};

export const ScrollRevealBackground = () => {
    // Generate elements only on client-side to match server HTML
    const [elements, setElements] = React.useState<ReturnType<typeof generateElements>>([]);

    React.useEffect(() => {
        // Optimization: Disable on mobile to improve PageSpeed/TBT
        if (window.innerWidth < 768) return;

        setElements(generateElements(60));
    }, []);

    if (elements.length === 0) return null;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {elements.map((element) => {
                const Icon = element.type === 'paw' ? PawPrint : Bone;

                return (
                    <motion.div
                        key={element.id}
                        style={{
                            position: 'absolute',
                            top: `${element.top}vh`,
                            left: `${element.left}%`,
                            transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
                            color: element.color,
                            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
                        }}
                        initial={{
                            opacity: 0,
                            y: 80,
                            scale: 0.3
                        }}
                        whileInView={{
                            opacity: 0.4,
                            y: 0,
                            scale: 1
                        }}
                        viewport={{
                            once: true,
                            margin: "-100px"
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: element.delay
                        }}
                    >
                        <Icon
                            size={element.size}
                            strokeWidth={2}
                            fill={element.type === 'paw' ? 'currentColor' : 'none'}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};
