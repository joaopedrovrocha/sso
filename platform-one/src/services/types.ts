export interface Platform {
  id: number
  name: string
  url: string
  uuid: string
  logo: string
  redirectUrl: string
}

export interface User {
  id: number
  username: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface Customer {
  id: number
  name: string
  phoneNumber: string
  email: string
  userId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface Me {
  user: User
  customer: Customer
}