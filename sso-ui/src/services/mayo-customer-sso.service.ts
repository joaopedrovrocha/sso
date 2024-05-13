import { AuthChecker, Authorize as Authenticate, CheckMe, Logout, Platform, PlatformUser } from "./types"

const baseUrl = `http://localhost:8000/api/v1`

const GET = async (uri: string) => {
  const request = await fetch(`${baseUrl}${uri}`, {
    method: 'GET',
    'credentials': 'include',
    headers: { 'Content-Type': 'application/json' }
  })

  return await request.json()
}

const POST = async (uri: string, params: any) => {
  const request = await fetch(`${baseUrl}${uri}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    'credentials': 'include',
    body: JSON.stringify(params)
  })

  return await request.json()
}

const getPlatform = async (paltformUUID: string): Promise<Platform> => {
  try {
    const { success, error, data } = await GET(`/platform/${paltformUUID}`)

    if (!success) {
      throw new Error(`[SSO::getPlatform] ${error} | ${paltformUUID} | ${data.error}`)
    }

    return data

  } catch (e) {
    throw e
  }
}

const checkMe = async (username: string): Promise<CheckMe> => {
  try {
    const { success, data } = await POST(`/user/check-me`, { username })

    if (!success) {
      throw new Error(`[SSO:checkMe] error when checking the user ${username} | ${data.error}`)
    }

    return data

  } catch (e) {
    throw e
  }
}

const authenticate = async (username: string, password: string, platformUUID: string): Promise<Authenticate> => {
  try {
    const { success, error, data } = await POST(`/user/authenticate`, { username, password, platformUUID })

    if (!success) {
      let message = error

      if (message.match(/invalid password/)) {
        message = 'Usuário e/ou senha incorreta'
      }

      throw new Error(message)
    }

    return data

  } catch (e) {
    throw e
  }
}

const authorize = async (validationToken: string): Promise<Authenticate> => {
  try {
    const { success, error, data } = await POST(`/user/authorize`, { validationToken })

    if (!success) {
      throw new Error(error)
    }

    return data

  } catch (e) {
    throw e
  }
}

const authChecker = async (uuid: string): Promise<AuthChecker> => {
  try {
    const { success, error, data } = await GET(`/user/auth-checker?platformUUID=${uuid}`)

    if (!success) {
      throw new Error(error)
    }

    return data

  } catch (e) {
    throw e
  }
}

const logout = async (): Promise<Logout> => {
  try {
    const { success, error, data } = await POST(`/user/logout`, {})

    if (!success) {
      throw new Error(error)
    }

    return data

  } catch (e) {
    throw e
  }
}

const register = async (username: string, password: string, name: string, phoneNumber: string, email: string, platformUUID: string): Promise<PlatformUser> => {
  try {
    const { success, error, data } = await POST('/user/register', { username, password, name, phoneNumber, email, platformUUID })

    if (!success) {
      throw new Error(error)
    }

    return data

  } catch (e) {
    throw e
  }
}

export function useMayoCustomerSSO() {
  return {
    getPlatform,

    checkMe,
    authenticate,
    authorize,
    authChecker,
    logout,
    register
  }
}