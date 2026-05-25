"use client"

import Image from "next/image"

function RoesploitsIcon() {
  return (
    <div
      className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-[rgba(77,184,232,0.30)]"
      style={{
        boxShadow: "0 0 20px rgba(77,184,232,0.15)",
      }}
    >
      <Image src="/logo.png" alt="Roesploits" width={40} height={40} className="object-cover w-full h-full" />
    </div>
  )
}

function DiscordIcon() {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[rgba(88,101,242,0.30)]"
      style={{
        background: "linear-gradient(135deg, rgba(88,101,242,0.22), rgba(88,101,242,0.12))",
        boxShadow: "0 0 20px rgba(88,101,242,0.12)",
      }}
    >
      <svg width="20" height="16" viewBox="0 0 24 18" fill="rgba(255,255,255,0.9)">
        <path d="M20.317 1.492a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 1.492.07.07 0 003.64 1.52C.533 6.093-.32 10.555.099 14.961a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.099.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.02zM8.02 12.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    </div>
  )
}

export function PromoCards() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fade-in-up_0.6s_ease-out_both]"
      style={{ animationDelay: "0.3s" }}
    >
      {/* Roesploits */}
      <div className="glass-card glass-card-hover group">
        <div className="relative z-[1] p-5">
          <div className="flex items-center gap-3 mb-2">
            <RoesploitsIcon />
            <h3 className="text-base font-[950] text-[#4DB8E8] tracking-[0.2px]">Roesploits</h3>
          </div>
          <p className="text-[13px] font-[600] text-[rgba(77,184,232,0.50)] mb-4 leading-relaxed">
            Visit the main platform for scripts, news, and community updates.
          </p>
          <a
            href="https://roesploits.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-[900] text-sm no-underline select-none relative overflow-hidden transition-all duration-150 ease-out hover:brightness-110 hover:-translate-y-px"
            style={{
              background: "linear-gradient(135deg, #2f7dff, #4DB8E8)",
              boxShadow: "0 8px 32px rgba(77,184,232,0.35)",
            }}
          >
            Visit Roesploits
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 2h7v7M12 2L2 12" />
            </svg>
            <div className="absolute inset-0 animate-[shimmer_2.5s_ease-in-out_infinite]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
            />
          </a>
        </div>
      </div>

      {/* Discord */}
      <div className="glass-card glass-card-hover group">
        <div className="relative z-[1] p-5">
          <div className="flex items-center gap-3 mb-2">
            <DiscordIcon />
            <h3 className="text-base font-[950] text-[#4DB8E8] tracking-[0.2px]">Discord Community</h3>
          </div>
          <p className="text-[13px] font-[600] text-[rgba(77,184,232,0.50)] mb-4 leading-relaxed">
            Join our community for support, updates, and discussions.
          </p>
          <a
            href="https://discord.gg/v9tv7SNCwp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-[900] text-sm text-[#4DB8E8] no-underline select-none border border-[rgba(77,184,232,0.15)] bg-[rgba(77,184,232,0.06)] transition-all duration-150 ease-out hover:border-[rgba(77,184,232,0.30)] hover:-translate-y-px hover:shadow-[0_0_0_4px_rgba(77,184,232,0.08)]"
          >
            {"Join Discord"}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
