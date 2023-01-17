import { UserInterface } from "./General"

interface AdminInterface extends UserInterface {
  userName: string
  accessPermits: string // JSON
}

export default AdminInterface
