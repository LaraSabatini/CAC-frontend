import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
import validateClient from "services/auth/validateClient.service"
import createPreference from "services/payment/createPreference.service"
import { ClientsContext } from "contexts/Clients"
import { PaymentContext } from "contexts/Payment"
import addMonths from "helpers/dates/addMonths"
import frontValidation from "helpers/forms/validateFrontRegistration"
import texts from "strings/payment.json"
import Modal from "components/UI/Modal"
import Button from "components/UI/Button"
import MercadoPagoForm from "components/Views/Payment/MercadoPagoButton"
import Inputs from "./Inputs"
import { FormContainer, Title, ButtonContainer, Error } from "./styles"

interface ClientDataFormInterface {
  closeModal: (arg?: any) => void
}

function ClientDataForm({ closeModal }: ClientDataFormInterface) {
  const router = useRouter()

  const { payment, preferenceId, setPreferenceId } = useContext(PaymentContext)
  const { newClient } = useContext(ClientsContext)

  const [renderMPButton, setRenderMPButton] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>("")

  const validateInputs = async () => {
    const validate = frontValidation(
      newClient.name,
      newClient.lastName,
      newClient.email,
      newClient.phoneAreaCode,
      newClient.phoneNumber,
      newClient.identificationNumber,
    )

    if (validate) {
      setFormError("")
      const validationBody = {
        email: newClient.email,
        identificationNumber: newClient.identificationNumber,
      }
      const validateDuplicated = await validateClient(validationBody)

      if (validateDuplicated.status === 201) {
        const createPreferenceId = await createPreference({
          item: [
            {
              id: payment.item.id,
              title: payment.item.title,
              quantity: 1,
              unit_price: payment.item.unit_price,
            },
          ],
          payer: {
            name: newClient.name,
            surname: newClient.lastName,
            email: newClient.email,
          },
        })

        if (createPreferenceId.status === 200) {
          const paymentData = {
            preferenceId: createPreferenceId.id,
            pricePaid: payment.item.unit_price,
            itemId: payment.item.id,
            paymentExpireDate: addMonths(payment.item.time as number),
          }

          localStorage.setItem("client", JSON.stringify(newClient))
          localStorage.setItem("payment", JSON.stringify(paymentData))

          setPreferenceId(createPreferenceId.id)
          setRenderMPButton(true)
        } else {
          router.push("/payment?preference_error=true")
        }
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
          <Button content={texts.form.cancel} cta={false} action={closeModal} />
          {!renderMPButton ? (
            <Button content={texts.form.next} cta action={validateInputs} />
          ) : (
            <MercadoPagoForm preference={preferenceId} />
          )}
        </ButtonContainer>
      </FormContainer>
    </Modal>
  )
}

export default ClientDataForm
