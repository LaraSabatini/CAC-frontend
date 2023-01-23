import { UserInterface } from "./General"

export interface AdminInterface extends UserInterface {
  userName: string
  accessPermits: string
}

export interface AccessPermitsInterface {
  articles: {
    create: boolean
    edit: boolean
    delete: boolean
  }
  partners: boolean
}
