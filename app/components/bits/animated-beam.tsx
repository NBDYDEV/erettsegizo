"use client"

import { useEffect, useId, useMemo, useState, type RefObject } from "react"
import { motion, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  repeat?: number
  repeatDelay?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
  showParticles?: boolean
  particleCount?: number
  particleSize?: number
  particleSpread?: number
  scrollProgress?: MotionValue<number>
}

interface BezierPoints {
  sx: number; sy: number
  cx: number; cy: number
  ex: number; ey: number
}

function bezierPoint(t: number, b: BezierPoints) {
  const mt = 1 - t
  return {
    x: mt * mt * b.sx + 2 * mt * t * b.cx + t * t * b.ex,
    y: mt * mt * b.sy + 2 * mt * t * b.cy + t * t * b.ey,
  }
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#000",
  gradientStopColor = "#CEFF06",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  showParticles = false,
  particleCount = 18,
  particleSize = 5,
  particleSpread = 8,
  scrollProgress,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [bezier, setBezier] = useState<BezierPoints>({ sx: 0, sy: 0, cx: 0, cy: 0, ex: 0, ey: 0 })
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const [scrollP, setScrollP] = useState(0)

  const isScrollDriven = !!scrollProgress

  useEffect(() => {
    if (!scrollProgress) return
    const unsub = scrollProgress.on("change", setScrollP)
    return unsub
  }, [scrollProgress])

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }

  const particles = useMemo(() => {
    if (!showParticles) return []
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: particleSize * (0.4 + Math.random() * 0.8),
      offsetX: (Math.random() - 0.5) * particleSpread,
      offsetY: (Math.random() - 0.5) * particleSpread,
      trailOffset: (i / particleCount) * 0.12,
      timeOffset: (i / particleCount) * 0.7 + Math.random() * 0.15,
      opacity: 0.4 + Math.random() * 0.6,
    }))
  }, [showParticles, particleCount, particleSize, particleSpread])

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const sx = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const sy = rectA.top - containerRect.top + rectA.height / 2 + startYOffset
        const ex = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const ey = rectB.top - containerRect.top + rectB.height / 2 + endYOffset
        const cxp = (sx + ex) / 2
        const cyp = sy - curvature

        setPathD(`M ${sx},${sy} Q ${cxp},${cyp} ${ex},${ey}`)
        setBezier({ sx, sy, cx: cxp, cy: cyp, ex, ey })
      }
    }

    const resizeObserver = new ResizeObserver(() => updatePath())
    if (containerRef.current) resizeObserver.observe(containerRef.current)
    updatePath()
    return () => resizeObserver.disconnect()
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  const scrollGradientX1 = `${10 + scrollP * 100}%`
  const scrollGradientX2 = `${scrollP * 100}%`

  const scrollParticleData = useMemo(() => {
    if (!isScrollDriven || !showParticles) return []
    return particles.map((p) => {
      const t = Math.max(0, Math.min(1, scrollP - p.trailOffset))
      if (t <= 0.005) return null
      const pos = bezierPoint(t, bezier)
      const headT = Math.min(1, scrollP)
      const distFromHead = Math.abs(headT - t)
      const fade = Math.max(0, 1 - distFromHead / 0.15)
      return {
        ...p,
        cx: pos.x + p.offsetX,
        cy: pos.y + p.offsetY,
        computedOpacity: p.opacity * fade * (scrollP > 0.01 ? 1 : 0),
        computedSize: p.size * (0.5 + fade * 0.5),
      }
    }).filter(Boolean)
  }, [isScrollDriven, showParticles, scrollP, bezier, particles])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute top-0 left-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>

        {showParticles && (
          <filter id={`${id}-glow`}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />

      {isScrollDriven && showParticles && scrollParticleData.map((p: any) => (
        <circle
          key={p.id}
          cx={p.cx}
          cy={p.cy}
          r={p.computedSize}
          fill={gradientStopColor}
          opacity={p.computedOpacity}
          filter={`url(#${id}-glow)`}
        />
      ))}

      {!isScrollDriven && showParticles && pathD && particles.map((p) => {
        const particleDur = duration * (0.35 + Math.random() * 0.25)
        const particleBegin = delay + duration * p.timeOffset
        return (
          <circle
            key={p.id}
            r={p.size}
            fill={gradientStopColor}
            opacity={0}
            filter={`url(#${id}-glow)`}
            transform={`translate(${p.offsetX}, ${p.offsetY})`}
          >
            <animateMotion
              path={pathD}
              dur={`${particleDur}s`}
              begin={`${particleBegin}s`}
              repeatCount="indefinite"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
              keyTimes="0;1"
            />
            <animate attributeName="opacity" values={`0;${p.opacity};${p.opacity};0`} keyTimes="0;0.15;0.7;1" dur={`${particleDur}s`} begin={`${particleBegin}s`} repeatCount="indefinite" />
            <animate attributeName="r" values={`${p.size * 0.3};${p.size};${p.size * 0.8};${p.size * 0.2}`} keyTimes="0;0.2;0.7;1" dur={`${particleDur}s`} begin={`${particleBegin}s`} repeatCount="indefinite" />
          </circle>
        )
      })}
    </svg>
  )
}