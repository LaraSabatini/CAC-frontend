import React, { useState, useRef, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { LoginContext } from "contexts/Login"
import login from "services/auth/login.service"
import changePassword from "services/auth/changePassword.service"
import validateReCaptcha from "services/reCaptcha/validateReCaptcha.service"
import ReCAPTCHA from "react-google-recaptcha"
import userData from "const/userData"
import errorTexts from "strings/errors.json"
import texts from "strings/profile.json"
import Modal from "components/UI/Modal"
import ModalStatus from "components/UI/ModalStatus"
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
}

function ChangePasswordModal({ cancel }: ChangePasswordModalInterface) {
  const router = useRouter()

  const {
    loginError,
    setLoginError,
    loginAttempts,
    setLoginAttempts,
    accountBlocked,
    setAccountBlocked,
  } = useContext(LoginContext)

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

  const captchaRef = useRef<ReCAPTCHA>(null)

  const tryChangePassword = async (response: any) => {
    if (response.status === 201) {
      // *** Cambiar contraseña
      const changePasswordReq = await changePassword(userData.type, {
        id: userData.id,
        newPassword: formData.newPassword,
      })

      if (changePasswordReq.status === 201) {
        setChangePasswordSuccess(true)
      }
    } else {
      // *** Mostrar error
      setFormError(`${texts.changePassword.wrongPassword}`)
      setLoginError(true)
      setLoginAttempts(response.loginAttempts ?? loginAttempts)
      setAccountBlocked(response.message === "Account blocked")
    }
  }

  const tryLogin = async () => {
    const loginReq = await login(userData.type, {
      email: userData.user,
      password: formData.password,
    })

    await tryChangePassword(loginReq)
  }

  const validateChange = async (e: any) => {
    e.preventDefault()

    let token: string | null

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
      // *** ReCaptcha
      if (loginAttempts >= 3 && captchaRef.current !== null) {
        token = captchaRef.current.getValue()
        captchaRef.current.reset()

        const validateReCaptchaReq = await validateReCaptcha({ token })

        if (validateReCaptchaReq.status === 201) {
          await tryLogin()
        }
      } else {
        await tryLogin()
      }
    }
  }

  useEffect(() => {
    if (accountBlocked) {
      router.push(
        `/error?title=${errorTexts.accountBlocked.title}&type=preference&span=${errorTexts.accountBlocked.span}&description=${errorTexts.accountBlocked.description}`,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountBlocked])

  return (
    <Modal>
      <ModalContainer>
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
        {loginAttempts >= 3 && (
          <ReCAPTCHA
            sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}`}
            ref={captchaRef}
          />
        )}
        <ButtonContainer>
          <Button
            content={texts.changePassword.cancel}
            cta={false}
            action={cancel}
          />
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
              sessionStorage.removeItem("userData")
              router.push("/login?client=true")
            }}
          />
        )}
      </ModalContainer>
    </Modal>
  )
}

export default ChangePasswordModal
