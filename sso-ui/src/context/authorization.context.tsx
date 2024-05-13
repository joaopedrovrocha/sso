import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMayoCustomerSSO } from "../services/mayo-customer-sso.service"
import { Authorize } from "../services/types"

interface AuthorizationContextType {
  authorize: () => Promise<Authorize>
}

const AuthorizationContext = createContext<AuthorizationContextType>({
  authorize: () => { throw new Error('not implemented') }
})

export const AuthorizationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [searchParams] = useSearchParams()

  const tokenParam = searchParams.get('token')

  if (!tokenParam) {
    window.location.href = '/401'
  }

  const { authorize: doAuthorize } = useMayoCustomerSSO()

  const authorize = useCallback(async () => {
    if (!tokenParam) {
      throw new Error('no token provided')
    }

    return await doAuthorize(tokenParam)
  }, [])

  useEffect(() => {
    if (tokenParam) {
      setToken(tokenParam)
    }
  }, [tokenParam])

  const contextValues = useMemo(() => ({
    authorize,
  }), [authorize])

  return (
    <AuthorizationContext.Provider value={contextValues}>
      {children}
    </AuthorizationContext.Provider>
  )
}

export const useAuthorization = (): AuthorizationContextType => useContext(AuthorizationContext)