import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"

const defaultPaymet: { item: ItemInterface; payer: PayerInterface } = {
  item: {
    id: "",
    title: "",
    quantity: 0,
    unit_price: 0,
    time: 0,
  },
  payer: {
    name: "",
    surname: "",
    email: "",
  },
}

export default defaultPaymet
