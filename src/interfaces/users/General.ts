export interface UserType {
  type: "admin" | "client"
}

export interface ChangePasswordInterface {
  id: number
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
  loginAttempts: number
  accountBlocked: number
}
