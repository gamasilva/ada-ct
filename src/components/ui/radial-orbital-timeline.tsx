import { useState, useEffect, useRef } from "react";
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
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) newState[parseInt(key)] = false;
            });
            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);
                const relatedItems = timelineData.find((i) => i.id === id)?.relatedIds || [];
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }
            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer: ReturnType<typeof setInterval>;
        if (autoRotate) {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
            }, 50);
        }
        return () => {
            if (rotationTimer) clearInterval(rotationTimer);
        };
    }, [autoRotate]);

    const centerViewOnNode = (nodeId: number) => {
        if (!nodeRefs.current[nodeId]) return;
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        setRotationAngle(270 - (nodeIndex / timelineData.length) * 360);
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radian = (angle * Math.PI) / 180;
        return {
            x: 200 * Math.cos(radian),
            y: 200 * Math.sin(radian),
            angle,
            zIndex: Math.round(100 + 50 * Math.cos(radian)),
            opacity: 1,
        };
    };

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
            className="w-full flex flex-col items-center justify-center overflow-hidden relative"
            style={{ height: "700px" }}
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{ perspective: "1000px" }}
                >
                    {/* Central Orb — Paw Print */}
                    <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-green-500 via-green-700 to-green-900 flex items-center justify-center z-10 shadow-2xl shadow-green-500/30">
                        <div className="absolute w-28 h-28 rounded-full border-2 border-green-400/30 animate-ping opacity-60"></div>
                        <div
                            className="absolute w-32 h-32 rounded-full border border-green-400/20 animate-ping opacity-40"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <span className="text-4xl filter drop-shadow-lg">🐾</span>
                    </div>

                    {/* Orbit Ring */}
                    <div className="absolute w-96 h-96 rounded-full border border-green-200/20"></div>
                    <div className="absolute w-[26rem] h-[26rem] rounded-full border border-dashed border-green-200/10"></div>

                    {/* Nodes */}
                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = activeNodeId
                            ? timelineData.find((i) => i.id === activeNodeId)?.relatedIds.includes(item.id) || false
                            : false;
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { nodeRefs.current[item.id] = el; }}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    zIndex: isExpanded ? 200 : position.zIndex,
                                    opacity: isExpanded ? 1 : position.opacity,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                {/* Glow */}
                                <div
                                    className={`absolute rounded-full -inset-1 ${pulseEffect[item.id] ? "animate-pulse" : ""}`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(101, 163, 13, 0.25) 0%, rgba(101, 163, 13, 0) 70%)`,
                                        width: "60px",
                                        height: "60px",
                                        left: "-10px",
                                        top: "-10px",
                                    }}
                                ></div>

                                {/* Node Icon */}
                                <div
                                    className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 transform ${isExpanded
                                            ? "bg-yellow-400 text-green-900 border-yellow-300 shadow-2xl shadow-yellow-500/50 scale-125"
                                            : isRelated
                                                ? "bg-yellow-400 text-green-900 border-green-400 animate-pulse"
                                                : "bg-green-800 text-yellow-400 border-green-700 shadow-xl"
                                        }`}
                                >
                                    <Icon size={44} strokeWidth={2.5} />
                                </div>

                                {/* Node Label */}
                                <div
                                    className={`absolute top-28 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-black uppercase tracking-widest transition-all duration-300 ${isExpanded ? "text-green-800 scale-110" : "text-green-900 drop-shadow-sm"
                                        }`}
                                >
                                    {item.title}
                                </div>

                                {/* Expanded Card — Large & Informative */}
                                {isExpanded && (
                                    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-80 bg-white/98 backdrop-blur-lg border-green-500/30 shadow-2xl shadow-green-900/20 overflow-visible rounded-2xl">
                                        {/* Connector Line */}
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-transparent to-green-400"></div>

                                        <CardHeader className="pb-3 pt-5 px-5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg">
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

                                        <CardContent className="px-5 pb-5">
                                            {/* Description */}
                                            <p className="text-sm text-gray-600 leading-relaxed mb-5">{item.content}</p>

                                            {/* Tags */}
                                            <div className="pt-4 border-t border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                    O que inclui
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags.map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-800 text-[11px] font-bold border border-green-100 hover:bg-green-100 hover:border-green-300 transition-colors cursor-default"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
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
