import React, { useState } from "react"
import { useRouter } from "next/router"
import login from "services/auth/login.service"
import blockAccount from "services/auth/blockAccount.service"
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

  const userData = JSON.parse(sessionStorage.getItem("userData") as string)

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
        setFormError("*Las contraseñas no coinciden")
      }
    } else {
      setFormError("*Completa los campos requeridos")
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
            label="Contraseña"
            width={320}
            required
            type="password"
            backError={formError !== ""}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input
            label="Confirmar contraseña"
            width={320}
            required
            type="password"
            backError={formError !== ""}
            onChange={e =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </InputContainer>
        <ButtonContainer>
          <Button content="Cancelar" cta={false} action={cancel} />
          <Button content="Confirmar" cta action={deleteProfile} />
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default WarningModal
