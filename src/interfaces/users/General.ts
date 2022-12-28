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
