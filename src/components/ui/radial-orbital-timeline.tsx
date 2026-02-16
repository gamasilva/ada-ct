import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface TimelineItem {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "available" | "popular" | "new";
    tags: string[];
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [, forceUpdate] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    // Use refs for animation to avoid React re-renders
    const rotationAngleRef = useRef(0);
    const autoRotateRef = useRef(true);
    const rafIdRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const orbitRadius = isMobile ? 120 : 200;
    const nodeSize = isMobile ? "w-16 h-16" : "w-24 h-24";
    const iconSize = isMobile ? 28 : 44;
    const labelTop = isMobile ? "top-20" : "top-28";
    const centralSize = isMobile ? "w-16 h-16" : "w-24 h-24";
    const centralEmoji = isMobile ? "text-2xl" : "text-4xl";

    // Calculate position without triggering re-render
    const calculateNodePosition = useCallback((index: number, total: number, angle: number) => {
        const nodeAngle = ((index / total) * 360 + angle) % 360;
        const radian = (nodeAngle * Math.PI) / 180;
        return {
            x: orbitRadius * Math.cos(radian),
            y: orbitRadius * Math.sin(radian),
            zIndex: Math.round(100 + 50 * Math.cos(radian)),
        };
    }, [orbitRadius]);

    // RAF-based animation loop — updates DOM directly, no React state
    useEffect(() => {
        const animate = (timestamp: number) => {
            if (!autoRotateRef.current) {
                lastTimeRef.current = timestamp;
                rafIdRef.current = requestAnimationFrame(animate);
                return;
            }

            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const delta = timestamp - lastTimeRef.current;

            // ~6 degrees/sec — smooth and light
            if (delta > 0) {
                rotationAngleRef.current = (rotationAngleRef.current + delta * 0.006) % 360;
                lastTimeRef.current = timestamp;

                // Update node positions via direct DOM manipulation
                timelineData.forEach((item, index) => {
                    const el = nodeRefs.current[item.id];
                    if (!el) return;
                    const pos = calculateNodePosition(index, timelineData.length, rotationAngleRef.current);
                    el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
                    el.style.zIndex = String(pos.zIndex);
                });
            }

            rafIdRef.current = requestAnimationFrame(animate);
        };

        rafIdRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafIdRef.current);
    }, [timelineData, calculateNodePosition]);

    const centerViewOnNode = useCallback((nodeId: number) => {
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        rotationAngleRef.current = 270 - (nodeIndex / timelineData.length) * 360;

        // Apply immediately
        timelineData.forEach((item, index) => {
            const el = nodeRefs.current[item.id];
            if (!el) return;
            const pos = calculateNodePosition(index, timelineData.length, rotationAngleRef.current);
            el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
            el.style.zIndex = String(pos.zIndex);
        });
    }, [timelineData, calculateNodePosition]);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            autoRotateRef.current = true;
        }
    };

    const toggleItem = useCallback((id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) newState[parseInt(key)] = false;
            });
            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                autoRotateRef.current = false;
                const relatedItems = timelineData.find((i) => i.id === id)?.relatedIds || [];
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                autoRotateRef.current = true;
                setPulseEffect({});
            }
            return newState;
        });
    }, [timelineData, centerViewOnNode]);

    const getStatusStyles = (status: TimelineItem["status"]): string => {
        switch (status) {
            case "popular":
                return "text-white bg-green-700 border-green-500";
            case "new":
                return "text-green-900 bg-yellow-400 border-yellow-300";
            case "available":
                return "text-green-800 bg-green-100 border-green-300";
            default:
                return "text-white bg-green-900/40 border-green-200/50";
        }
    };

    return (
        <div
            className="w-full flex flex-col items-center justify-center relative"
            style={{ height: isMobile ? "500px" : "700px", overflow: "visible" }}
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                >
                    {/* Central Orb — Paw Print (simplified on mobile: no ping animations) */}
                    <div className={`absolute ${centralSize} rounded-full bg-gradient-to-br from-green-500 via-green-700 to-green-900 flex items-center justify-center z-10 shadow-2xl shadow-green-500/30`}>
                        {!isMobile && (
                            <>
                                <div className="absolute w-28 h-28 rounded-full border-2 border-green-400/30 animate-ping opacity-60"></div>
                                <div
                                    className="absolute w-32 h-32 rounded-full border border-green-400/20 animate-ping opacity-40"
                                    style={{ animationDelay: "0.5s" }}
                                ></div>
                            </>
                        )}
                        <span className={`${centralEmoji} filter drop-shadow-lg`}>🐾</span>
                    </div>

                    {/* Orbit Ring */}
                    <div
                        className="absolute rounded-full border border-green-200/20"
                        style={{ width: `${orbitRadius * 2}px`, height: `${orbitRadius * 2}px` }}
                    ></div>
                    {!isMobile && (
                        <div
                            className="absolute rounded-full border border-dashed border-green-200/10"
                            style={{ width: `${orbitRadius * 2 + 32}px`, height: `${orbitRadius * 2 + 32}px` }}
                        ></div>
                    )}

                    {/* Nodes */}
                    {timelineData.map((item, index) => {
                        const isExpanded = expandedItems[item.id];
                        const isRelated = activeNodeId
                            ? timelineData.find((i) => i.id === activeNodeId)?.relatedIds.includes(item.id) || false
                            : false;
                        const Icon = item.icon;

                        // Initial position for SSR/first render
                        const initPos = calculateNodePosition(index, timelineData.length, rotationAngleRef.current);

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { nodeRefs.current[item.id] = el; }}
                                className="absolute cursor-pointer"
                                style={{
                                    transform: `translate3d(${initPos.x}px, ${initPos.y}px, 0)`,
                                    zIndex: isExpanded ? 200 : initPos.zIndex,
                                    willChange: 'transform',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                {/* Glow — only on desktop or when active */}
                                {(!isMobile || isExpanded || isRelated) && (
                                    <div
                                        className={`absolute rounded-full -inset-1 ${pulseEffect[item.id] ? "animate-pulse" : ""}`}
                                        style={{
                                            background: `radial-gradient(circle, rgba(101, 163, 13, 0.25) 0%, rgba(101, 163, 13, 0) 70%)`,
                                            width: isMobile ? "40px" : "60px",
                                            height: isMobile ? "40px" : "60px",
                                            left: isMobile ? "-4px" : "-10px",
                                            top: isMobile ? "-4px" : "-10px",
                                        }}
                                    ></div>
                                )}

                                {/* Node Icon */}
                                <div
                                    className={`${nodeSize} rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${isExpanded
                                        ? "bg-yellow-400 text-green-900 border-yellow-300 shadow-2xl shadow-yellow-500/50 scale-125"
                                        : isRelated
                                            ? "bg-yellow-400 text-green-900 border-green-400"
                                            : "bg-green-800 text-yellow-400 border-green-700 shadow-xl"
                                        }`}
                                >
                                    <Icon size={iconSize} strokeWidth={2.5} />
                                </div>

                                {/* Node Label */}
                                <div
                                    className={`absolute ${labelTop} left-1/2 -translate-x-1/2 whitespace-nowrap font-black uppercase tracking-widest ${isMobile ? "text-[10px]" : "text-sm"
                                        } ${isExpanded ? "text-green-800 scale-110" : "text-green-900 drop-shadow-sm"
                                        }`}
                                >
                                    {item.title}
                                </div>

                                {/* Expanded Card */}
                                {isExpanded && (
                                    <Card
                                        className={`absolute left-1/2 -translate-x-1/2 bg-white border-green-500/30 shadow-2xl shadow-green-900/20 overflow-visible rounded-2xl ${isMobile ? "w-72 top-24" : "w-80 top-36"
                                            }`}
                                    >
                                        {/* Connector Line */}
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-transparent to-green-400"></div>

                                        <CardHeader className={`pb-3 ${isMobile ? "pt-4 px-4" : "pt-5 px-5"}`}>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg flex-shrink-0">
                                                    <Icon size={20} className="text-white" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg text-green-900 font-black tracking-tight leading-tight">
                                                        {item.title}
                                                    </CardTitle>
                                                    <span className="text-xs text-gray-400 font-medium">{item.subtitle}</span>
                                                </div>
                                            </div>
                                            <Badge className={`px-2.5 py-1 text-[10px] border font-bold uppercase tracking-wider ${getStatusStyles(item.status)}`}>
                                                {item.category}
                                            </Badge>
                                        </CardHeader>

                                        <CardContent className={`${isMobile ? "px-4 pb-4" : "px-5 pb-5"}`}>
                                            {/* Description */}
                                            <p className={`text-gray-600 leading-relaxed mb-5 ${isMobile ? "text-xs" : "text-sm"}`}>
                                                {item.content}
                                            </p>

                                            {/* Tags */}
                                            <div className="pt-4 border-t border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                    O que inclui
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {item.tags.map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`inline-flex items-center gap-1.5 rounded-lg bg-green-50 text-green-800 font-bold border border-green-100 cursor-default ${isMobile ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
                                                                }`}
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Mobile Navigation Arrows */}
                                            {isMobile && (
                                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const currentIndex = timelineData.findIndex((i) => i.id === item.id);
                                                            const prevIndex = (currentIndex - 1 + timelineData.length) % timelineData.length;
                                                            toggleItem(timelineData[prevIndex].id);
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-green-100 text-green-800 font-bold text-xs active:scale-95"
                                                        aria-label="Serviço anterior"
                                                    >
                                                        <ChevronLeft size={16} />
                                                        Anterior
                                                    </button>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        {timelineData.findIndex((i) => i.id === item.id) + 1} / {timelineData.length}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const currentIndex = timelineData.findIndex((i) => i.id === item.id);
                                                            const nextIndex = (currentIndex + 1) % timelineData.length;
                                                            toggleItem(timelineData[nextIndex].id);
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-green-700 text-white font-bold text-xs active:scale-95"
                                                        aria-label="Próximo serviço"
                                                    >
                                                        Próximo
                                                        <ChevronRight size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
