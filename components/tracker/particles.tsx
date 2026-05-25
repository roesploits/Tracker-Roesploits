"use client"

import { useMemo } from "react"

export function Particles() {
  const dots = useMemo(() => {
    // Generate stable random values seeded by index to avoid re-render conflicts
    return Array.from({ length: 30 }, (_, i) => {
      // Use index-based seeding for deterministic but varied values
      const seed = i + 42
      const random1 = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)
      const random2 = Math.sin(seed * 2.5) * 10000 - Math.floor(Math.sin(seed * 2.5) * 10000)
      const random3 = Math.sin(seed * 7.3) * 10000 - Math.floor(Math.sin(seed * 7.3) * 10000)
      const random4 = Math.sin(seed * 13.7) * 10000 - Math.floor(Math.sin(seed * 13.7) * 10000)
      const random5 = Math.sin(seed * 19.1) * 10000 - Math.floor(Math.sin(seed * 19.1) * 10000)

      return {
        id: i,
        left: `${random1 * 100}%`,
        size: 1 + random2 * 2.5,
        duration: 12 + random3 * 18,
        delay: random4 * 15,
        opacity: 0.15 + random5 * 0.25,
        color: random1 > 0.5 ? "rgba(77,184,232," : "rgba(47,125,255,",
      }
    })
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.left,
            bottom: "-10px",
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: `${d.color}${d.opacity})`,
            boxShadow: `0 0 ${d.size * 4}px ${d.color}${d.opacity * 0.6})`,
            animation: `float-up ${d.duration}s linear ${d.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
