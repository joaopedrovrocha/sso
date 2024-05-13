import { PropsWithChildren } from "react";
import { AppLayout } from "../layout/app.layout";
import { PlatformProvider } from "../context/platform.context";
import { AuthProvider } from "../context/auth.context";

export function Middleware({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <PlatformProvider>
        <AppLayout>
          {children}
        </AppLayout>
      </PlatformProvider>
    </AuthProvider>
  )
}