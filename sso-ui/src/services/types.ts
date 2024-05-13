export interface Platform {
  id: number
  name: string
  url: string
  uuid: string
  logo: string
  redirectUrl: string
}

export interface CheckMe {
  isUser: boolean
}

export interface Authorize {
  platformId: number
  redirectUrl: string
  token: string
  userId: number
  uuid: string
}

export interface PlatformUser {
  id: number
  platformId: number
  userId: number
  validationToken?: string
  tokenExpiresAt?: Date
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface AuthChecker {
  token: string
}

export interface Logout {
  isAuth: boolean
}

export interface ZipCode {
  street: string
  complement: string
  district: string
  city: string
  state: string
  stateShortname: string
  zipcode: string
}