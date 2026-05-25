"use client"

import { Header } from "@/components/tracker/header"
import { StatsBar } from "@/components/tracker/stats-bar"
import { PromoCards } from "@/components/tracker/promo-cards"
import { VersionsCard } from "@/components/tracker/versions-card"
import { ToolsCard } from "@/components/tracker/tools-card"
import { Particles } from "@/components/tracker/particles"
import { useExploits, useVersions } from "@/lib/hooks"
import { mockVersions } from "@/lib/types"

export default function Home() {
  const { exploits, isLoading, isError } = useExploits()
  const { versions } = useVersions()

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 1100px 700px at 50% 15%, rgba(77,184,232,0.08), transparent 60%), radial-gradient(ellipse 800px 600px at 20% 70%, rgba(77,184,232,0.05), transparent 55%), radial-gradient(ellipse 800px 500px at 85% 45%, rgba(77,184,232,0.04), transparent 55%), #1a3a47",
        }}
      />

      {/* Animated ambient glow */}
      <div
        className="fixed inset-[-30%] pointer-events-none opacity-80 animate-[drift_12s_ease-in-out_infinite] z-0"
        style={{
          background:
            "radial-gradient(500px 350px at 25% 30%, rgba(77,184,232,0.06), transparent 55%), radial-gradient(500px 350px at 75% 60%, rgba(77,184,232,0.04), transparent 55%)",
          filter: "blur(20px)",
        }}
      />

      {/* Scanline */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(77,184,232,0.1) 2px, rgba(77,184,232,0.1) 4px)",
          backgroundSize: "100% 4px",
          animation: "scanline 8s linear infinite",
        }}
      />

      <Particles />

      <main className="relative z-[2] max-w-[1100px] mx-auto px-4 pt-7 pb-20">
        <Header status={isError ? "error" : isLoading ? "loading" : "ok"} />

        <div className="flex flex-col gap-4 mt-5">
          <StatsBar tools={exploits} />
          <PromoCards />
          <VersionsCard versions={versions || mockVersions} />
          <ToolsCard tools={exploits} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[11px] font-[600] text-[rgba(77,184,232,0.30)]">
          Powered by WEAO API
        </div>
      </main>
    </div>
  )
}
