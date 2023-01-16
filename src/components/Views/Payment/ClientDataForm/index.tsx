import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
import {
  validateEmail,
  validateIdentificationNumber,
} from "services/auth/validateClient.service"
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

      // *** Validar que no haya un usuario ya creado con el mismo mail o numero de documento
      const validateEmailReq = await validateEmail({ email: newClient.email })
      const validateIdentificationNumberReq = await validateIdentificationNumber(
        { identificationNumber: newClient.identificationNumber },
      )

      if (
        validateEmailReq.status === 200 &&
        validateEmailReq.info === "available" &&
        validateIdentificationNumberReq.status === 200 &&
        validateIdentificationNumberReq.info === "available"
      ) {
        // *** Crear objeto de compra para que MercadoPago genere un id de preferencia
        const createPreferenceReq = await createPreference({
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

        if (createPreferenceReq.status === 201) {
          const paymentData = {
            preferenceId: createPreferenceReq.id,
            pricePaid: payment.item.unit_price,
            itemId: payment.item.id,
            paymentExpireDate: addMonths(payment.item.time as number),
          }

          localStorage.setItem("client", JSON.stringify(newClient))
          localStorage.setItem("payment", JSON.stringify(paymentData))

          setPreferenceId(createPreferenceReq.id)
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
            <MercadoPagoForm
              label={texts.actions.pay}
              preference={preferenceId}
            />
          )}
        </ButtonContainer>
      </FormContainer>
    </Modal>
  )
}

export default ClientDataForm
