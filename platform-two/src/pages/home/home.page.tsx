import { useAuth } from "../../context/auth.context"
import { usePlatform } from "../../context/platform.context"

export function HomePage() {
  const { platform } = usePlatform()
  const { customer, isLoggedIn, logout } = useAuth()

  function handleLogin() {
    if (platform) {
      const url = `http://localhost:8001/?uuid=${platform.uuid}`

      window.location.href = url
    }
  }

  function handleLogout() {
    if (platform) {
      logout()

      setTimeout(() => {
        const url = `http://localhost:8001/logout?uuid=${platform.uuid}`

        window.location.href = url
      }, 500)
    }
  }

  return (
    <>
      {!isLoggedIn && (
        <button
          type="button"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={handleLogin}
        >
          Fazer Login SSO
        </button>
      )}

      {isLoggedIn && (
        <>
          <h1>
            Seja Bem Vindo!
          </h1>
          <p> {customer?.name} </p>
          <p> {customer?.email} </p>
          <p> {customer?.phoneNumber} </p>
          <p> {customer?.userId} </p>

          <button
            type="button"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleLogout}
          >
            Fazer Logout
          </button>
        </>
      )}
    </>
  )
}
