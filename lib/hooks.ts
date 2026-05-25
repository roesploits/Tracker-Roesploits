"use client"

import useSWR from "swr"
import type { Tool, RobloxVersions } from "./types"
import { mockVersions } from "./types"

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
})

export function useExploits() {
  const { data, error, isLoading, mutate } = useSWR<Tool[]>(
    "/api/exploits",
    fetcher,
    {
      refreshInterval: 60000, // Refresh every 60 seconds
      revalidateOnFocus: true,
      dedupingInterval: 30000,
    }
  )

  // Filter out hidden exploits
  const exploits = data?.filter((t) => !t.hidden) || []

  return {
    exploits,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useVersions() {
  const { data, error, isLoading } = useSWR<RobloxVersions>(
    "/api/versions",
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
      dedupingInterval: 30000,
      fallbackData: mockVersions,
    }
  )

  return {
    versions: data || mockVersions,
    isLoading,
    isError: error,
  }
}

// Helper to calculate stats from exploits
export function useExploitStats(exploits: Tool[]) {
  const total = exploits.length
  const updated = exploits.filter((t) => t.updateStatus === true).length
  const undetected = exploits.filter((t) => t.detected === false).length
  const free = exploits.filter((t) => t.free === true).length
  const coverage = total > 0 ? Math.round((updated / total) * 100) : 0

  return { total, updated, undetected, free, coverage }
}
