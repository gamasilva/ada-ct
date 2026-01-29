import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PawPrint, Bone } from 'lucide-react';

interface FloatingItem {
    id: number;
    type: 'paw' | 'bone';
    x: number;
    y: number;
    size: number;
    rotation: number;
    duration: number;
    depth: number; // For parallax effect strength
    color: 'primary' | 'secondary';
}

export const InteractiveDogBackground = () => {
    const [items, setItems] = useState<FloatingItem[]>([]);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Apply spring physics for smooth movement
    const springConfig = { damping: 50, stiffness: 100, mass: 0.5 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Generate floating items on mount (client-side only)
    useEffect(() => {
        // Optimization: Disable on mobile to improve PageSpeed/TBT
        if (window.innerWidth < 768) return;

        const generatedItems: FloatingItem[] = Array.from({ length: 18 }).map((_, i) => ({
            id: i,
            type: Math.random() > 0.5 ? 'paw' : 'bone',
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 1 + 0.5, // 0.5 to 1.5
            rotation: Math.random() * 360,
            duration: Math.random() * 40 + 20, // 20s to 60s
            depth: Math.random() * 0.8 + 0.2, // 0.2 to 1 (parallax multiplier)
            color: Math.random() > 0.5 ? 'primary' : 'secondary',
        }));
        setItems(generatedItems);
    }, []);

    // Mouse move handler
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1 centered on screen
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const normalizedX = (e.clientX - centerX) / centerX;
            const normalizedY = (e.clientY - centerY) / centerY;

            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    if (items.length === 0) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {items.map((item) => (
                <FloatingElement
                    key={item.id}
                    item={item}
                    smoothMouseX={smoothMouseX}
                    smoothMouseY={smoothMouseY}
                />
            ))}
        </div>
    );
};

// Separate component for each floating element to use hooks properly
interface FloatingElementProps {
    item: FloatingItem;
    smoothMouseX: any;
    smoothMouseY: any;
}

const FloatingElement = ({ item, smoothMouseX, smoothMouseY }: FloatingElementProps) => {
    // Calculate parallax offset based on depth
    const parallaxStrength = 50 * item.depth;
    const offsetX = useTransform(smoothMouseX, [-1, 1], [-parallaxStrength, parallaxStrength]);
    const offsetY = useTransform(smoothMouseY, [-1, 1], [-parallaxStrength, parallaxStrength]);

    const IconComponent = item.type === 'paw' ? PawPrint : Bone;
    const colorClass = item.color === 'primary' ? 'text-[#65a30d]' : 'text-[#eab308]';

    return (
        <motion.div
            className={`absolute ${colorClass}`}
            style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                x: offsetX,
                y: offsetY,
                scale: item.size,
                rotate: item.rotation,
                opacity: 0.08 + item.depth * 0.08, // 0.08 to 0.16 based on depth
            }}
            animate={{
                x: [0, Math.random() * 80 - 40, 0],
                y: [0, Math.random() * 80 - 40, 0],
                rotate: [item.rotation, item.rotation + 180, item.rotation + 360],
            }}
            transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <IconComponent size={40} strokeWidth={1.5} />
        </motion.div>
    );
};
