import React, { useContext, useState } from "react"
import Modal from "components/UI/Modal"
import validateClient from "services/auth/validateClient.service"
import { PaymentContext } from "contexts/Payment"
import identificationTypes from "const/identificationTypes"
import texts from "strings/payment.json"
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import MercadoPagoForm from "components/Views/Payment/MercadoPagoButton"
import cleanPartnerData from "helpers/formatting/capitalizeFirstLetter"
import {
  FormContainer,
  Title,
  ButtonContainer,
  ContinueButton,
  CancelButton,
  HorizontalGroup,
  Error,
} from "./styles"

interface ClientDataFormInterface {
  closeModal: (arg?: any) => void
}

function ClientDataForm({ closeModal }: ClientDataFormInterface) {
  const { setPayment, payment, frontValidation } = useContext(PaymentContext)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderMPButton, setRenderMPButton] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<boolean>(false)

  const validateInputs = async () => {
    const validate = frontValidation()
    setFormErrors(!validate)

    if (validate) {
      // validar DNI con BDD de clientes
      // si la validacion de DNI pasa => pasar a MP
      const validationBody = {
        email: payment.payer.email,
        identificationNumber: payment.payer.identification.number,
      }
      const validateDuplicated = await validateClient(validationBody)

      // eslint-disable-next-line no-console
      console.log("validateDuplicated", validateDuplicated)

      // setRenderMPButton(true)

      // despues del pago => registro usuario
    } else {
      // eslint-disable-next-line no-console
      console.log("no se puede crear")
    }
  }

  return (
    <Modal>
      <FormContainer>
        <Title>{texts.form.title}</Title>
        {formErrors && <Error>*Completa los campos requeridos</Error>}
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

        <ButtonContainer>
          <CancelButton type="button" onClick={closeModal}>
            {texts.form.cancel}
          </CancelButton>
          {!renderMPButton ? (
            <ContinueButton onClick={validateInputs} type="button">
              {texts.form.next}
            </ContinueButton>
          ) : (
            <MercadoPagoForm />
          )}
        </ButtonContainer>
      </FormContainer>
    </Modal>
  )
}

export default ClientDataForm
