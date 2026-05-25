"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"

interface VersionData {
  current: {
    Windows?: string
    WindowsDate?: string
    Mac?: string
    MacDate?: string
    Android?: string
    AndroidDate?: string
    iOS?: string
    iOSDate?: string
  }
  past?: {
    Windows?: string
    WindowsDate?: string
    Mac?: string
    MacDate?: string
  }
}

function PlatformIcon({ name }: { name: string }) {
  const iconMap: Record<string, { bg: string; border: string; icon: React.ReactNode }> = {
    Windows: {
      bg: "rgba(77,184,232,0.12)",
      border: "rgba(77,184,232,0.22)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="rgba(77,184,232,0.9)">
          <path d="M0 2.3l6.5-.9v6.3H0V2.3zm7.3-1L16 0v7.7H7.3V1.3zM16 8.4v7.6l-8.7-1.2V8.4H16zM6.5 14.7L0 13.8V8.4h6.5v6.3z" />
        </svg>
      ),
    },
    Mac: {
      bg: "rgba(224,236,255,0.10)",
      border: "rgba(224,236,255,0.20)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 14 14" fill="rgba(224,236,255,0.90)">
          <path d="M 4.5439328,12.768635 C 4.3075707,12.610727 4.0976931,12.41734 3.9222954,12.19397 3.730907,11.962605 3.5535105,11.719247 3.3906056,11.467394 3.0078288,10.90772 2.7085034,10.295578 2.5011244,9.650454 2.2512702,8.899892 2.129841,8.181311 2.129841,7.478221 2.129841,6.693679 2.2997419,6.009078 2.6305489,5.434413 2.8754061,4.984676 3.2401933,4.608395 3.6799368,4.344049 4.104689,4.079204 4.5994004,3.934288 5.0991089,3.924294 c 0.174898,0 0.3647872,0.02499 0.5646706,0.07496 0.1449155,0.03998 0.3198135,0.104939 0.5346881,0.184893 0.2748397,0.104938 0.4247523,0.1699 0.4747231,0.184892 0.1599067,0.05997 0.294828,0.08495 0.3997668,0.08495 0.079953,0 0.1948863,-0.02498 0.322312,-0.06496 0.072458,-0.02498 0.2098776,-0.06996 0.4047639,-0.15491 0.1928875,-0.06996 0.3457983,-0.129924 0.4672274,-0.174898 0.1848922,-0.05497 0.3637878,-0.104938 0.524694,-0.129924 0.1948863,-0.02998 0.3882735,-0.03998 0.5736653,-0.02499 0.3547931,0.02499 0.6796039,0.09994 0.9694349,0.209877 0.509702,0.204881 0.920962,0.524694 1.227783,0.979429 -0.129924,0.07995 -0.249854,0.172899 -0.362288,0.27484 -0.243358,0.214874 -0.449738,0.469726 -0.614642,0.752061 -0.214874,0.384776 -0.32481,0.819522 -0.321812,1.259265 0.0075,0.541185 0.144915,1.016907 0.419755,1.429167 0.193387,0.299825 0.451737,0.556675 0.766553,0.767552 0.15491,0.104939 0.29083,0.177397 0.419755,0.224869 -0.05997,0.187391 -0.125926,0.369784 -0.202382,0.549679 -0.173399,0.403265 -0.379778,0.78954 -0.624635,1.154327 -0.215874,0.314816 -0.385775,0.549679 -0.5147,0.704589 -0.200883,0.23986 -0.39477,0.419755 -0.589656,0.54818 -0.2148749,0.142417 -0.4672277,0.217873 -0.725577,0.217873 -0.1748979,0.0075 -0.3497959,-0.01499 -0.5166986,-0.06346 C 8.551595,12.865079 8.4086783,12.81161 8.26876,12.751145 8.1223454,12.684184 7.9709337,12.627217 7.8165238,12.581244 c -0.1898893,-0.04997 -0.3847756,-0.07396 -0.5816607,-0.07346 -0.1998834,0 -0.3947697,0.02499 -0.5796619,0.07246 -0.1549096,0.04397 -0.3048222,0.09794 -0.4532356,0.162405 C 5.992088,12.830099 5.8546682,12.887565 5.7747148,12.91255 5.6128093,12.96052 5.446906,12.98951 5.2800034,13 5.020155,13 4.7782961,12.92504 4.5374366,12.775131 Z M 7.9689349,3.544016 C 7.6291331,3.713917 7.3063214,3.785875 6.98301,3.761889 6.933039,3.439077 6.98301,3.107271 7.1179313,2.743983 7.2378613,2.434163 7.397768,2.154327 7.6176398,1.904472 7.8475057,1.644624 8.1223454,1.429749 8.4321646,1.27484 8.7619723,1.104939 9.0767886,1.014991 9.3766137,1 c 0.039977,0.339802 0,0.674606 -0.1249271,1.034397 C 9.1377531,2.35421 8.9678522,2.649038 8.7519781,2.913884 8.5346049,3.173732 8.2647623,3.388607 7.9594404,3.543516 Z" />
        </svg>
      ),
    },
    iOS: {
      bg: "rgba(47,125,255,0.12)",
      border: "rgba(47,125,255,0.20)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 14 14" fill="rgba(47,125,255,0.9)">
          <path d="M 4.5439328,12.768635 C 4.3075707,12.610727 4.0976931,12.41734 3.9222954,12.19397 3.730907,11.962605 3.5535105,11.719247 3.3906056,11.467394 3.0078288,10.90772 2.7085034,10.295578 2.5011244,9.650454 2.2512702,8.899892 2.129841,8.181311 2.129841,7.478221 2.129841,6.693679 2.2997419,6.009078 2.6305489,5.434413 2.8754061,4.984676 3.2401933,4.608395 3.6799368,4.344049 4.104689,4.079204 4.5994004,3.934288 5.0991089,3.924294 c 0.174898,0 0.3647872,0.02499 0.5646706,0.07496 0.1449155,0.03998 0.3198135,0.104939 0.5346881,0.184893 0.2748397,0.104938 0.4247523,0.1699 0.4747231,0.184892 0.1599067,0.05997 0.294828,0.08495 0.3997668,0.08495 0.079953,0 0.1948863,-0.02498 0.322312,-0.06496 0.072458,-0.02498 0.2098776,-0.06996 0.4047639,-0.15491 0.1928875,-0.06996 0.3457983,-0.129924 0.4672274,-0.174898 0.1848922,-0.05497 0.3637878,-0.104938 0.524694,-0.129924 0.1948863,-0.02998 0.3882735,-0.03998 0.5736653,-0.02499 0.3547931,0.02499 0.6796039,0.09994 0.9694349,0.209877 0.509702,0.204881 0.920962,0.524694 1.227783,0.979429 -0.129924,0.07995 -0.249854,0.172899 -0.362288,0.27484 -0.243358,0.214874 -0.449738,0.469726 -0.614642,0.752061 -0.214874,0.384776 -0.32481,0.819522 -0.321812,1.259265 0.0075,0.541185 0.144915,1.016907 0.419755,1.429167 0.193387,0.299825 0.451737,0.556675 0.766553,0.767552 0.15491,0.104939 0.29083,0.177397 0.419755,0.224869 -0.05997,0.187391 -0.125926,0.369784 -0.202382,0.549679 -0.173399,0.403265 -0.379778,0.78954 -0.624635,1.154327 -0.215874,0.314816 -0.385775,0.549679 -0.5147,0.704589 -0.200883,0.23986 -0.39477,0.419755 -0.589656,0.54818 -0.2148749,0.142417 -0.4672277,0.217873 -0.725577,0.217873 -0.1748979,0.0075 -0.3497959,-0.01499 -0.5166986,-0.06346 C 8.551595,12.865079 8.4086783,12.81161 8.26876,12.751145 8.1223454,12.684184 7.9709337,12.627217 7.8165238,12.581244 c -0.1898893,-0.04997 -0.3847756,-0.07396 -0.5816607,-0.07346 -0.1998834,0 -0.3947697,0.02499 -0.5796619,0.07246 -0.1549096,0.04397 -0.3048222,0.09794 -0.4532356,0.162405 C 5.992088,12.830099 5.8546682,12.887565 5.7747148,12.91255 5.6128093,12.96052 5.446906,12.98951 5.2800034,13 5.020155,13 4.7782961,12.92504 4.5374366,12.775131 Z M 7.9689349,3.544016 C 7.6291331,3.713917 7.3063214,3.785875 6.98301,3.761889 6.933039,3.439077 6.98301,3.107271 7.1179313,2.743983 7.2378613,2.434163 7.397768,2.154327 7.6176398,1.904472 7.8475057,1.644624 8.1223454,1.429749 8.4321646,1.27484 8.7619723,1.104939 9.0767886,1.014991 9.3766137,1 c 0.039977,0.339802 0,0.674606 -0.1249271,1.034397 C 9.1377531,2.35421 8.9678522,2.649038 8.7519781,2.913884 8.5346049,3.173732 8.2647623,3.388607 7.9594404,3.543516 Z" />
        </svg>
      ),
    },
    Android: {
      bg: "rgba(53,255,176,0.10)",
      border: "rgba(53,255,176,0.18)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 18" fill="rgba(53,255,176,0.85)">
          <path d="M1.2 6.1c-.6 0-1.2.5-1.2 1.2v4.2c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2V7.3c0-.7-.5-1.2-1.2-1.2zm2.4 0v7.3c0 .5.4.9.9.9h1v2.3c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-2.3h1.4v2.3c0 .7.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-2.3h1c.5 0 .9-.4.9-.9V6.1H3.6zm11.2 0c-.6 0-1.2.5-1.2 1.2v4.2c0 .7.5 1.2 1.2 1.2S16 12.2 16 11.5V7.3c0-.7-.5-1.2-1.2-1.2zM11.1 1l.9-1.6c.1-.1 0-.2-.1-.3-.1-.1-.2 0-.3.1l-.9 1.6C9.9.5 9 .3 8 .3s-1.9.2-2.7.5L4.4.2c-.1-.1-.2-.2-.3-.1-.1.1-.2.2-.1.3L4.9 1C3.2 1.9 2 3.4 2 5.2h12c0-1.8-1.2-3.3-2.9-4.2zM5.7 3.7c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6zm4.6 0c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z" />
        </svg>
      ),
    },
  }

  const i = iconMap[name] || { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.10)", icon: null }
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: i.bg, border: `1px solid ${i.border}` }}
    >
      {i.icon}
    </div>
  )
}

function VersionDropdown({
  version, platform, onCopy, onClose
}: {
  version: string; platform: string; onCopy: () => void; onClose: () => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  function getDownloadUrl(ver: string, plat: string) {
    if (plat === "Windows") return `https://setup.rbxcdn.com/${ver}-RobloxApp.zip`
    if (plat === "Mac") return `https://setup.rbxcdn.com/mac/${ver}-RobloxPlayer.zip`
    return null
  }

  const downloadUrl = getDownloadUrl(version, platform)

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-1 z-[500] min-w-[160px] rounded-xl overflow-hidden"
      style={{
        background: "#0a1929",
        border: "1px solid rgba(77,184,232,0.35)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.95), 0 0 0 1px rgba(77,184,232,0.08)",
      }}
    >
      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="flex items-center gap-3 px-4 py-3 text-sm font-[700] text-[#4DB8E8] no-underline w-full block transition-colors"
          style={{ background: "rgba(77,184,232,0.05)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(77,184,232,0.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(77,184,232,0.05)")}
          onClick={e => e.stopPropagation()}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 1v9m0 0l-3-3m3 3l3-3M1 13h12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download
        </a>
      )}
      <button
        type="button"
        onClick={e => { e.preventDefault(); e.stopPropagation(); onCopy(); onClose() }}
        className="flex items-center gap-3 px-4 py-3 text-sm font-[700] text-[#4DB8E8] cursor-pointer w-full text-left transition-colors"
        style={{ background: "rgba(77,184,232,0.05)", borderTop: "1px solid rgba(77,184,232,0.12)" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(77,184,232,0.12)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(77,184,232,0.05)")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" />
          <path d="M9.5 4.5V3a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 3v5A1.5 1.5 0 003 9.5h1.5" />
        </svg>
        Copy Hash
      </button>
    </div>
  )
}

export function VersionsCard({ versions }: { versions: VersionData }) {
  const [toast, setToast] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const current = versions.current || {}
  const past = versions.past || {}

  const rows = [
    { name: "Windows", value: current.Windows, date: current.WindowsDate, pastValue: past.Windows },
    { name: "Mac",     value: current.Mac,     date: current.MacDate,     pastValue: past.Mac },
  ].filter(r => r.value)

  function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setToast("Copied!")
      setTimeout(() => setToast(""), 1200)
    })
  }

  function getDownloadUrl(ver: string, plat: string) {
    if (plat === "Windows") return `https://setup.rbxcdn.com/${ver}-RobloxApp.zip`
    if (plat === "Mac") return `https://setup.rbxcdn.com/mac/${ver}-RobloxPlayer.zip`
    return null
  }

  return (
    <>
      <div className="glass-card glass-card-hover animate-[fade-in-up_0.6s_ease-out_both]" style={{ animationDelay: "0.4s", overflow: "visible" }}>
        <div className="relative z-[1]" style={{ overflow: "visible" }}>
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3 border-b border-[rgba(77,184,232,0.08)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(77,184,232,0.8)" strokeWidth="1.5">
              <path d="M4 2L12 2M4 8L12 8M4 14L12 14" strokeLinecap="round" />
              <circle cx="2" cy="2" r="1" fill="rgba(77,184,232,0.7)" stroke="none" />
              <circle cx="2" cy="8" r="1" fill="rgba(77,184,232,0.7)" stroke="none" />
              <circle cx="2" cy="14" r="1" fill="rgba(77,184,232,0.7)" stroke="none" />
            </svg>
            <h2 className="m-0 text-xs font-[950] tracking-[1.2px] uppercase text-[rgba(77,184,232,0.75)]">Roblox Versions</h2>
          </div>

          <div className="flex flex-col divide-y divide-[rgba(77,184,232,0.08)]">
            {rows.map((row, i) => (
              <div key={row.name} className="px-5 py-4 overflow-visible" style={{ position: "relative", zIndex: rows.length - i }}>
                <div className="flex items-center gap-4">
                  <PlatformIcon name={row.name} />
                  <div className="flex-1 min-w-0">
                    <span className="font-[950] text-sm text-[#4DB8E8]">{row.name} Version</span>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[11px] font-[600] text-[rgba(77,184,232,0.50)]">Last Updated: {row.date}</span>
                      {row.pastValue && (
                        <a
                          href={getDownloadUrl(row.pastValue, row.name) || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-[700] text-[rgba(77,184,232,0.60)] hover:text-[#4DB8E8] transition-colors"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 1v6m0 0L2.5 4.5M5 7l2.5-2.5M1 9h8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Download Previous Version
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Version chip — overflow:visible so dropdown is not clipped */}
                  <div className="relative flex-shrink-0" style={{ overflow: "visible" }}>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === row.name ? null : row.name)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-[800] text-[rgba(77,184,232,0.90)] cursor-pointer select-none transition-all duration-150"
                      style={{ border: "1px solid rgba(77,184,232,0.18)", background: "rgba(77,184,232,0.08)" }}
                    >
                      <span className="truncate max-w-[120px]">{row.value}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 opacity-60">
                        <rect x="4" y="4" width="7" height="7" rx="1.5" />
                        <path d="M8 4V2.5A1.5 1.5 0 006.5 1H2.5A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" />
                      </svg>
                    </button>

                    {openDropdown === row.name && (
                      <VersionDropdown
                        version={row.value!}
                        platform={row.name}
                        onCopy={() => copyText(row.value!)}
                        onClose={() => setOpenDropdown(null)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-5 px-4 py-2.5 rounded-full border border-[rgba(77,184,232,0.25)] bg-[rgba(10,25,41,0.98)] shadow-[0_16px_48px_rgba(0,0,0,0.8)] text-[#4DB8E8] font-[900] text-sm z-[9999] animate-[fade-in-up_0.2s_ease-out]">
          {toast}
        </div>
      )}
    </>
  )
}
