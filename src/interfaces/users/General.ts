export type UserType = "admin" | "client" | "master" | string

export interface ChangePasswordInterface {
  id: number
  password: string
  newPassword: string
}

export interface LoginInterface {
  email: string
  password: string
}

export interface UserInterface {
  id?: number
  email: string
  password: string
  loginAttempts: number | null
  accountBlocked: number
  firstLogin: 0 | 1 | null
}

export type UserDataType = {
  id: number
  logged: boolean
  user: string
  paymentExpireDate: string
  type: UserType | string
  firstLogin: boolean
}
