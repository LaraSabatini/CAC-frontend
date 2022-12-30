import React, { useContext } from "react"
import Modal from "components/UI/Modal"
import { PaymentContext } from "contexts/Payment"
import identificationTypes from "const/identificationTypes"
import texts from "strings/payment.json"
import inputTexts from "strings/inputMessages.json"
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import cleanPartnerData from "helpers/formatting/capitalizeFirstLetter"
import {
  FormContainer,
  Title,
  ButtonContainer,
  ContinueButton,
  CancelButton,
  HorizontalGroup,
} from "./styles"

interface ClientDataFormInterface {
  closeModal: (arg?: any) => void
}

function ClientDataForm({ closeModal }: ClientDataFormInterface) {
  const { setPayment, payment, inputErrors, setInputErrors } = useContext(
    PaymentContext,
  )

  const frontValidation = () => {
    if (payment.payer.name === "") {
      setInputErrors({ ...inputErrors, name: true })
    }
    if (payment.payer.surname === "") {
      setInputErrors({ ...inputErrors, surname: true })
    }
    if (payment.payer.email === "") {
      setInputErrors({ ...inputErrors, email: true })
    }
    if (payment.payer.phone.area_code === "") {
      setInputErrors({
        ...inputErrors,
        phone: {
          area_code: true,
          number: inputErrors.phone.number,
        },
      })
    }
    if (payment.payer.phone.number === "") {
      setInputErrors({
        ...inputErrors,
        phone: {
          area_code: inputErrors.phone.area_code,
          number: true,
        },
      })
    }
    if (payment.payer.identification.number === "") {
      setInputErrors({
        ...inputErrors,
        identification: {
          number: true,
        },
      })
    }

    return (
      inputErrors.name &&
      inputErrors.surname &&
      inputErrors.email &&
      inputErrors.phone.area_code &&
      inputErrors.phone.number &&
      inputErrors.identification.number
    )
  }

  const validateInputs = () => {
    const validate = frontValidation()

    if (validate) {
      // validar DNI con BDD de clientes
    }
  }

  return (
    <Modal>
      <FormContainer>
        <Title>{texts.form.title}</Title>
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
            backError={inputErrors.name}
            backErrorMessage={inputTexts.isRequired}
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
            backError={inputErrors.surname}
            backErrorMessage={inputTexts.isRequired}
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
            backError={inputErrors.identification.number}
            backErrorMessage={inputTexts.isRequired}
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
            backError={inputErrors.email}
            backErrorMessage={inputTexts.isRequired}
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
            backError={inputErrors.phone.area_code}
            backErrorMessage={inputTexts.isRequired}
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
            backError={inputErrors.phone.number}
            backErrorMessage={inputTexts.isRequired}
          />
        </HorizontalGroup>

        <ButtonContainer>
          <CancelButton type="button" onClick={closeModal}>
            {texts.form.cancel}
          </CancelButton>
          <ContinueButton onClick={validateInputs} type="button">
            {texts.form.next}
          </ContinueButton>
        </ButtonContainer>
      </FormContainer>
    </Modal>
  )
}

export default ClientDataForm
