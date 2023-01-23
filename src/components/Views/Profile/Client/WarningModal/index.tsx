/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react"
import { useRouter } from "next/router"
import login from "services/auth/login.service"
import blockAccount from "services/auth/blockAccount.service"
import texts from "strings/profile.json"
import Modal from "components/UI/Modal"
import Icon from "components/UI/Assets/Icon"
import Button from "components/UI/Button"
import InternalServerError from "components/Views/Error/InternalServerError"
import Input from "components/UI/Input"
import {
  ModalContainer,
  IconContainer,
  ButtonContainer,
  InputContainer,
  Error,
  FeedbackForm,
  RadioButton,
} from "./styles"

interface WarningModalInterface {
  cancel: (arg?: any) => void
}

function WarningModal({ cancel }: WarningModalInterface) {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [formStep, setFormStep] = useState<1 | 2>(1)

  const [formError, setFormError] = useState<string>("")
  const [formData, setFormData] = useState<{
    password: string
    confirmPassword: string
  }>({
    password: "",
    confirmPassword: "",
  })

  const deletionOptions = [
    {
      id: 1,
      value: "No la necesito mas",
    },
    {
      id: 2,
      value: "Es muy caro",
    },
    {
      id: 3,
      value: "Voy a cambiar de servicio",
    },
    {
      id: 4,
      value: "Otro",
    },
  ]

  const [deleteOptionSelected, setDeleteOptionSelected] = useState<{
    id: number
    value: string
  }>(deletionOptions[0])

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const deleteProfile = async () => {
    if (formData.password !== "" && formData.confirmPassword !== "") {
      setFormError("")

      if (formData.password === formData.confirmPassword) {
        const loginReq = await login("client", {
          email: userData.user,
          password: formData.password,
        })

        if (loginReq.status === 201) {
          const blockAccountReq = await blockAccount(userData.id)

          if (blockAccountReq.status === 201) {
            localStorage.removeItem("userData")
            router.reload()
          }
        } else if (loginReq.status === 401) {
          setFormError(`${texts.changePassword.wrongPassword}`)
        } else {
          setServerErrorModal(true)
        }
      } else {
        setFormError(`${texts.changePassword.matchingError}`)
      }
    } else {
      setFormError(`${texts.changePassword.requiredError}`)
    }
  }

  return (
    <Modal>
      <ModalContainer>
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
        {formStep === 1 ? (
          <>
            <h3>¿Por que quieres eliminar tu cuenta?</h3>
            <span>
              Se bloqueara tu cuenta y podras recuperarla dentro de un periodo
              de un mes. Luego se eliminara permanentemente.
            </span>
            <FeedbackForm>
              {deletionOptions.map(option => (
                <RadioButton key={option.id}>
                  <input
                    type="radio"
                    value={option.value}
                    onChange={() => setDeleteOptionSelected(option)}
                    checked={deleteOptionSelected.id === option.id}
                  />
                  <label htmlFor={option.value}>{option.value}</label>
                </RadioButton>
              ))}
            </FeedbackForm>
          </>
        ) : (
          <>
            <IconContainer>
              <Icon icon="Alert" color="#fff" width="45" height="45" />
            </IconContainer>
            <h3>¿Estas seguro de que deseas eliminar tu cuenta?</h3>
            <InputContainer>
              {formError !== "" && <Error>{formError}</Error>}

              <Input
                label={texts.changePassword.password}
                width={320}
                required
                type="password"
                backError={formError !== ""}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Input
                label={texts.changePassword.confirmPassword}
                width={320}
                required
                type="password"
                backError={formError !== ""}
                onChange={e =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                keyDown={deleteProfile}
              />
            </InputContainer>
          </>
        )}

        <ButtonContainer>
          <Button
            content={formStep === 1 ? texts.changePassword.cancel : "Volver"}
            cta={false}
            action={() => {
              if (formStep === 1) {
                cancel()
              } else {
                setFormStep(1)
              }
            }}
          />
          <Button
            content={
              formStep === 1 ? "Continuar" : texts.changePassword.confirm
            }
            cta
            action={() => {
              if (formStep === 1) {
                setFormStep(2)
              } else {
                deleteProfile()
              }
            }}
          />
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default WarningModal
