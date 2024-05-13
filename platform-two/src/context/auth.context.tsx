import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react"
import { User, Customer } from "../services/types"
import { useSearchParams } from "react-router-dom"
import { useSSOApi } from "../services/sso-api.service"

interface AuthContextType {
  user: User | null
  customer: Customer | null
  isLoggedIn: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  customer: null,
  isLoggedIn: false,
  logout: () => { }
})

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const { me } = useSSOApi()

  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')

  function logout() {
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)

      setIsLoggedIn(true)
    }
  }, [token])

  useEffect(() => {
    const savedToken = localStorage.getItem('token')

    if (savedToken) {
      me(savedToken)
        .then(response => {
          setUser(response.user)
          setCustomer(response.customer)

          setIsLoggedIn(true)
        })
        .catch(err => {
          setIsLoggedIn(false)
        })
    }
  }, [])

  const contextValues = useMemo(() => ({
    user,
    customer,
    isLoggedIn,
    logout
  }), [user, customer, isLoggedIn, logout])

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => useContext(AuthContext)