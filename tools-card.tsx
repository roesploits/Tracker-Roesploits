"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import type { Tool } from "@/lib/types"

interface Filters {
  pricing_free: boolean
  pricing_paid: boolean
  keyless: boolean
  keysystem: boolean
  p_win: boolean
  p_mac: boolean
  p_and: boolean
  p_ios: boolean
  type_executor: boolean
  type_external: boolean
  det_undetected: boolean
  det_detected: boolean
  det_clientmods: boolean
  st_updated: boolean
  st_notupdated: boolean
}

const defaultFilters: Filters = {
  pricing_free: false, pricing_paid: true, keyless: false, keysystem: false,
  p_win: false, p_mac: false, p_and: false, p_ios: false,
  type_executor: false, type_external: false,
  det_undetected: false, det_detected: false, det_clientmods: false,
  st_updated: false, st_notupdated: false,
}

function isUpdated(v: boolean | string | number | undefined) {
  return v === true || v === 1 || v === "1" || v === "true" || v === "Updated"
}

function categoryForTool(t: Tool) {
  const platform = (t.platform || "").toLowerCase()
  const ext = (t.extype || "").toLowerCase()
  if (platform === "windows" && ext === "wexecutor") return "Windows Script Executor Exploits"
  if (platform === "mac" && ext === "mexecutor") return "Mac Script Executor Exploits"
  if (platform === "android" && ext === "aexecutor") return "Android Script Executor Exploits"
  if (platform === "ios" && ext === "iexecutor") return "iOS Script Executor Exploits"
  if (platform === "windows" && ext === "wexternal") return "Windows External Exploits"
  return null
}

function toolMessage(t: Tool) {
  if (t.detectionReason) return { cls: "bg-[rgba(255,176,32,0.08)] border-[rgba(255,176,32,0.20)] text-[rgba(255,242,224,0.90)]", text: t.detectionReason }
  if (t.detected === false) return { cls: "bg-[rgba(77,184,232,0.08)] border-[rgba(77,184,232,0.20)]", text: "This exploit is reported as undetected" }
  if (t.clientmods === true) return { cls: "bg-[rgba(132,74,255,0.06)] border-[rgba(132,74,255,0.18)]", text: "This exploit bypasses client modification bans but potentially could cause bans in banwaves" }
  if (t.detected === true) return { cls: "bg-[rgba(255,176,32,0.08)] border-[rgba(255,176,32,0.20)] text-[rgba(255,242,224,0.90)]", text: "This exploit might be detected by Hyperion, use at your own risk" }
  return null
}

function toolCost(t: Tool): string {
  if (t.cost) return t.cost
  if (t.free === true) return "Free"
  if (t.free === false) return "Paid"
  return "Free"
}

function anySelected(f: Filters, keys: (keyof Filters)[]) { return keys.some((k) => f[k]) }

function passFilters(t: Tool, f: Filters) {
  const p = t.platform || ""
  const ext = (t.extype || "").toLowerCase()
  const updated = isUpdated(t.updateStatus)
  const platKeys: (keyof Filters)[] = ["p_win", "p_mac", "p_and", "p_ios"]
  if (anySelected(f, platKeys)) {
    const ok = (p === "Windows" && f.p_win) || (p === "Mac" && f.p_mac) || (p === "Android" && f.p_and) || (p === "iOS" && f.p_ios)
    if (!ok) return false
  }
  const typeKeys: (keyof Filters)[] = ["type_executor", "type_external"]
  const isExternal = ext === "wexternal"
  if (anySelected(f, typeKeys)) { if (isExternal && !f.type_external) return false; if (!isExternal && !f.type_executor) return false }
  const pricingKeys: (keyof Filters)[] = ["pricing_free", "pricing_paid"]
  if (anySelected(f, pricingKeys)) { if (t.free && !f.pricing_free) return false; if (!t.free && !f.pricing_paid) return false }
  const ksKeys: (keyof Filters)[] = ["keyless", "keysystem"]
  if (anySelected(f, ksKeys)) { if (!t.keysystem && !f.keyless) return false; if (t.keysystem && !f.keysystem) return false }
  const detKeys: (keyof Filters)[] = ["det_undetected", "det_detected", "det_clientmods"]
  if (anySelected(f, detKeys)) { if (t.detected === false && !f.det_undetected) return false; if (t.detected === true && !f.det_detected) return false; if (t.clientmods === true && !f.det_clientmods) return false }
  const stKeys: (keyof Filters)[] = ["st_updated", "st_notupdated"]
  if (anySelected(f, stKeys)) { if (updated && !f.st_updated) return false; if (!updated && !f.st_notupdated) return false }
  return true
}

function Badge({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-[900] whitespace-nowrap"
      style={{ color, background: bg, border: `1px solid ${color}25` }}
    >
      {children}
    </span>
  )
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${value}%`,
            background: color,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
      <span className="text-[11px] font-[800] tabular-nums" style={{ color }}>{value}%</span>
    </div>
  )
}

function ToolCard({ tool, isExternal, index }: { tool: Tool; isExternal: boolean; index: number }) {
  const updated = isUpdated(tool.updateStatus)
  const msg = toolMessage(tool)

  return (
    <div
      className="relative rounded-2xl border border-[rgba(77,184,232,0.10)] overflow-hidden px-4 pt-4 pb-3.5 transition-all duration-150 ease-out hover:border-[rgba(77,184,232,0.18)] hover:bg-[rgba(77,184,232,0.03)] animate-[card-enter_0.5s_ease-out_both]"
      style={{
        animationDelay: `${0.6 + index * 0.04}s`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
      }}
    >
      {/* Left status bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${updated ? "bg-[rgba(53,255,176,0.70)]" : "bg-[rgba(255,77,109,0.65)]"}`} />

      {/* Head */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex items-center gap-2 flex-wrap">
          <span className="font-[950] text-[15px] text-[#4DB8E8]">{tool.title}</span>
          <Badge color="rgba(224,236,255,0.70)" bg="rgba(255,255,255,0.04)">{tool.version}</Badge>
          {isExternal ? (
            <Badge color="rgba(77,184,232,0.90)" bg="rgba(77,184,232,0.10)">External</Badge>
          ) : (
            <Badge color="rgba(77,184,232,0.90)" bg="rgba(77,184,232,0.10)">sUNC</Badge>
          )}
          {tool.keysystem && <Badge color="rgba(150,90,255,0.85)" bg="rgba(150,90,255,0.08)">Key System</Badge>}
          {tool.elementCertified && <Badge color="rgba(53,255,176,0.85)" bg="rgba(53,255,176,0.08)">Certified</Badge>}
          {tool.private && <Badge color="rgba(255,77,109,0.85)" bg="rgba(255,77,109,0.08)">Private</Badge>}
          {tool.free ? (
            <Badge color="rgba(53,255,176,0.85)" bg="rgba(53,255,176,0.08)">Free</Badge>
          ) : (
            <Badge color="rgba(255,176,32,0.85)" bg="rgba(255,176,32,0.08)">Paid</Badge>
          )}
        </div>

        <div className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-[900] text-[11px] border whitespace-nowrap ${
          updated
            ? "text-[rgba(53,255,176,0.90)] bg-[rgba(53,255,176,0.08)] border-[rgba(53,255,176,0.16)]"
            : "text-[rgba(255,77,109,0.90)] bg-[rgba(255,77,109,0.08)] border-[rgba(255,77,109,0.16)]"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${updated ? "bg-[#35ffb0]" : "bg-[#ff4d6d]"}`} />
          {updated ? "Updated" : "Not Updated"}
        </div>
      </div>

      {/* Features row */}
      {!isExternal && (
        <div className="mt-3 flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[100px]">
            <div className="text-[10px] font-[700] text-[rgba(77,184,232,0.40)] uppercase mb-1">sUNC</div>
            <ProgressBar value={tool.suncPercentage || 0} color="#4DB8E8" />
          </div>
          <div className="flex-1 min-w-[100px]">
            <div className="text-[10px] font-[700] text-[rgba(77,184,232,0.40)] uppercase mb-1">UNC</div>
            <ProgressBar value={tool.uncPercentage || 0} color="#35ffb0" />
          </div>
          <div className="flex items-end gap-3 text-[11px] font-[800]">
            <span className="flex items-center gap-1 text-[rgba(77,184,232,0.65)]">
              Decompiler {tool.decompiler ? <span className="text-[#35ffb0]">{"\u2713"}</span> : <span className="text-[rgba(77,184,232,0.30)]">{"\u2715"}</span>}
            </span>
            <span className="flex items-center gap-1 text-[rgba(77,184,232,0.65)]">
              Multi-Inst {tool.multiInject ? <span className="text-[#35ffb0]">{"\u2713"}</span> : <span className="text-[rgba(77,184,232,0.30)]">{"\u2715"}</span>}
            </span>
          </div>
        </div>
      )}

      {/* Message */}
      {msg && (
        <div className={`mt-3 px-3 py-2.5 rounded-xl text-[12px] font-[800] border leading-relaxed ${msg.cls}`}>
          {msg.text}
        </div>
      )}

      {/* Meta + Buy */}
      <div className="mt-2.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="text-[rgba(77,184,232,0.40)] text-[11px] font-[700]">
          Last updated: {tool.updatedDate?.replace(" at ", ", ") || "\u2014"}
        </div>
        <a
          href="https://roesploits.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-[900] no-underline select-none transition-all duration-150 ease-out hover:brightness-110 hover:-translate-y-px"
          style={{
            background: "linear-gradient(135deg, #2f7dff, #4DB8E8)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(77,184,232,0.25)",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1h2l1.5 7.5h7L13 4H4" />
            <circle cx="6" cy="12" r="1" fill="currentColor" stroke="none"/>
            <circle cx="11" cy="12" r="1" fill="currentColor" stroke="none"/>
          </svg>
          Buy
        </a>
      </div>
    </div>
  )
}

const CATEGORY_ORDER = [
  "Windows Script Executor Exploits",
  "Mac Script Executor Exploits",
  "Android Script Executor Exploits",
  "iOS Script Executor Exploits",
  "Windows External Exploits",
]

function PillButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`cursor-pointer border font-[900] text-sm px-3.5 py-2 rounded-full select-none transition-all duration-120 ease-out hover:-translate-y-px text-[rgba(77,184,232,0.90)] ${
        active ? "border-[rgba(77,184,232,0.35)] bg-[rgba(77,184,232,0.12)]" : "border-[rgba(77,184,232,0.12)] bg-[rgba(77,184,232,0.04)] hover:border-[rgba(77,184,232,0.20)]"
      }`}
    >
      {label}
    </button>
  )
}

function GridButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`cursor-pointer border font-[900] py-3 px-3 rounded-xl select-none flex items-center justify-center gap-2 text-sm transition-all duration-120 ease-out hover:-translate-y-px text-[rgba(77,184,232,0.90)] ${
        active ? "border-[rgba(77,184,232,0.35)] bg-[rgba(77,184,232,0.12)]" : "border-[rgba(77,184,232,0.12)] bg-[rgba(77,184,232,0.04)] hover:border-[rgba(77,184,232,0.20)]"
      }`}
    >
      {label}
    </button>
  )
}

export function ToolsCard({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters })
  const [sortMode, setSortMode] = useState("cost_hl")
  const [panelOpen, setPanelOpen] = useState(false)

  const toggle = useCallback((key: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const clearAll = useCallback(() => { setFilters({ ...defaultFilters }) }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === "Escape") setPanelOpen(false) }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  // Инструменты для исключения
  const excludedTools = ["Velocity", "Xeno", "Solara", "Maduum", "Opiumware", "Delta", "Codex", "Vega X", "Cryptic"]

  // Фиксированный порядок инструментов (не меняется от статуса)
  const fixedOrder = ["Volt", "Wave", "Seliware", "Potassium", "Synapse Z", "SirHurt"]

  const visible = tools
    .filter((t) => !excludedTools.includes(t.title))
    .filter((t) => passFilters(t, filters))
    .filter((t) => !query || (t.title || "").toLowerCase().includes(query.toLowerCase()))

  const groups: Record<string, Tool[]> = {}
  for (const t of visible) {
    const cat = categoryForTool(t)
    if (!cat) continue
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(t)
  }

  // Сортировка по фиксированному порядку
  for (const cat of Object.keys(groups)) {
    groups[cat].sort((a, b) => {
      const aIndex = fixedOrder.indexOf(a.title)
      const bIndex = fixedOrder.indexOf(b.title)
      // Если оба в списке - сортируем по индексу
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      // Если только один в списке - он идет первым
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      // Остальные по алфавиту
      return (a.title || "").localeCompare(b.title || "")
    })
  }

  let cardIndex = 0

  return (
    <>
      <div
        className="glass-card glass-card-hover animate-[fade-in-up_0.6s_ease-out_both]"
        style={{ animationDelay: "0.5s" }}
      >
        {/* Search + Filters */}
        <div className="relative z-[1] flex items-center justify-between gap-3 flex-wrap px-5 pt-4 pb-3 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex-1 min-w-[220px]">
            <input
              type="text"
              placeholder="Search exploits..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[rgba(77,184,232,0.15)] bg-[rgba(77,184,232,0.04)] text-[#4DB8E8] outline-none font-[700] text-sm transition-all duration-150 ease-out placeholder:text-[rgba(77,184,232,0.35)] focus:border-[rgba(77,184,232,0.30)] focus:shadow-[0_0_0_3px_rgba(77,184,232,0.10)]"
            />
          </div>
          <button type="button" onClick={() => setPanelOpen(true)}
            className="cursor-pointer border border-[rgba(77,184,232,0.15)] bg-[rgba(77,184,232,0.06)] text-[#4DB8E8] font-[900] text-sm py-2.5 px-4 rounded-xl inline-flex items-center gap-2 select-none transition-all duration-150 ease-out hover:border-[rgba(77,184,232,0.25)] hover:-translate-y-px"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 2h12M3 7h8M5 12h4" />
            </svg>
            Filters
          </button>
        </div>

        {/* Tools list */}
        <div className="relative z-[1] flex flex-col gap-6 px-5 pt-4 pb-5">
          {CATEGORY_ORDER.map((cat) => {
            const arr = groups[cat]
            if (!arr || arr.length === 0) return null
            const isWinExternal = cat === "Windows External Exploits"

            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="m-0 text-base font-[950] tracking-[0.1px] text-[#4DB8E8] whitespace-nowrap">
                    {cat}
                  </h3>
                  <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(77,184,232,0.30), transparent)" }} />
                  <span className="text-[11px] font-[800] text-[rgba(77,184,232,0.45)] bg-[rgba(77,184,232,0.04)] border border-[rgba(77,184,232,0.12)] px-2 py-0.5 rounded-full">
                    {arr.length}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {arr.map((tool) => {
                    const ci = cardIndex++
                    return <ToolCard key={`${tool.title}-${tool.platform}`} tool={tool} isExternal={isWinExternal} index={ci} />
                  })}
                </div>
              </div>
            )
          })}

          {Object.keys(groups).length === 0 && (
            <div className="text-center py-12 text-[rgba(77,184,232,0.45)] font-[800]">
              No exploits match your filters
            </div>
          )}
        </div>
      </div>

      {/* Filter panel overlay */}
      {panelOpen && (
        <>
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.55)] z-[9998] backdrop-blur-sm" onClick={() => setPanelOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,calc(100vw-24px))] max-h-[85vh] bg-[rgba(12,14,18,0.96)] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl z-[9999] flex flex-col animate-[panel-in_0.15s_ease-out_both]">
            {/* Panel head */}
            <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-3 border-b border-[rgba(255,255,255,0.06)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-[950] text-[#4DB8E8]">Filters</span>
                <button type="button" onClick={clearAll}
                  className="cursor-pointer border border-[rgba(77,184,232,0.15)] bg-[rgba(77,184,232,0.06)] text-[rgba(77,184,232,0.80)] font-[800] text-xs px-3 py-1.5 rounded-full select-none hover:border-[rgba(77,184,232,0.25)]"
                >
                  Clear All
                </button>
              </div>
              <button type="button" onClick={() => setPanelOpen(false)}
                className="cursor-pointer w-8 h-8 rounded-lg border border-[rgba(77,184,232,0.15)] bg-[rgba(77,184,232,0.06)] text-[#4DB8E8] font-[900] grid place-items-center select-none hover:border-[rgba(77,184,232,0.25)]"
              >
                {"\u2715"}
              </button>
            </div>

            {/* Panel body */}
            <div className="p-4 overflow-auto flex-1 min-h-0">
              <div className="py-3 border-b border-[rgba(77,184,232,0.08)]">
                <div className="text-[rgba(77,184,232,0.60)] font-[800] text-[11px] tracking-[0.8px] mb-2 uppercase">Sort By</div>
                <select value={sortMode} onChange={(e) => setSortMode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[rgba(77,184,232,0.15)] bg-[rgba(77,184,232,0.04)] text-[#4DB8E8] font-[800] text-sm outline-none"
                >
                  <option value="cost_hl">{"Cost: High to Low"}</option>
                  <option value="cost_lh">{"Cost: Low to High"}</option>
                  <option value="sunc_hl">{"sUNC: High to Low"}</option>
                  <option value="sunc_lh">{"sUNC: Low to High"}</option>
                </select>
              </div>
              <div className="py-3 border-b border-[rgba(77,184,232,0.08)]">
                <div className="text-[rgba(77,184,232,0.60)] font-[800] text-[11px] tracking-[0.8px] mb-2 uppercase">Pricing</div>
                <div className="flex gap-2 flex-wrap">
                  <PillButton label="Free" active={filters.pricing_free} onClick={() => toggle("pricing_free")} />
                  <PillButton label="Paid" active={filters.pricing_paid} onClick={() => toggle("pricing_paid")} />
                </div>
              </div>
              <div className="py-3 border-b border-[rgba(77,184,232,0.08)]">
                <div className="text-[rgba(77,184,232,0.60)] font-[800] text-[11px] tracking-[0.8px] mb-2 uppercase">Key System</div>
                <div className="flex gap-2 flex-wrap">
                  <PillButton label="Keyless" active={filters.keyless} onClick={() => toggle("keyless")} />
                  <PillButton label="Key System" active={filters.keysystem} onClick={() => toggle("keysystem")} />
                </div>
              </div>
              <div className="py-3 border-b border-[rgba(77,184,232,0.08)]">
                <div className="text-[rgba(77,184,232,0.60)] font-[800] text-[11px] tracking-[0.8px] mb-2 uppercase">Platform</div>
                <div className="grid grid-cols-2 gap-2">
                  <GridButton label="Windows" active={filters.p_win} onClick={() => toggle("p_win")} />
                  <GridButton label="Mac" active={filters.p_mac} onClick={() => toggle("p_mac")} />
                  <GridButton label="Android" active={filters.p_and} onClick={() => toggle("p_and")} />
                  <GridButton label="iOS" active={filters.p_ios} onClick={() => toggle("p_ios")} />
                </div>
              </div>
              <div className="py-3 border-b border-[rgba(77,184,232,0.08)]">
                <div className="text-[rgba(77,184,232,0.60)] font-[800] text-[11px] tracking-[0.8px] mb-2 uppercase">Type</div>
                <div className="flex gap-2 flex-wrap">
                  <PillButton label="Executor" active={filters.type_executor} onClick={() => toggle("type_executor")} />
                  <PillButton label="External" active={filters.type_external} onClick={() => toggle("type_external")} />
                </div>
              </div>
              <div className="py-3 border-b border-[rgba(77,184,232,0.08)]">
                <div className="text-[rgba(77,184,232,0.60)] font-[800] text-[11px] tracking-[0.8px] mb-2 uppercase">Detection</div>
                <div className="flex gap-2 flex-wrap">
                  <PillButton label="Undetected" active={filters.det_undetected} onClick={() => toggle("det_undetected")} />
                  <PillButton label="Detected" active={filters.det_detected} onClick={() => toggle("det_detected")} />
                  <PillButton label="Client Mod Bypass" active={filters.det_clientmods} onClick={() => toggle("det_clientmods")} />
                </div>
              </div>
              <div className="py-3">
                <div className="text-[rgba(224,236,255,0.50)] font-[800] text-[11px] tracking-[0.8px] mb-2 uppercase">Status</div>
                <div className="flex gap-2 flex-wrap">
                  <PillButton label="Updated" active={filters.st_updated} onClick={() => toggle("st_updated")} />
                  <PillButton label="Not Updated" active={filters.st_notupdated} onClick={() => toggle("st_notupdated")} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
