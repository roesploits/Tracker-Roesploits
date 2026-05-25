import { NextResponse } from "next/server"

export const revalidate = 60 // Revalidate every 60 seconds

export async function GET() {
  try {
    const [currentRes, pastRes] = await Promise.all([
      fetch("https://weao.xyz/api/versions/current", {
        headers: { "User-Agent": "WEAO-3PService" },
        next: { revalidate: 60 },
      }),
      fetch("https://weao.xyz/api/versions/past", {
        headers: { "User-Agent": "WEAO-3PService" },
        next: { revalidate: 60 },
      }),
    ])

    if (!currentRes.ok) {
      if (currentRes.status === 429) {
        const errorData = await currentRes.json()
        return NextResponse.json(
          { error: "Rate limited", rateLimitInfo: errorData.rateLimitInfo },
          { status: 429 }
        )
      }
      throw new Error(`WEAO API error: ${currentRes.status}`)
    }

    const current = await currentRes.json()
    const past = pastRes.ok ? await pastRes.json() : {}

    return NextResponse.json({
      current,
      past,
    })
  } catch (error) {
    console.error("Failed to fetch WEAO versions:", error)
    return NextResponse.json(
      { error: "Failed to fetch versions data" },
      { status: 500 }
    )
  }
}
