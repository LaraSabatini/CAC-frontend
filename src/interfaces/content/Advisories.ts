export interface AdvisoryInterface {
  id?: number
  adminId: number
  clientId: number
  clientName?: string
  date: string
  hour: string
  month: number
  brief: string
  eventURL: string
  status: string
}

export interface AdvisoryAvailavilityInterface {
  id: number
  adminId: number
  availability: number[] | string
}

export interface PublicEventsInterface {
  id?: number
  title: string
  description: string
  date: string
  hour: string
  month: number
  eventURL: string
  attendant: number[] | string
  createdBy: number
}
