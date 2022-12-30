export const defaultPaymet = {
  item: {
    id: "",
    title: "",
    quantity: 0,
    unit_price: 0,
  },
  payer: {
    name: "",
    surname: "",
    email: "",
    phone: {
      area_code: "",
      number: "",
    },
    identification: {
      type: "",
      number: "",
    },
  },
}

export const inputErrorsDefault = {
  name: false,
  surname: false,
  email: false,
  phone: {
    area_code: false,
    number: false,
  },
  identification: {
    number: false,
  },
}
