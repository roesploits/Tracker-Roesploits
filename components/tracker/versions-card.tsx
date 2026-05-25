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
        // Apple logo — correct proportional SVG
        <svg width="15" height="18" viewBox="0 0 15 18" fill="rgba(224,236,255,0.90)">
          <path d="M12.42 9.56c-.02-1.96 1.6-2.9 1.67-2.95-1.28-1.88-2.74-1.96-2.78-1.97-1.18-.12-2.3.7-2.9.7-.6 0-1.52-.69-2.5-.67C4.5 4.7 3.1 5.6 2.33 7.0 .76 9.84 1.9 14.0 3.42 16.3c.76 1.1 1.66 2.33 2.85 2.28 1.14-.05 1.57-.74 2.95-.74 1.37 0 1.76.74 2.96.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.19zM10.37 3.2C11 2.42 11.43 1.35 11.3.26c-.92.04-2.04.62-2.7 1.39-.59.68-1.11 1.77-.97 2.81.97.08 1.97-.5 2.74-1.26z"/>
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
    iOS: {
      bg: "rgba(47,125,255,0.12)",
      border: "rgba(47,125,255,0.20)",
      icon: (
        <svg width="15" height="18" viewBox="0 0 15 18" fill="rgba(47,125,255,0.9)">
          <path d="M12.42 9.56c-.02-1.96 1.6-2.9 1.67-2.95-1.28-1.88-2.74-1.96-2.78-1.97-1.18-.12-2.3.7-2.9.7-.6 0-1.52-.69-2.5-.67C4.5 4.7 3.1 5.6 2.33 7.0 .76 9.84 1.9 14.0 3.42 16.3c.76 1.1 1.66 2.33 2.85 2.28 1.14-.05 1.57-.74 2.95-.74 1.37 0 1.76.74 2.96.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.19zM10.37 3.2C11 2.42 11.43 1.35 11.3.26c-.92.04-2.04.62-2.7 1.39-.59.68-1.11 1.77-.97 2.81.97.08 1.97-.5 2.74-1.26z"/>
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
  version,
  platform,
  onCopy,
  onClose
}: {
  version: string
  platform: string
  onCopy: () => void
  onClose: () => void
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
      className="absolute top-full right-0 mt-1 z-[200] min-w-[160px] rounded-xl overflow-hidden"
      style={{
        background: "#0d1f30",
        border: "1px solid rgba(77,184,232,0.30)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.9), 0 0 0 1px rgba(77,184,232,0.10)",
        animation: "fadeInScale 0.15s ease-out",
      }}
    >
      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="flex items-center gap-3 px-4 py-3 text-sm font-[700] text-[#4DB8E8] no-underline transition-colors block w-full"
          style={{ background: "rgba(77,184,232,0.06)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(77,184,232,0.14)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(77,184,232,0.06)")}
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
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          onCopy()
          onClose()
        }}
        className="flex items-center gap-3 px-4 py-3 text-sm font-[700] text-[#4DB8E8] cursor-pointer w-full text-left transition-colors"
        style={{
          background: "rgba(77,184,232,0.06)",
          borderTop: "1px solid rgba(77,184,232,0.15)",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(77,184,232,0.14)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(77,184,232,0.06)")}
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
    {
      name: "Windows",
      value: current.Windows,
      date: current.WindowsDate,
      pastValue: past.Windows,
      pastDate: past.WindowsDate,
    },
    {
      name: "Mac",
      value: current.Mac,
      date: current.MacDate,
      pastValue: past.Mac,
      pastDate: past.MacDate,
    },
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
      <div
        className="glass-card glass-card-hover animate-[fade-in-up_0.6s_ease-out_both]"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="relative z-[1]">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3 border-b border-[rgba(77,184,232,0.08)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(77,184,232,0.8)" strokeWidth="1.5">
              <path d="M4 2L12 2M4 8L12 8M4 14L12 14" strokeLinecap="round" />
              <circle cx="2" cy="2" r="1" fill="rgba(77,184,232,0.7)" stroke="none" />
              <circle cx="2" cy="8" r="1" fill="rgba(77,184,232,0.7)" stroke="none" />
              <circle cx="2" cy="14" r="1" fill="rgba(77,184,232,0.7)" stroke="none" />
            </svg>
            <h2 className="m-0 text-xs font-[950] tracking-[1.2px] uppercase text-[rgba(77,184,232,0.75)]">
              Roblox Versions
            </h2>
          </div>

          {/* Version Rows */}
          <div className="flex flex-col divide-y divide-[rgba(77,184,232,0.08)]">
            {rows.map((row, i) => (
              <div
                key={row.name}
                className="px-5 py-4 animate-[card-enter_0.5s_ease-out_both]"
                style={{ animationDelay: `${0.5 + i * 0.08}s` }}
              >
                <div className="flex items-center gap-4">
                  <PlatformIcon name={row.name} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-[950] text-sm text-[#4DB8E8]">{row.name} Version</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[11px] font-[600] text-[rgba(77,184,232,0.50)]">
                        Last Updated: {row.date}
                      </span>
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

                  {/* Version chip with dropdown */}
                  <div className="relative flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === row.name ? null : row.name)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-[800] text-[rgba(77,184,232,0.90)] cursor-pointer select-none transition-all duration-150 hover:border-[rgba(77,184,232,0.35)]"
                      style={{
                        border: "1px solid rgba(77,184,232,0.18)",
                        background: "rgba(77,184,232,0.08)",
                      }}
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

      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-5 px-4 py-2.5 rounded-full border border-[rgba(77,184,232,0.25)] bg-[rgba(13,31,48,0.98)] shadow-[0_16px_48px_rgba(0,0,0,0.6)] text-[#4DB8E8] font-[900] text-sm z-[9999] animate-[fade-in-up_0.2s_ease-out]">
          {toast}
        </div>
      )}
    </>
  )
}
