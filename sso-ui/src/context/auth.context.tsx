import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useMayoCustomerSSO } from "../services/mayo-customer-sso.service"
import { AuthChecker } from "../services/types"

interface AuthContextType {
  isLoggedIn: boolean
  isAuthLoading: boolean
  login: (username: string, password: string, platformUUID: string) => Promise<void>
  logout: () => Promise<void>
  authChecker: (uuid: string) => Promise<AuthChecker | undefined>
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isAuthLoading: true,
  login: async (username: string, password: string, platformUUID: string): Promise<void> => { throw new Error('not implemented') },
  logout: async (): Promise<void> => { throw new Error('not implemented') },
  authChecker: async (uuid: string): Promise<AuthChecker | undefined> => { throw new Error('not implemented') },
})

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('jwt'))
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)
  const { authenticate, authChecker: doAuthChecker, logout: doLogout } = useMayoCustomerSSO()

  const login = useCallback(async (username: string, password: string, platformUUID: string) => {
    try {
      const response = await authenticate(username, password, platformUUID)

      const url = `/?uuid=${response.uuid}&token=${response.token}`

      localStorage.setItem('jwt', response.token)

      window.location.href = url

    } catch (e) {
      throw e
    }
  }, [])

  const authChecker = useCallback(async (uuid: string): Promise<AuthChecker | undefined> => {
    let response

    try {
      response = await doAuthChecker(uuid)

      if (response.token) {
        setIsLoggedIn(true)
      }
    } catch (e) {
      window.location.href = `/check-me?uuid=${uuid}`

    } finally {
      setIsAuthLoading(false)
    }

    return response
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    try {
      await doLogout()

      localStorage.removeItem('jwt')

    } catch (e) {
      console.error(e)
    }
  }, [])

  const contextValues = useMemo(() => ({
    isLoggedIn,
    isAuthLoading,
    login,
    logout,
    authChecker
  }), [isLoggedIn, login, logout])

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => useContext(AuthContext)