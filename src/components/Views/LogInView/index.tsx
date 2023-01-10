import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import validateReCaptcha from "services/reCaptcha/validateReCaptcha.service"
import ReCAPTCHA from "react-google-recaptcha"
import login from "services/auth/login.service"
import texts from "strings/auth.json"
import errorTexts from "strings/errors.json"
import { LoginInterface } from "interfaces/users/General"
import Input from "components/UI/Input"
import GenericError from "components/Views/Error/GenericError"
import {
  Container,
  Title,
  InputContainer,
  URLContainer,
  LoginButton,
  ActionDiv,
  ErrorMessage,
  RequiredError,
} from "./styles"

function LoginView() {
  const router = useRouter()

  const [isClient, setIsClient] = useState<boolean>(true)
  const [loginForm, setLoginForm] = useState<boolean>(true)
  const [loginError, setLoginError] = useState<boolean>(false)
  const [requiredError, setRequiredError] = useState<boolean>(false)
  const [loginAttempts, setLoginAttempts] = useState<number>(0)
  const [accountBlocked, setAccountBlocked] = useState<boolean>(false)

  const userQuery = isClient ? "client=true" : "admin=true"

  const captchaRef = useRef<ReCAPTCHA>(null)

  const [formData, setFormData] = useState<LoginInterface>({
    email: "",
    password: "",
  })

  const tryLogin = async () => {
    const validate = await login(isClient ? "client" : "admin", formData)

    if (validate.status === 401 || validate.status === 404) {
      setLoginError(true)
      setLoginAttempts(validate.loginAttempts ?? loginAttempts)
      setAccountBlocked(validate.message === "Account blocked")
    } else {
      sessionStorage.setItem("user", formData.email)
      sessionStorage.setItem("type", isClient ? "client" : "admin")
      sessionStorage.setItem("logged", "true")
      router.push(`/dashboard?${userQuery}`)
    }
  }

  const loginFunction = async (e: any) => {
    e.preventDefault()

    let token: string | null

    if (formData.email !== "" && formData.password !== "") {
      if (loginAttempts >= 3 && captchaRef.current !== null) {
        token = captchaRef.current.getValue()
        captchaRef.current.reset()

        const validateHuman = await validateReCaptcha({ token })
        if (validateHuman.status === 201) {
          await tryLogin()
        }
      } else {
        await tryLogin()
      }
    } else {
      setRequiredError(true)
    }
  }

  useEffect(() => {
    setIsClient(!!(router.query.client as string))
    setLoginForm(!(router.query.reset_password as string))
  }, [router])

  useEffect(() => {
    if (accountBlocked) {
      router.push(`/login?${userQuery}&account_blocked=true`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountBlocked])

  return (
    <>
      {!accountBlocked ? (
        <Container>
          <div>
            <Title>
              {loginForm
                ? `${texts.login.title}`
                : `${texts.restorePassword.title}`}
            </Title>
            {requiredError && (
              <RequiredError>{texts.requiredError}</RequiredError>
            )}
          </div>
          {loginForm && (
            <>
              <InputContainer>
                <Input
                  width={321}
                  label={texts.login.email}
                  required
                  type="email"
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  backError={requiredError || loginError}
                />
                <Input
                  width={356}
                  label={texts.login.password}
                  required
                  type="password"
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  backError={requiredError || loginError}
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
                <LoginButton type="button" onClick={loginFunction}>
                  {texts.login.action}
                </LoginButton>
                <URLContainer>
                  <a
                    href={`http://localhost:3000/login?${userQuery}&reset-password=true`}
                  >
                    {texts.login.restorePassword}
                    <b>{texts.login.restorePasswordBold}</b>
                  </a>
                  {isClient && (
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
      ) : (
        <GenericError
          title={errorTexts.accountBlocked.title}
          span={errorTexts.accountBlocked.span}
          description={errorTexts.accountBlocked.description}
          actionButton={() => router.push("/pricing")}
          type="preference"
        />
      )}
    </>
  )
}

export default LoginView