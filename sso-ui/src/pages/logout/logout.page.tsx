import { useEffect } from "react";
import { PageSubTitle } from "../../components/page-subtitle.component";
import { PageTitle } from "../../components/page-title.component";
import { useAuth } from "../../context/auth.context";
import { usePlatform } from "../../context/platform.context";

export function LogoutPage() {
  const { logout } = useAuth()
  const { platform } = usePlatform()

  useEffect(() => {
    if (platform) {
      logout()
        .finally(() => {
          setTimeout(() => {
            window.location.href = `${platform.url}`
          }, 3000)
        })
    }
  }, [platform])

  return (
    <>
      <PageTitle>
        Saindo
      </PageTitle>

      <PageSubTitle>
        Você está sendo desconectado, você será redirecionado em breve...
      </PageSubTitle>
    </>
  )
}