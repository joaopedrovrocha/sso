import { useEffect } from "react"
import { useAuth } from "../../context/auth.context"
import { usePlatform } from "../../context/platform.context"

export function CallbackPage() {
  const { platform } = usePlatform()
  const { customer } = useAuth()

  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/'
    }, 3000)
  }, [])

  return (
    <>
      <p>
        Olá, {customer?.name}. Você está Authenticado na loja {platform?.name}
      </p>
      <p>
        Você será redirecionado para a página principal.
      </p>
    </>
  )
}
