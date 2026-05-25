"use client"

export function StatusDot({ status }: { status: "ok" | "warn" | "bad" | "loading" | "error" }) {
  const colors = {
    ok: "bg-[#35ffb0]",
    warn: "bg-[#ffb020]",
    bad: "bg-[#ff4d6d]",
    loading: "bg-[#4DB8E8]",
    error: "bg-[#ff4d6d]",
  }
  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[status]} animate-[pulse-dot_2s_ease-in-out_infinite]`} />
  )
}

export function Header({ status }: { status: "ok" | "warn" | "bad" | "loading" | "error" }) {
  const statusLabel = status === "ok" ? "LIVE" : status === "loading" ? "LOADING" : status === "error" ? "ERROR" : status === "warn" ? "PARTIAL" : "ERROR"

  return (
    <header
      className="flex items-center justify-between gap-4 flex-wrap animate-[fade-in-up_0.6s_ease-out_both]"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="flex items-center gap-3.5">
        {/* R Badge */}
        <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center border border-[rgba(77,184,232,0.30)] overflow-hidden flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(77,184,232,0.22), rgba(77,184,232,0.12))",
            boxShadow: "0 0 24px rgba(77,184,232,0.18), inset 0 0 12px rgba(77,184,232,0.08)",
          }}
        >
          <span className="text-xl font-[950] text-[rgba(77,184,232,0.95)]">R</span>
          <div className="absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
          />
        </div>

        <div>
          <h1 className="m-0 text-[28px] font-[950] tracking-[0.5px] uppercase leading-none text-[#4DB8E8]">
            {"ROESPLOITS "}
            <span
              className="bg-clip-text text-transparent animate-[gradient-shift_4s_ease_infinite]"
              style={{
                backgroundImage: "linear-gradient(90deg, #4DB8E8, #2f7dff, #4DB8E8)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
              }}
            >
              TRACKER
            </span>
          </h1>
          <p className="m-0 mt-1 text-xs font-[700] text-[rgba(77,184,232,0.50)] tracking-[0.3px]">
            Real-time Roblox exploit monitoring
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[rgba(77,184,232,0.08)] border border-[rgba(77,184,232,0.15)] font-[950] text-sm text-[#4DB8E8] tracking-[0.2px]"
        style={{ boxShadow: "0 12px 40px rgba(26,58,71,0.4)" }}
      >
        <StatusDot status={status} />
        <span>{statusLabel}</span>
      </div>
    </header>
  )
}
