import { useEffect } from "react"
import { PageSubTitle } from "../../components/page-subtitle.component"
import { PageTitle } from "../../components/page-title.component"
import { useAuth } from "../../context/auth.context"
import { usePlatform } from "../../context/platform.context"

export function HomePage() {
  const { isLoggedIn, isAuthLoading, authChecker } = useAuth()
  const { platform } = usePlatform()

  useEffect(() => {
    if (platform) {
      authChecker(platform.uuid)
        .then(response => {
          if (response) {
            const url = `${platform.redirectUrl}?token=${response.token}`

            setTimeout(() => { window.location.href = url }, 3000)
          }
        })
    }
  }, [platform])

  return (
    <>
      <PageTitle>
        <span className="text-lg">Mayo Delivery +</span> {platform?.name}
      </PageTitle>

      {!isLoggedIn && isAuthLoading && (
        <PageSubTitle>
          Carregando...
        </PageSubTitle>
      )}

      {isLoggedIn && (
        <PageSubTitle>
          Seja bem-vindo. <br />
          Você já está autenticado, você será redirecionado para <b>{platform?.name || 'carregando...'}</b> em instantes...
        </PageSubTitle>
      )}
    </>
  )
}