"use client"

import Image from "next/image"
import Link from "next/link"
import { StatsBar } from "@/components/tracker/stats-bar"
import { PromoCards } from "@/components/tracker/promo-cards"
import { VersionsCard } from "@/components/tracker/versions-card"
import { ToolsCard } from "@/components/tracker/tools-card"
import { Particles } from "@/components/tracker/particles"
import { useExploits, useVersions } from "@/lib/hooks"
import { mockVersions } from "@/lib/types"
import { StatusDot } from "@/components/tracker/header"

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Products",   href: "https://roesploits.com/products" },
  { label: "Support",    href: "https://discord.gg/v9tv7SNCwp" },
  { label: "Affiliates", href: "https://roesploits.com/affiliates" },
  { label: "Partners",   href: "https://roesploits.com/partners" },
  { label: "Status",     href: "/", active: true },
]

export default function Home() {
  const { exploits, isLoading, isError } = useExploits()
  const { versions } = useVersions()
  const apiStatus = isError ? "error" : isLoading ? "loading" : "ok"

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#07090f" }}>

      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 900px 600px at 50% 20%, rgba(0,140,255,0.07), transparent 65%)",
      }} />
      <div className="fixed inset-0 z-0 pointer-events-none animate-[glow-pulse_8s_ease-in-out_infinite]" style={{
        background: "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(77,184,232,0.04), transparent 70%)",
      }} />
      <Particles />

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14" style={{
        background: "rgba(7,9,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div className="max-w-[1200px] mx-auto h-full flex items-center gap-6 px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 no-underline">
            <div className="w-8 h-8 flex-shrink-0">
              <Image src="/logo.png" alt="Roesploits" width={32} height={32} className="object-contain w-full h-full" />
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-[13px] font-[600] no-underline transition-all duration-150"
                style={{
                  color: link.active ? "#4DB8E8" : "rgba(200,220,255,0.55)",
                  background: link.active ? "rgba(77,184,232,0.08)" : "transparent",
                  border: link.active ? "1px solid rgba(77,184,232,0.15)" : "1px solid transparent",
                }}
                onMouseEnter={e => { if (!link.active) { (e.target as HTMLElement).style.color = "rgba(200,220,255,0.90)"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.04)"; } }}
                onMouseLeave={e => { if (!link.active) { (e.target as HTMLElement).style.color = "rgba(200,220,255,0.55)"; (e.target as HTMLElement).style.background = "transparent"; } }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-[700]"
              style={{
                background: apiStatus === "ok" ? "rgba(53,255,176,0.08)" : "rgba(255,77,109,0.08)",
                border: `1px solid ${apiStatus === "ok" ? "rgba(53,255,176,0.18)" : "rgba(255,77,109,0.18)"}`,
                color: apiStatus === "ok" ? "#35ffb0" : "#ff4d6d",
              }}
            >
              <StatusDot status={apiStatus} />
              <span>{apiStatus === "ok" ? "LIVE" : apiStatus === "loading" ? "LOADING" : "ERROR"}</span>
            </div>

            {/* Discord */}
            <a
              href="https://discord.gg/v9tv7SNCwp"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-[600] no-underline transition-all duration-150"
              style={{ background: "rgba(88,101,242,0.12)", border: "1px solid rgba(88,101,242,0.20)", color: "#8b9cf4" }}
            >
              <svg width="14" height="11" viewBox="0 0 24 18" fill="currentColor"><path d="M20.317 1.492a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 1.492.07.07 0 003.64 1.52C.533 6.093-.32 10.555.099 14.961a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.076.076 0-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.099.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.02z"/></svg>
              Discord
            </a>

            {/* Visit site */}
            <a
              href="https://roesploits.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-[700] no-underline transition-all duration-150"
              style={{
                background: "linear-gradient(135deg, #2563eb, #4DB8E8)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(77,184,232,0.25)",
              }}
            >
              Visit Site
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 2h7v7M12 2L2 12"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <div className="relative z-[2] pt-14">
        <div className="max-w-[1200px] mx-auto px-5 py-14 text-center">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[13px] font-[600]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(200,220,255,0.70)",
            }}
          >
            <span style={{ color: "#4DB8E8" }}>✦</span>
            ROBUX, FunPay Payments & Support:&nbsp;
            <a href="https://discord.gg/v9tv7SNCwp" target="_blank" rel="noopener noreferrer"
              className="no-underline font-[700]" style={{ color: "#4DB8E8" }}>
              discord.gg/v9tv7SNCwp
            </a>
          </div>

          {/* Hero title */}
          <h1 className="m-0 mb-6 font-[950] uppercase leading-[0.95] tracking-[-1px]"
            style={{ fontSize: "clamp(52px, 10vw, 100px)" }}>
            <span style={{ color: "#fff" }}>UNLOCK THE</span><br />
            <span style={{
              background: "linear-gradient(90deg, #4DB8E8, #2563eb, #4DB8E8)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 4s ease infinite",
            }}>BEST</span>
          </h1>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
            <a href="https://roesploits.com"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-[800] no-underline transition-all duration-150 hover:brightness-110 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #2563eb, #4DB8E8)", color: "#fff", boxShadow: "0 8px 32px rgba(77,184,232,0.35)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Start Shopping
            </a>
            <a href="https://discord.gg/v9tv7SNCwp"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-[800] no-underline transition-all duration-150 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.05)", color: "#e0f0ff", border: "1px solid rgba(255,255,255,0.12)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Client Area
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 2h7v7M12 2L2 12"/></svg>
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-[600px] mx-auto mb-0">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
            <span className="text-[11px] font-[700] tracking-[2px] uppercase" style={{ color: "rgba(200,220,255,0.30)" }}>TRACKER</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
          </div>
        </div>
      </div>

      {/* ── TRACKER CONTENT ────────────────────────────────────── */}
      <main className="relative z-[2] max-w-[1100px] mx-auto px-4 pb-20">
        <div className="flex flex-col gap-4">
          <StatsBar tools={exploits} />
          <PromoCards />
          <VersionsCard versions={versions || mockVersions} />
          <ToolsCard tools={exploits} />
        </div>

        <div className="mt-8 text-center text-[11px] font-[600]" style={{ color: "rgba(200,220,255,0.20)" }}>
          Powered by WEAO API · roesploits.com
        </div>
      </main>
    </div>
  )
}
