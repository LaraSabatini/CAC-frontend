import React, { useState, useEffect, useContext, useRef } from "react"
import { useRouter } from "next/router"
import { LoginContext } from "contexts/Login"
import validateReCaptcha from "services/reCaptcha/validateReCaptcha.service"
import ReCAPTCHA from "react-google-recaptcha"
import login from "services/auth/login.service"
import texts from "strings/auth.json"
import errorTexts from "strings/errors.json"
import { UserType } from "interfaces/users/General"
import InternalServerError from "components/Views/Error/InternalServerError"
import Input from "components/UI/Input"
import Button from "components/UI/Button"
import {
  Container,
  Title,
  InputContainer,
  URLContainer,
  ActionDiv,
  ErrorMessage,
  RequiredError,
  RemainingAttempts,
} from "./styles"

function LoginView() {
  const router = useRouter()

  const {
    userIsClient,
    setUserIsClient,
    openLoginForm,
    setOpenLoginForm,
    loginError,
    setLoginError,
    requiredError,
    setRequiredError,
    loginAttempts,
    setLoginAttempts,
    accountBlocked,
    setAccountBlocked,
    revalidate,
    setRevalidate,
    formData,
    setFormData,
    userQuery,
  } = useContext(LoginContext)

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [isMobile, setIsMobile] = useState(false)

  const captchaRef = useRef<ReCAPTCHA>(null)

  const handleResize = () => {
    if (window.innerWidth < 414) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const tryLogin = async () => {
    const loginReq = await login(userQuery.split("=")[0] as UserType, formData)

    if (loginReq.status === 401 || loginReq.status === 404) {
      // *** Validacion de error para evaluar si la ruta es la correcta
      if (loginReq.error === "User is admin") {
        router.push(`/login?admin=true`)
        setUserIsClient(false)
        setRevalidate(1)
      } else if (loginReq.error === "User is client") {
        router.push(`/login?client=true`)
        setUserIsClient(true)
        setRevalidate(1)
      } else {
        setLoginError(true)
        setLoginAttempts(loginReq.loginAttempts ?? loginAttempts)
        setAccountBlocked(loginReq.message === "Account blocked")
      }
    } else if (loginReq.status === 500) {
      setServerErrorModal(true)
    } else {
      const userData = {
        id: loginReq.clientId,
        logged: true,
        user: formData.email,
        type: userQuery.split("=")[0],
        firstLogin: loginReq.firstLogin === 1,
        paymentExpireDate: "",
      }
      localStorage.setItem("userData", JSON.stringify(userData))

      router.push("/dashboard")
    }
  }

  const validateUser = async (e?: any) => {
    e?.preventDefault()

    let token: string | null

    if (formData.email !== "" && formData.password !== "") {
      // *** Si ya intento iniciar sesion 3 veces, validar que sea humano
      if (loginAttempts >= 3 && captchaRef.current !== null) {
        token = captchaRef.current.getValue()
        captchaRef.current.reset()

        const validateReCaptchaReq = await validateReCaptcha({ token })

        if (validateReCaptchaReq.status === 201) {
          await tryLogin()
        } else {
          // ERROR ReCaptcha
          router.push(
            `/error?title=${errorTexts.robotDetected.title}&type=preference&span=${errorTexts.robotDetected.span}&description=${errorTexts.robotDetected.descripcion}`,
          )
        }
      } else {
        await tryLogin()
      }
    } else {
      setRequiredError(true)
    }
  }

  useEffect(() => {
    setUserIsClient(!!(router.query.client as string))
    setOpenLoginForm(!(router.query.reset_password as string))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (accountBlocked) {
      router.push(
        `/error?title=${errorTexts.accountBlocked.title}&type=preference&span=${errorTexts.accountBlocked.span}&description=${errorTexts.accountBlocked.description}`,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountBlocked])

  useEffect(() => {
    // *** Se dispara cuando se cambia la ruta, ej: ingreso al login de clientes pero es amdmin
    if (revalidate > 0) {
      validateUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidate])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <>
      <Container>
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
        <div>
          <Title>
            {openLoginForm
              ? `${texts.login.title}`
              : `${texts.restorePassword.title}`}
          </Title>
          {requiredError && (
            <RequiredError>{texts.requiredError}</RequiredError>
          )}
        </div>
        {openLoginForm && (
          <>
            <InputContainer>
              <Input
                width={isMobile ? 280 : 321}
                label={texts.login.email}
                required
                type="email"
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                backError={requiredError || loginError}
              />
              <Input
                width={isMobile ? 315 : 356}
                label={texts.login.password}
                required
                type="password"
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                backError={requiredError || loginError}
                keyDown={validateUser}
              />
              <ErrorMessage>{loginError && texts.login.error}</ErrorMessage>
            </InputContainer>
            {loginAttempts >= 3 && (
              <ReCAPTCHA
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}`}
                ref={captchaRef}
              />
            )}
            <ActionDiv>
              {loginAttempts > 4 && (
                <RemainingAttempts>
                  {texts.login.remainingAttempts} {5 - loginAttempts}
                </RemainingAttempts>
              )}
              <Button content={texts.login.action} action={validateUser} cta />
              <URLContainer>
                <a
                  href={`http://localhost:3000/login?${userQuery}&reset-password=true`}
                >
                  {texts.login.restorePassword}
                  <b>{texts.login.restorePasswordBold}</b>
                </a>
                {userIsClient && (
                  <a href="http://localhost:3000/pricing">
                    {texts.login.subscribe}
                    <b>{texts.login.subscribeBold}</b>
                  </a>
                )}
              </URLContainer>
            </ActionDiv>
          </>
        )}
      </Container>
    </>
  )
}

export default LoginView
