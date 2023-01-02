import React, { useContext, useState } from "react"
import Modal from "components/UI/Modal"
import validateClient from "services/auth/validateClient.service"
import { PaymentContext } from "contexts/Payment"
import texts from "strings/payment.json"
import MercadoPagoForm from "components/Views/Payment/MercadoPagoButton"
import Inputs from "./Inputs"
import {
  FormContainer,
  Title,
  ButtonContainer,
  ContinueButton,
  CancelButton,
  Error,
} from "./styles"

interface ClientDataFormInterface {
  closeModal: (arg?: any) => void
}

function ClientDataForm({ closeModal }: ClientDataFormInterface) {
  const { payment, frontValidation, preferenceId } = useContext(PaymentContext)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderMPButton, setRenderMPButton] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>("")

  const validateInputs = async () => {
    const validate = frontValidation()

    if (validate) {
      setFormError("")
      const validationBody = {
        email: payment.payer.email,
        identificationNumber: payment.payer.identification.number,
      }
      const validateDuplicated = await validateClient(validationBody)

      if (validateDuplicated.status !== "duplicated") {
        // eslint-disable-next-line no-console
        console.log("se puede")

        // setRenderMPButton(true)
      } else {
        setFormError(texts.form.duplicatedError)
      }
    } else {
      setFormError(texts.form.requiredError)
    }
  }

  return (
    <Modal>
      <FormContainer>
        <Title>{texts.form.title}</Title>
        {formError !== "" && <Error>{formError}</Error>}
        <Inputs />

        <ButtonContainer>
          <CancelButton type="button" onClick={closeModal}>
            {texts.form.cancel}
          </CancelButton>
          {!renderMPButton ? (
            <ContinueButton onClick={validateInputs} type="button">
              {texts.form.next}
            </ContinueButton>
          ) : (
            <MercadoPagoForm preference={preferenceId} />
          )}
        </ButtonContainer>
      </FormContainer>
    </Modal>
  )
}

export default ClientDataForm
