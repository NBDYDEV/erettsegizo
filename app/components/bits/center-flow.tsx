"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useTheme } from "next-themes";

export interface NodeItem {
  /** Icon/Graphic to render inside the node circle anchor */
  icon?: ReactNode;
  /** Rich content to render adjacent to the node (cards, text blocks, etc.) */
  content?: ReactNode;
}

export interface CenterFlowProps {
  /** Array of node items defining what content goes into each node */
  nodeItems?: NodeItem[];
  /** Content to render inside the center node */
  centerContent?: ReactNode;
  /** Center square size in pixels */
  centerSize?: number;
  /** Outer node anchor size in pixels */
  nodeSize?: number;
  /** Pulse travel duration in seconds */
  pulseDuration?: number;
  /** Average delay between pulses spawning */
  pulseInterval?: number;
  /** Pulse line length as percentage of path (0-1) */
  pulseLength?: number;
  /** Line stroke width */
  lineWidth?: number;
  /** Pulse line stroke width */
  pulseWidth?: number;
  /** Pulse blur/softness (0-10) */
  pulseSoftness?: number;
  /** Line color (dark mode) */
  lineColor?: string;
  /** Line color (light mode) */
  lineColorLight?: string;
  /** Pulse color (dark mode) */
  pulseColor?: string;
  /** Pulse color (light mode) */
  pulseColorLight?: string;
  /** Center glow color (dark mode) */
  glowColor?: string;
  /** Center glow color (light mode) */
  glowColorLight?: string;
  /** Maximum glow intensity */
  maxGlowIntensity?: number;
  /** Glow decay speed (higher = faster decay) */
  glowDecay?: number;
  /** Border radius for center square */
  borderRadius?: number;
  /** Distance of nodes from center as a fraction (0-1) */
  nodeDistance?: number;
  /** Disable glow intensification when pulses arrive */
  disableBlinking?: boolean;
  className?: string;
}

interface PulseState {
  id: string;
  pathIndex: number;
  startTime: number;
}

interface PulseSegment {
  id: string;
  d: string;
  opacity: number;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
}

const BASE_GLOW = 40;
const FADE_THRESHOLD = 0.15;

const DEFAULT_NODE_ITEMS: NodeItem[] = Array(8).fill({});

/** Returns angle-snapped placement style for floating content boxes */
function getContentPlacementStyle(angle: number, offset: number): React.CSSProperties {
  const normalised = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const deg = (normalised * 180) / Math.PI;

  const base: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
    // On mobile: use smaller cards so they fit; on desktop: up to 240px
    width: "min(42vw, 240px)",
    pointerEvents: "auto",
  };

  if (deg >= 337.5 || deg < 22.5) {
    // right
    return { ...base, left: `calc(100% + ${offset}px)`, top: "50%", transform: "translateY(-50%)" };
  } else if (deg < 67.5) {
    // bottom-right
    return { ...base, left: `calc(100% + ${offset}px)`, top: `calc(100% + ${offset}px)` };
  } else if (deg < 112.5) {
    // bottom
    return { ...base, top: `calc(100% + ${offset}px)`, left: "50%", transform: "translateX(-50%)" };
  } else if (deg < 157.5) {
    // bottom-left
    return { ...base, right: `calc(100% + ${offset}px)`, top: `calc(100% + ${offset}px)` };
  } else if (deg < 202.5) {
    // left
    return { ...base, right: `calc(100% + ${offset}px)`, top: "50%", transform: "translateY(-50%)" };
  } else if (deg < 247.5) {
    // top-left
    return { ...base, right: `calc(100% + ${offset}px)`, bottom: `calc(100% + ${offset}px)` };
  } else if (deg < 292.5) {
    // top
    return { ...base, bottom: `calc(100% + ${offset}px)`, left: "50%", transform: "translateX(-50%)" };
  } else {
    // top-right
    return { ...base, left: `calc(100% + ${offset}px)`, bottom: `calc(100% + ${offset}px)` };
  }
}

const generateNodePositions = (
  count: number,
  distance: number,
  dims: { width: number; height: number },
) => {
  const clamped = Math.max(2, count);
  const angleStep = (Math.PI * 2) / clamped;

  // Use an ellipse so nodes stay inside the container on any aspect ratio
  const halfW = dims.width / 2;
  const halfH = dims.height / 2;
  const rx = halfW * distance * 0.82;
  const ry = halfH * distance * 0.82;

  return Array.from({ length: clamped }, (_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: halfW + Math.cos(angle) * rx,
      y: halfH + Math.sin(angle) * ry,
      angle,
    };
  });
};

const generatePathD = (
  from: { x: number; y: number },
  to: { x: number; y: number },
) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return `M ${from.x} ${from.y} C ${from.x + dx * 0.4} ${from.y + dy * 0.1}, ${from.x + dx * 0.6} ${to.y - dy * 0.1}, ${to.x} ${to.y}`;
};

const CenterFlow: React.FC<CenterFlowProps> = ({
  nodeItems = DEFAULT_NODE_ITEMS,
  centerContent,
  centerSize = 140,
  nodeSize = 56,
  pulseDuration = 5,
  pulseInterval = 10,
  pulseLength = 0.4,
  lineWidth = 2,
  pulseWidth = 1,
  pulseSoftness = 10,
  lineColor = "#333",
  lineColorLight = "#e0e0e0",
  pulseColor = "#e724eb",
  pulseColorLight = "#e724eb",
  glowColor = "#e724eb",
  glowColorLight = "#e724eb",
  maxGlowIntensity = 25,
  glowDecay = 0.95,
  borderRadius = 35,
  nodeDistance = 0.85,
  disableBlinking = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowIntensityRef = useRef(0);
  const pathCacheRef = useRef<Map<number, SVGPathElement>>(new Map());

  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const activeLineColor = isLight ? lineColorLight : lineColor;
  const activePulseColor = isLight ? pulseColorLight : pulseColor;
  const activeGlowColor = isLight ? glowColorLight : glowColor;

  const nodeBgColor = isLight ? "rgba(255,255,255,0.90)" : "rgba(10,10,10,0.90)";
  const centerBgColor = isLight ? "rgba(255,255,255,0.95)" : "rgba(10,10,10,0.95)";

  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [pulses, setPulses] = useState<PulseState[]>([]);
  const [pulseSegments, setPulseSegments] = useState<PulseSegment[]>([]);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) setDimensions({ width, height });
      }
    };
    update();
    setTimeout(update, 150);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const nodePositions = useMemo(
    () => generateNodePositions(nodeItems.length, nodeDistance, dimensions),
    [nodeItems.length, nodeDistance, dimensions],
  );

  const center = useMemo(
    () => ({ x: dimensions.width / 2, y: dimensions.height / 2 }),
    [dimensions],
  );

  const softness = pulseSoftness / 10;
  const tailStop = softness * 30;
  const headStop = 100 - softness * 20;

  const onPulseArrive = useCallback(() => {
    if (disableBlinking) return;
    glowIntensityRef.current = Math.min(
      glowIntensityRef.current + maxGlowIntensity * 0.6,
      maxGlowIntensity,
    );
  }, [maxGlowIntensity, disableBlinking]);

  // Glow animation loop
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      if (glowRef.current) {
        const dyn = glowIntensityRef.current;
        const total = BASE_GLOW + dyn;
        const spread = total * 0.8;
        const blur = total * 1.5;
        const alpha = Math.min(255, Math.floor(total * 4)).toString(16).padStart(2, "0");
        glowRef.current.style.boxShadow = `0 0 ${blur}px ${spread}px ${activeGlowColor}40, 0 0 ${blur * 2}px ${spread * 1.5}px ${activeGlowColor}20, inset 0 0 ${blur * 0.5}px ${activeGlowColor}30`;
        glowRef.current.style.borderColor = `${activeGlowColor}${alpha}`;
        glowIntensityRef.current = dyn > 0.5 ? dyn * glowDecay : 0;
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [activeGlowColor, glowDecay]);

  // Pulse spawning
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const spawn = (idx: number) => {
      setPulses((prev) => [
        ...prev,
        { id: `${idx}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, pathIndex: idx, startTime: Date.now() },
      ]);
      const t = setTimeout(() => spawn(idx), pulseInterval * 1000 * (0.7 + Math.random() * 0.6));
      timeouts.push(t);
    };
    nodePositions.forEach((_, i) => {
      const t = setTimeout(() => spawn(i), Math.random() * pulseInterval * 1000);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [nodePositions, pulseInterval]);

  // Pulse lifecycle
  useEffect(() => {
    let fId: number;
    const dur = pulseDuration * 1000;
    const tick = () => {
      const now = Date.now();
      setPulses((prev) => prev.filter((p) => {
        if ((now - p.startTime) / dur >= 1) { onPulseArrive(); return false; }
        return true;
      }));
      fId = requestAnimationFrame(tick);
    };
    fId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(fId);
  }, [pulseDuration, onPulseArrive]);

  // Clear cache on position change
  useEffect(() => { pathCacheRef.current.clear(); }, [nodePositions, center]);

  // Segment calculation
  useEffect(() => {
    let fId: number;
    const dur = pulseDuration * 1000;
    const calc = () => {
      const now = Date.now();
      const segs: PulseSegment[] = [];
      for (const pulse of pulses) {
        const from = nodePositions[pulse.pathIndex];
        if (!from) continue;
        let path = pathCacheRef.current.get(pulse.pathIndex);
        if (!path) {
          path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", generatePathD(from, center));
          pathCacheRef.current.set(pulse.pathIndex, path);
        }
        const progress = Math.min((now - pulse.startTime) / dur, 1);
        if (progress <= 0 || progress >= 1) continue;
        const length = path.getTotalLength();
        const headPos = progress;
        const tailPos = Math.max(0, progress - pulseLength);
        const points = Array.from({ length: 9 }, (_, i) => {
          const pt = path!.getPointAtLength(length * (tailPos + (headPos - tailPos) * (i / 8)));
          return { x: pt.x, y: pt.y };
        });
        const opacity =
          Math.min(1, progress / FADE_THRESHOLD) * Math.min(1, (1 - progress) / FADE_THRESHOLD);
        segs.push({
          id: pulse.id,
          d: `M ${points[0].x} ${points[0].y}` + points.slice(1).map((p) => ` L ${p.x} ${p.y}`).join(""),
          opacity,
          startPoint: points[0],
          endPoint: points[points.length - 1],
        });
      }
      setPulseSegments(segs);
      fId = requestAnimationFrame(calc);
    };
    fId = requestAnimationFrame(calc);
    return () => cancelAnimationFrame(fId);
  }, [pulses, nodePositions, center, pulseDuration, pulseLength]);

  const nodeAnchorStyle = useMemo(
    () => ({
      borderRadius: borderRadius * 0.6,
      background: nodeBgColor,
      backdropFilter: "blur(8px)",
      border: `1px solid ${isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
      boxShadow: isLight ? "0 2px 8px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.3)",
    }),
    [borderRadius, isLight, nodeBgColor],
  );

  const centerStyle = useMemo(
    () => ({
      left: center.x,
      top: center.y,
      width: centerSize,
      height: centerSize,
      borderRadius,
      background: centerBgColor,
      backdropFilter: "blur(12px)",
      border: `2px solid ${activeGlowColor}20`,
    }),
    [center.x, center.y, centerSize, borderRadius, centerBgColor, activeGlowColor],
  );

  const defaultCenter = (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" style={{ color: activePulseColor }}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const defaultNodeIcon = (
    <div className="w-3 h-3 rounded-full" style={{ background: `${activePulseColor}40`, boxShadow: `0 0 8px ${activePulseColor}30` }} />
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className || ""}`}
      style={{ background: "transparent" }}
    >
      {/* SVG lines & pulses */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        <defs>
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {pulseSegments.map((s) => (
            <linearGradient
              key={`g-${s.id}`}
              id={`pg-${s.id}`}
              x1={s.startPoint.x} y1={s.startPoint.y}
              x2={s.endPoint.x} y2={s.endPoint.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={activePulseColor} stopOpacity="0" />
              <stop offset={`${tailStop}%`} stopColor={activePulseColor} stopOpacity="1" />
              <stop offset={`${headStop}%`} stopColor={activePulseColor} stopOpacity="1" />
              <stop offset="100%" stopColor={activePulseColor} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {nodePositions.map((n, i) => (
          <path key={i} d={generatePathD(n, center)} fill="none" stroke={activeLineColor} strokeWidth={lineWidth} strokeLinecap="round" />
        ))}
        {pulseSegments.map((s) => (
          <g key={s.id}>
            <path d={s.d} fill="none" stroke={`url(#pg-${s.id})`} strokeWidth={pulseWidth * 3} strokeLinecap="round" opacity={s.opacity * 0.4} filter="url(#pulseGlow)" />
            <path d={s.d} fill="none" stroke={`url(#pg-${s.id})`} strokeWidth={pulseWidth} strokeLinecap="round" opacity={s.opacity} />
          </g>
        ))}
      </svg>

      {/* Node anchors + floating content */}
      {nodePositions.map((node, i) => {
        const item = nodeItems[i];
        const hasContent = !!item?.content;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: node.x,
              top: node.y,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            {/* Anchor dot */}
            <div
              className="flex items-center justify-center"
              style={{ width: nodeSize, height: nodeSize, ...nodeAnchorStyle }}
            >
              {item?.icon ?? defaultNodeIcon}
            </div>

            {/* Floating content card */}
            {hasContent && (
              <div style={getContentPlacementStyle(node.angle, nodeSize / 2 + 6)}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}

      {/* Center node */}
      <div
        ref={glowRef}
        className="absolute flex items-center justify-center transition-colors duration-300"
        style={{ ...centerStyle, transform: "translate(-50%, -50%)", zIndex: 15 }}
      >
        <div style={{ width: centerSize * 0.65, height: centerSize * 0.65 }} className="flex items-center justify-center">
          {centerContent ?? defaultCenter}
        </div>
      </div>
    </div>
  );
};

CenterFlow.displayName = "CenterFlow";
export default CenterFlow;
