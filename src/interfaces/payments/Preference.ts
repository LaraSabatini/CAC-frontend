export interface ItemInterface {
  id: string
  title: string
  description?: string
  category_id?: string
  quantity: number
  currency_id?: string
  unit_price: number
  picture_url?: string
  time?: number
}

export interface PayerInterface {
  name: string
  surname: string
  email: string
}

export interface PaymentMethodsInterface {
  default_card_id: null
  default_payment_method_id: null
  excluded_payment_methods: { id: string }[]
  excluded_payment_types: { id: string }[]
  installments: null
  default_installments: null
}
