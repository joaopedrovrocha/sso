import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSSOApi } from "../services/sso-api.service"
import { Platform } from "../services/types"

interface PlatformContextType {
  platform: Platform | null
}

const PlatformContext = createContext<PlatformContextType>({
  platform: null,
})

export const PlatformProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [platform, setPlatform] = useState<Platform | null>(null)

  const { getPlatform } = useSSOApi()

  useEffect(() => {
    getPlatform()
      .then((response: Platform) => {
        setPlatform(response)
      })
      .catch(error => {
        console.log(error)

        window.location.href = '/404'
      })
  }, [])

  const contextValues = useMemo(() => ({
    platform,
  }), [platform])

  return (
    <PlatformContext.Provider value={contextValues}>
      {children}
    </PlatformContext.Provider>
  )
}

export const usePlatform = (): PlatformContextType => useContext(PlatformContext)