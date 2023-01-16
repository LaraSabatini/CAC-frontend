import React, { useState } from "react"
import { useRouter } from "next/router"
import login from "services/auth/login.service"
import blockAccount from "services/auth/blockAccount.service"
import userData from "const/userData"
import texts from "strings/profile.json"
import Modal from "components/UI/Modal"
import Icon from "components/UI/Assets/Icon"
import Button from "components/UI/Button"
import Input from "components/UI/Input"
import {
  ModalContainer,
  IconContainer,
  ButtonContainer,
  InputContainer,
  Error,
} from "./styles"

interface WarningModalInterface {
  cancel: (arg?: any) => void
}

function WarningModal({ cancel }: WarningModalInterface) {
  const router = useRouter()

  const [formError, setFormError] = useState<string>("")
  const [formData, setFormData] = useState<{
    password: string
    confirmPassword: string
  }>({
    password: "",
    confirmPassword: "",
  })

  const deleteProfile = async () => {
    if (formData.password !== "" && formData.confirmPassword !== "") {
      setFormError("")

      const validate = formData.password === formData.confirmPassword

      if (validate) {
        const loginReq = await login("client", {
          email: userData.user,
          password: formData.password,
        })

        if (loginReq.status === 201) {
          const blockAccountReq = await blockAccount(userData.id)

          if (blockAccountReq.status === 201) {
            sessionStorage.removeItem("userData")
            router.reload()
          }
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
        <ButtonContainer>
          <Button
            content={texts.changePassword.cancel}
            cta={false}
            action={cancel}
          />
          <Button
            content={texts.changePassword.confirm}
            cta
            action={deleteProfile}
          />
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default WarningModal
