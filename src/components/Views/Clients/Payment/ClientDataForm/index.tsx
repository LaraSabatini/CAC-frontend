/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import {
  validateEmail,
  validateIdentificationNumber,
} from "services/auth/validateClient.service"
import register from "services/auth/register.service"
import getClientId from "services/mercadoPago/getClientId.service"
import { ClientsContext } from "contexts/Clients"
import { PaymentContext } from "contexts/Payment"
import frontValidation from "helpers/forms/validateFrontRegistration"
import { dateFormated } from "helpers/dates/getToday"
import texts from "strings/payment.json"
import Modal from "components/UI/Modal"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import { Button } from "antd"
import ModalStatus from "components/UI/ModalStatus"
import MercadoPagoForm from "@components/Views/Clients/Payment/MercadoPagoButton"
import Inputs from "./Inputs"
import { FormContainer, Title, ButtonContainer, ErrorMessage } from "./styles"

interface ClientDataFormInterface {
  closeModal: (arg?: any) => void
}

function ClientDataForm({ closeModal }: ClientDataFormInterface) {
  const router = useRouter()

  const { payment, preferenceId, formError, setFormError } = useContext(
    PaymentContext,
  )
  const { newClient } = useContext(ClientsContext)

  const [loading, setLoading] = useState<boolean>(false)

  const [renderMPButton, setRenderMPButton] = useState<boolean>(false)
  const [duplicatedUser, setDuplicatedUser] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const checkIfItsAvailable = (response: { status: number; info: string }) => {
    return response.status === 200 && response.info === "available"
  }

  const validateInputs = async () => {
    setLoading(true)
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
        checkIfItsAvailable(validateEmailReq) &&
        checkIfItsAvailable(validateIdentificationNumberReq)
      ) {
        setRenderMPButton(true)
        setLoading(false)
      } else if (
        validateEmailReq.status === 500 ||
        validateIdentificationNumberReq.status === 500
      ) {
        setServerErrorModal(true)
        setLoading(false)
      } else {
        setLoading(false)

        // *** Error: ya existe un usuario con ese email o DNI
        setFormError(texts.form.duplicatedError)
        setDuplicatedUser(true)
        setLoginModal(true)
      }
    } else {
      setLoading(false)
      setFormError(texts.form.requiredError)
    }
  }

  useEffect(() => {
    setRenderMPButton(false)
  }, [newClient])

  const saveClientInDB = async () => {
    const getClientIdCall = await getClientId(preferenceId)

    if (getClientIdCall.status === 200) {
      const registerClient = await register("client", {
        ...newClient,
        password: "",
        accountBlocked: 1,
        subscription: null,
        dateCreated: dateFormated,
        loginAttempts: null,
        plan: null,
        paymentDate: null,
        paymentExpireDate: null,
        mpId: getClientIdCall.clientId,
      })

      if (registerClient.status === 500) {
        setServerErrorModal(true)
      }
    } else {
      setServerErrorModal(true)
    }
  }

  useEffect(() => {
    if (preferenceId !== "") {
      saveClientInDB()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceId])

  return (
    <Modal>
      <FormContainer>
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
        {duplicatedUser && loginModal && (
          <ModalStatus
            title={texts.form.loginModal.title}
            description={texts.form.duplicatedError}
            status="notice"
            ctaButton={{
              content: `${texts.form.loginModal.mainButton}`,
              action: () =>
                router.replace(
                  `${routes.login.name}?${routes.login.queries.client}`,
                ),
            }}
            secondaryButton={{
              content: `${texts.form.loginModal.secondaryButton}`,
              action: () => setLoginModal(false),
            }}
          />
        )}
        <Title>{texts.form.title}</Title>
        {formError !== "" && <ErrorMessage>{formError}</ErrorMessage>}
        <Inputs />

        <ButtonContainer>
          <Button
            onClick={() => {
              closeModal()
              setFormError("")
            }}
          >
            {texts.form.cancel}
          </Button>
          {!renderMPButton && (
            <Button loading={loading} type="primary" onClick={validateInputs}>
              {texts.form.next}
            </Button>
          )}

          {renderMPButton && !loading && (
            <MercadoPagoForm
              label={texts.actions.pay}
              item={[
                {
                  id: payment.item.id,
                  title: payment.item.title,
                  quantity: 1,
                  unit_price: payment.item.unit_price,
                },
              ]}
              payer={{
                name: newClient.name,
                surname: newClient.lastName,
                email: newClient.email,
              }}
              type="subscription"
              redirectPreferenceError={`${routes.payment.name}?${routes.payment.queries.preferenceError}`}
            />
          )}
        </ButtonContainer>
      </FormContainer>
    </Modal>
  )
}

export default ClientDataForm
