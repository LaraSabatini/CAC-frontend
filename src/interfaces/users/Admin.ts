import { UserInterface } from "./General"

export interface AccessPermitsInterface {
  articles: {
    create: boolean
    edit: boolean
    delete: boolean
  }
  partners: boolean
}

export interface AdminInterface extends UserInterface {
  userName: string
  accessPermits: AccessPermitsInterface
}
