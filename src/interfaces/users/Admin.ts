interface AdminInterface {
  id?: number
  userName: string
  email: string
  password: string
  accessPermits: string // JSON
  loginAttempts: number
}

export default AdminInterface
