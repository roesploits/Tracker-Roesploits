"use client"

import React from "react"

import { useEffect, useState } from "react"
import type { Tool } from "@/lib/types"

function AnimatedNumber({ value, color }: { value: number; color: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * value)
      setDisplay(start)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  return (
    <span className="text-3xl font-[950] tabular-nums" style={{ color }}>
      {display}
    </span>
  )
}

export function StatsBar({ tools }: { tools: Tool[] }) {
  const total = tools.length
  const updated = tools.filter((t) => t.updateStatus === true || t.updateStatus === "Updated").length
  const undetected = tools.filter((t) => t.detected === false).length
  const coverage = total > 0 ? Math.round((updated / total) * 100) : 0

  const stats = [
    { label: "TOTAL TOOLS", value: total, color: "#4DB8E8" },
    { label: "UPDATED", value: updated, color: "#35ffb0" },
    { label: "UNDETECTED", value: undetected, color: "#4DB8E8" },
  ]

  return (
    <div
      className="glass-card glass-card-hover animate-[fade-in-up_0.6s_ease-out_both]"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="relative z-[1] p-4">
        {/* 4 stat counters */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 py-2">
              <AnimatedNumber value={s.value} color={s.color} />
              <span className="text-[11px] font-[800] tracking-[1px] uppercase text-[rgba(77,184,232,0.55)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Update Coverage bar */}
        <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-[900] tracking-[0.5px] uppercase text-[rgba(77,184,232,0.60)]">
              Update Coverage
            </span>
            <span className="text-sm font-[950] text-[#4DB8E8]">{coverage}%</span>
          </div>
          <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden relative">
            <div
              className="h-full rounded-full relative animate-[progress-fill_1.5s_ease-out_0.5s_both]"
              style={{
                "--progress-width": `${coverage}%`,
                background: "linear-gradient(90deg, #2f7dff, #4DB8E8)",
                boxShadow: "0 0 16px rgba(77,184,232,0.35)",
              } as React.CSSProperties}
            >
              {/* Shine effect on bar */}
              <div
                className="absolute top-0 h-full w-[40%] animate-[bar-shine_3s_ease-in-out_infinite_1.5s]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
