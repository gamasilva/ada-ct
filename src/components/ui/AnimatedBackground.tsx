import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Bone } from 'lucide-react';

export const AnimatedBackground = () => {
    const [items, setItems] = useState<{ id: number; x: number; y: number; size: number; duration: number; type: string }[]>([]);

    useEffect(() => {
        // Generate random items on client side
        const newItems = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random Horizontal Position
            y: Math.random() * 100, // Random Vertical Start Position
            size: Math.random() * 20 + 10, // Size between 10px and 30px
            duration: Math.random() * 20 + 10, // Animation duration between 10s and 30s
            type: Math.random() > 0.6 ? 'bone' : 'paw'
        }));
        setItems(newItems);
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    className={`absolute ${item.type === 'paw' ? 'text-primary' : 'text-secondary'} opacity-10`}
                    initial={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        opacity: 0.05,
                        scale: 0.8
                    }}
                    animate={{
                        y: [0, -100, 0], // Float up and down slightly
                        x: [0, Math.random() * 50 - 25, 0], // Wander horizontally
                        rotate: [0, 360], // Rotate continuously
                        opacity: [0.05, 0.15, 0.05], // Pulse opacity
                        scale: [0.8, 1.1, 0.8] // Pulse size
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.5, 1] // Keyframe timing
                    }}
                >
                    {item.type === 'paw' ?
                        <PawPrint size={item.size} /> :
                        <Bone size={item.size} />
                    }
                </motion.div>
            ))}
        </div>
    );
};
