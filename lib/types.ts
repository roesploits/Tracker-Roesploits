// Types based on WEAO API documentation
// https://docs.weao.xyz/weao-api-reference/exploits

export interface Tool {
  _id: string
  title: string
  version: string
  updatedDate: string
  uncStatus: boolean
  free: boolean
  detected: boolean | null
  rbxversion: string
  updateStatus: boolean
  websitelink?: string
  discordlink?: string
  purchaselink?: string
  platform: string
  extype: string // wexecutor, wexternal, mexecutor, aexecutor, iexecutor
  cost?: string
  decompiler?: boolean
  multiInject?: boolean
  raknet?: boolean
  suncPercentage?: number
  uncPercentage?: number
  sunc?: {
    suncScrap: string
    suncKey: string
  }
  hidden?: boolean
  keysystem?: boolean
  clientmods?: boolean
  elementCertified?: boolean
  beta?: boolean
  roleId?: string
  index?: number
  recommendedReason?: {
    features: string[]
  }
  __v?: number
}

export interface RobloxVersions {
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

// Fallback mock data in case API fails
export const mockVersions: RobloxVersions = {
  current: {
    Windows: "version-80c7b8e578f241ff",
    WindowsDate: "2/5/2026, 5:08:00 PM UTC",
    Mac: "version-6298eb58de444612",
    MacDate: "2/5/2026, 5:07:52 PM UTC",
    Android: "2.697.926",
    AndroidDate: "11/6/2025, 6:42:55 PM UTC",
    iOS: "2.697.925",
    iOSDate: "10/30/2025, 4:54:38 PM UTC",
  },
  past: {
    Windows: "version-7a1b2c3d4e5f6789",
    WindowsDate: "2/4/2026, 3:00:00 PM UTC",
    Mac: "version-5a6b7c8d9e0f1234",
    MacDate: "2/4/2026, 3:00:00 PM UTC",
  },
}

export const mockTools: Tool[] = []
