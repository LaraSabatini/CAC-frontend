import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import login from "services/auth/login.service"
import texts from "strings/auth.json"
import { LoginInterface } from "interfaces/users/General"
import Input from "components/UI/Input"
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

  const [formData, setFormData] = useState<LoginInterface>({
    email: "",
    password: "",
  })

  const loginFunction = async (e: any) => {
    e.preventDefault()
    if (formData.email !== "" && formData.password !== "") {
      const validate = await login(isClient ? "client" : "admin", formData)

      if (validate.status === 401 || validate.status === 404) {
        setLoginError(true)
        setLoginAttempts(validate.loginAttempts ?? loginAttempts)
        setAccountBlocked(validate.message === "Account blocked")
      } else {
        // setear localStorage - sessionStorage para diferenciar el tipo de usuario
        router.push(`/dashboard${userQuery}`)
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
              {/* reCaptcha ********************************* */}
              {loginAttempts >= 3 && <p>reCaptcha</p>}
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
        <h1>se bloqueo la cuenta</h1>
      )}
    </>
  )
}

export default LoginView
