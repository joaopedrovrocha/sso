import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMayoCustomerSSO } from "../services/mayo-customer-sso.service"
import { Platform } from "../services/types"

interface PlatformContextType {
  platform: Platform | null
  uuid: string | null
  username: string | null
}

const PlatformContext = createContext<PlatformContextType>({
  uuid: null,
  platform: null,
  username: null,
})

export const PlatformProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [platform, setPlatform] = useState<Platform | null>(null)
  const [uuid, setUUID] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  const [searchParams] = useSearchParams()

  const platformUUID = searchParams.get('uuid')
  const usernameParam = searchParams.get('username')

  if (!platformUUID) {
    window.location.href = '/404'
  }

  const { getPlatform } = useMayoCustomerSSO()

  useEffect(() => {
    setUsername(usernameParam)
  }, [usernameParam])

  useEffect(() => {
    if (platformUUID) {
      setUUID(platformUUID)

      getPlatform(platformUUID)
        .then((response: Platform) => {
          setPlatform(response)
        })
        .catch(error => {
          console.log(error)

          window.location.href = '/404'
        })
    }
  }, [platformUUID, getPlatform])

  const contextValues = useMemo(() => ({
    uuid,
    platform,
    username,
  }), [uuid, platform, username])

  return (
    <PlatformContext.Provider value={contextValues}>
      {children}
    </PlatformContext.Provider>
  )
}

export const usePlatform = (): PlatformContextType => useContext(PlatformContext)