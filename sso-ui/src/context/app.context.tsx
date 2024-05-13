import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react"

interface AppContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const AppContext = createContext<AppContextType>({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => { throw new Error('not implemented') }
})

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const contextValues = useMemo(() => ({
    isLoading,
    setIsLoading,
  }), [isLoading, setIsLoading])

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextType => useContext(AppContext)