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

export interface MPPreferenceInterface {
  additional_info: string
  auto_return: string
  back_urls: {
    failure: string
    pending: string
    success: string
  }
  binary_mode: false
  client_id: string
  collector_id: number
  coupon_code: any
  coupon_labels: any
  date_created: string
  date_of_expiration: any
  expiration_date_from: any
  expiration_date_to: any
  expires: false
  external_reference: string
  id: string
  init_point: string
  internal_metadata: any
  items: {
    id: string
    category_id: string
    currency_id: string
    description: string
    title: string
    quantity: number
    unit_price: number
  }[]
  marketplace: string
  marketplace_fee: number
  metadata: any
  notification_url: any
  operation_type: string
  payer: {
    phone: {
      area_code: string
      number: string
    }
    address: {
      zip_code: string
      street_name: string
      street_number: any
    }
    email: string
    identification: {
      number: string
      type: string
    }
    name: string
    surname: string
    date_created: any
    last_purchase: any
  }
  payment_methods: {
    default_card_id: any
    default_payment_method_id: any
    excluded_payment_methods: {
      id: string
    }[]
    excluded_payment_types: {
      id: string
    }[]
    installments: any
    default_installments: any
  }
  processing_modes: any
  product_id: any
  redirect_urls: {
    failure: string
    pending: string
    success: string
  }
  sandbox_init_point: string
  site_id: string
  shipments: {
    default_shipping_method: any
    receiver_address: {
      zip_code: string
      street_name: string
      street_number: any
      floor: string
      apartment: string
      city_name: any
      state_name: any
      country_name: any
    }
  }
  total_amount: any
  last_updated: any
}
