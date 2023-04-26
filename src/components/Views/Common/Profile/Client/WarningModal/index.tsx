/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react"
import { useRouter } from "next/router"
import login from "services/auth/login.service"
import blockAccount from "services/auth/blockAccount.service"
import { createFeedback } from "services/feedback/feedback.service"
import texts from "strings/profile.json"
import deletionOptions from "const/deleteProfileOptions"
import Modal from "components/UI/Modal"
import Icon from "components/UI/Assets/Icon"
import Button from "components/UI/Button"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
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
          const blockAccountReq = await blockAccount(userData.id, "block")
          const createFeedbackReq = await createFeedback({
            optionId: deleteOptionSelected.id,
            optionValue: deleteOptionSelected.value,
            clientId: userData.id,
          })

          if (
            blockAccountReq.status === 500 ||
            createFeedbackReq.status === 500
          ) {
            setServerErrorModal(true)
          }

          if (
            blockAccountReq.status === 201 &&
            createFeedbackReq.status === 201
          ) {
            localStorage.removeItem("userData")
            router.reload()
          }
        } else if (loginReq.status === 401) {
          setFormError(`${texts.changePassword.wrongPassword}`)
        } else if (loginReq.status === 500) {
          setServerErrorModal(true)
        }
      }
      setFormError(`${texts.changePassword.matchingError}`)
    }
    setFormError(`${texts.changePassword.requiredError}`)
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
            <h3>{texts.deleteProfile.titleQuestion}</h3>
            <span>{texts.deleteProfile.deleteDescription}</span>
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
            <h3>{texts.deleteProfile.confirm}</h3>
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
            content={
              formStep === 1
                ? texts.changePassword.cancel
                : texts.deleteProfile.goBack
            }
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
              formStep === 1
                ? texts.deleteProfile.continue
                : texts.changePassword.confirm
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
