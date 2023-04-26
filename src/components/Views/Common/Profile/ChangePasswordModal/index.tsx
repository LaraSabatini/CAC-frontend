import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import { LoginContext } from "contexts/Login"
import { ProfileContext } from "contexts/Profile"
import changePassword from "services/auth/changePassword.service"
import errorTexts from "strings/errors.json"
import texts from "strings/profile.json"
import Modal from "components/UI/Modal"
import ModalStatus from "components/UI/ModalStatus"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import Input from "components/UI/Input"
import Button from "components/UI/Button"
import {
  ModalContainer,
  InputContainer,
  ButtonContainer,
  Error,
} from "./styles"

interface ChangePasswordModalInterface {
  cancel: (arg?: any) => void
  cantCancel: boolean
}

function ChangePasswordModal({
  cancel,
  cantCancel,
}: ChangePasswordModalInterface) {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const { setTriggerUpdate, triggerUpdate } = useContext(ProfileContext)

  const { loginError, setLoginError, accountBlocked } = useContext(LoginContext)

  const [formData, setFormData] = useState<{
    password: string
    newPassword: string
    confirmNewPassword: string
  }>({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [formError, setFormError] = useState<string>("")
  const [changePasswordSuccess, setChangePasswordSuccess] = useState<boolean>(
    false,
  )
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const tryChangePassword = async () => {
    // *** Cambiar contraseña
    const changePasswordReq = await changePassword(
      userData.type,
      {
        id: userData.id,
        password: formData.password,
        newPassword: formData.newPassword,
      },
      false,
    )

    if (changePasswordReq.status === 201) {
      setChangePasswordSuccess(true)

      const newUserData = {
        ...userData,
        firstLogin: false,
      }

      localStorage.setItem("userData", JSON.stringify(newUserData))
    } else if (changePasswordReq.status === 401) {
      setFormError(`${texts.changePassword.wrongPassword}`)
      setLoginError(true)
    }
    if (changePasswordReq.status === 500) {
      setServerErrorModal(true)
    }
  }

  const validateChange = async (e: any) => {
    e?.preventDefault()

    // *** Validar campos requeridos
    if (
      formData.password === "" ||
      formData.newPassword === "" ||
      formData.confirmNewPassword === ""
    ) {
      setFormError(`${texts.changePassword.requiredError}`)
      // *** Validar que las nuevas contraseñas coincidan
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      setFormError(`${texts.changePassword.matchingError}`)
    } else {
      setFormError("")
      await tryChangePassword()
    }
  }

  useEffect(() => {
    if (accountBlocked) {
      router.replace(
        `${routes.error.name}?${routes.error.queries.title}${errorTexts.accountBlocked.title}&${routes.error.queries.type}preference&${routes.error.queries.span}${errorTexts.accountBlocked.span}&${routes.error.queries.description}${errorTexts.accountBlocked.description}`,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountBlocked])

  return (
    <Modal>
      <ModalContainer>
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
        <h3>{texts.changePassword.title}</h3>
        {formError !== "" && <Error>{formError}</Error>}
        <InputContainer>
          <Input
            label={texts.changePassword.password}
            width={320}
            required
            type="password"
            backError={formError !== "" || loginError}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input
            label={texts.changePassword.newPassword}
            width={320}
            required
            backError={formError !== "" || loginError}
            type="password"
            onChange={e =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
          <Input
            label={texts.changePassword.confirmPassword}
            width={320}
            required
            type="password"
            backError={formError !== "" || loginError}
            keyDown={validateChange}
            onChange={e =>
              setFormData({ ...formData, confirmNewPassword: e.target.value })
            }
          />
        </InputContainer>

        <ButtonContainer>
          {cantCancel ? (
            <></>
          ) : (
            <Button
              content={texts.changePassword.cancel}
              cta={false}
              action={cancel}
            />
          )}
          <Button
            content={texts.changePassword.confirm}
            cta
            action={validateChange}
          />
        </ButtonContainer>
        {changePasswordSuccess && (
          <ModalStatus
            title={texts.changePassword.success.title}
            description={texts.changePassword.success.description}
            status="success"
            selfClose
            selfCloseAction={() => {
              setTriggerUpdate(triggerUpdate + 1)
              setChangePasswordSuccess(false)
              cancel()
              router.replace(routes.profile.name)
            }}
          />
        )}
      </ModalContainer>
    </Modal>
  )
}

export default ChangePasswordModal
