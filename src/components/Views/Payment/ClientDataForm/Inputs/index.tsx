import React, { useContext } from "react"
import { PaymentContext } from "contexts/Payment"
import cleanPartnerData from "helpers/formatting/capitalizeFirstLetter"
import identificationTypes from "const/identificationTypes"
import texts from "strings/payment.json"
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import { HorizontalGroup } from "../styles"

function Inputs() {
  const { setPayment, payment } = useContext(PaymentContext)
  return (
    <>
      <HorizontalGroup>
        <Input
          width={200}
          label={texts.form.name}
          required
          type="text"
          onChange={e => {
            const name = cleanPartnerData(e.target.value)
            setPayment({
              item: payment.item,
              payer: { ...payment.payer, name },
            })
          }}
        />
        <Input
          width={270}
          label={texts.form.surname}
          required
          type="text"
          onChange={e => {
            const surname = cleanPartnerData(e.target.value)
            setPayment({
              item: payment.item,
              payer: { ...payment.payer, surname },
            })
          }}
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <InputSelect
          label={texts.form.identificationType}
          width={200}
          options={identificationTypes}
          required
          onClick={(e: { id: number; value: string }) => {
            setPayment({
              item: payment.item,
              payer: {
                ...payment.payer,
                identification: {
                  type: e.value,
                  number: payment.payer.identification.number,
                },
              },
            })
          }}
        />
        <Input
          width={270}
          label={texts.form.identificationNumber}
          required
          type="text"
          onChange={e =>
            setPayment({
              item: payment.item,
              payer: {
                ...payment.payer,
                identification: {
                  type: payment.payer.identification.type,
                  number: e.target.value,
                },
              },
            })
          }
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <Input
          width={200}
          label={texts.form.email}
          required
          type="email"
          onChange={e => {
            setPayment({
              item: payment.item,
              payer: { ...payment.payer, email: e.target.value },
            })
          }}
        />
        <Input
          width={100}
          label={texts.form.areaCode}
          required
          type="number"
          onChange={e => {
            setPayment({
              item: payment.item,
              payer: {
                ...payment.payer,
                phone: {
                  area_code: e.target.value,
                  number: payment.payer.phone.number,
                },
              },
            })
          }}
        />
        <Input
          width={175}
          label={texts.form.phone}
          required
          type="number"
          onChange={e => {
            setPayment({
              item: payment.item,
              payer: {
                ...payment.payer,
                phone: {
                  area_code: payment.payer.phone.area_code,
                  number: e.target.value,
                },
              },
            })
          }}
        />
      </HorizontalGroup>
    </>
  )
}

export default Inputs
