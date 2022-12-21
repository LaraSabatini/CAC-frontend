type AutoReturn = "approved" | "all" | undefined

export interface ItemInterface {
  id: string
  title: string
  description?: string
  category_id?: string
  quantity: number
  currency_id?: string
  unit_price: number
  picture_url?: string
}

export interface PayerInterface {
  name: string
  surname: string
  email: string
  date_created?: null
  last_purchase?: null
  phone: {
    area_code: string
    number: string
  }
  identification: {
    type: string
    number: string
  }
  address: {
    street_name: string
    street_number: string
    zip_code: string
  }
}

export interface PaymentMethodsInterface {
  default_card_id: null
  default_payment_method_id: null
  excluded_payment_methods: { id: string }[]
  excluded_payment_types: { id: string }[]
  installments: null
  default_installments: null
}

export interface PreferenceInterface {
  items: ItemInterface[]
  payer?: PayerInterface
  back_urls: {
    success: string
    failure: string
    pending: string
  }
  auto_return: AutoReturn
  payment_methods?: {
    excluded_payment_methods: {
      id: string
    }[]
    excluded_payment_types: {
      id: string
    }[]
    installments: number
  }
  notification_url?: string
  statement_descriptor?: string
  external_reference?: string
  expires?: boolean
  expiration_date_from?: Date
  expiration_date_to?: Date
}

export interface PreferenceResponseInterface {
  response: {
    additional_info: string
    auto_return: AutoReturn
    back_urls: {
      failure: string
      pending: string
      success: string
    }
    binary_mode: boolean
    client_id: string
    collector_id: number
    coupon_code: null
    coupon_labels: null
    date_created: string
    date_of_expiration: null
    expiration_date_from: null
    expiration_date_to: null
    expires: boolean
    external_reference: string
    id: string
    init_point: string
    internal_metadata: null
    items: ItemInterface[]
    marketplace: string
    marketplace_fee: number
    metadata: {}
    notification_url: null
    operation_type: string
    payer: PayerInterface
    payment_methods: PaymentMethodsInterface
    processing_modes: null
    product_id: null
    redirect_urls: {
      failure: string
      pending: string
      success: string
    }
    sandbox_init_point: string
    site_id: string
    shipments: {
      default_shipping_method: null
      receiver_address: {
        zip_code: string
        street_name: string
        street_number: null
        floor: string
        apartment: string
        city_name: null
        state_name: null
        country_name: null
      }
    }
    total_amount: null
    last_updated: null
  }
  status: number
}
