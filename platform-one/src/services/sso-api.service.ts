import { Me, Platform } from "./types"

const baseUrl = `http://localhost:8000/api/v1`
const uuid = '3fc8e1ec-153b-437f-861d-ad2669c12a1e'

const GET = async (uri: string, extraHeaders?: { [key: string]: any }) => {
  const request = await fetch(`${baseUrl}${uri}`, {
    method: 'GET',
    'credentials': 'include',
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders
    }
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

const getPlatform = async (): Promise<Platform> => {
  try {
    const { success, error, data } = await GET(`/platform/${uuid}`)

    if (!success) {
      throw new Error(`[SSO::getPlatform] ${error} | ${uuid} | ${data.error}`)
    }

    return data

  } catch (e) {
    throw e
  }
}

const me = async (token: string): Promise<Me> => {
  try {
    const { success, data } = await GET(`/user/me`, { 'Authorization': `Bearer ${token}` })

    if (!success) {
      throw new Error(`user is not logged in`)
    }

    return data

  } catch (e) {
    throw e
  }
}

export function useSSOApi() {
  return {
    getPlatform,
    me,
  }
}