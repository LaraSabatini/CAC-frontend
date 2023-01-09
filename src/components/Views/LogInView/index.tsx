import React, { useState, useEffect } from "react"
import texts from "strings/auth.json"
import { useRouter } from "next/router"
import Input from "components/UI/Input"
import {
  Container,
  Title,
  InputContainer,
  URLContainer,
  LoginButton,
  ActionDiv,
  ErrorMessage,
} from "./styles"

function LoginView() {
  const router = useRouter()

  const [isClient, setIsClient] = useState<boolean>(true)
  const [loginForm, setLoginForm] = useState<boolean>(true)
  const [loginError, setLoginError] = useState<boolean>(false)

  const login = () => {}

  useEffect(() => {
    setIsClient(!!(router.query.client as string))
    setLoginForm(!(router.query.reset_password as string))
  }, [router])

  return (
    <Container>
      <Title>
        {loginForm ? `${texts.login.title}` : `${texts.restorePassword.title}`}
      </Title>
      {loginForm && (
        <>
          <InputContainer>
            <Input
              width={321}
              label={texts.login.email}
              required
              type="email"
            />
            <Input
              width={356}
              label={texts.login.password}
              required
              type="password"
            />
            <ErrorMessage>{loginError && texts.login.error}</ErrorMessage>
          </InputContainer>
          <ActionDiv>
            <LoginButton type="button" onClick={login}>
              {texts.login.action}
            </LoginButton>
            <URLContainer>
              <a
                href={`http://localhost:3000/login?${
                  isClient ? "client=true" : "admin=true"
                }&reset-password=true`}
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
  )
}

export default LoginView
