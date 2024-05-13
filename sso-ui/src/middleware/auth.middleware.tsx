import { PropsWithChildren } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { AppProvider } from "../context/app.context";
import { useAuth } from "../context/auth.context";
import { PlatformProvider } from "../context/platform.context";
import { AppLayout } from "../layout/app.layout";

export function AuthMiddleware({ children }: PropsWithChildren) {
  const [searchParams] = useSearchParams()

  const { isLoggedIn } = useAuth()
  const uuid = searchParams.get('uuid')

  console.log(isLoggedIn, uuid)

  if (!isLoggedIn) {
    return (<Navigate to={`/?uuid=${uuid}`} />)
  }

  return (
    <AppProvider>
      <PlatformProvider>
        <AppLayout>
          {children}
        </AppLayout>
      </PlatformProvider>
    </AppProvider>
  )
}

export function PublicMiddleware({ children }: PropsWithChildren) {
  return (
    <AppProvider>
      <PlatformProvider>
        <AppLayout>
          {children}
        </AppLayout>
      </PlatformProvider>
    </AppProvider>
  )
}