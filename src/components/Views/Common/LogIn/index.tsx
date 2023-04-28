import React, { useState, useEffect, useContext, useRef } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import { LoginContext } from "contexts/Login"
import validateReCaptcha from "services/reCaptcha/validateReCaptcha.service"
import ReCAPTCHA from "react-google-recaptcha"
import login from "services/auth/login.service"
import texts from "strings/auth.json"
import errorTexts from "strings/errors.json"
import { UserType } from "interfaces/users/General"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons"
import { Button, Input } from "antd"
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

  const captchaRef = useRef<ReCAPTCHA>(null)

  const tryLogin = async () => {
    const loginReq = await login(userQuery.split("=")[1] as UserType, formData)

    if (loginReq.status === 401 || loginReq.status === 404) {
      // *** Validacion de error para evaluar si la ruta es la correcta
      if (loginReq.error === "User is admin") {
        router.replace(`${routes.login.name}?${routes.login.queries.admin}`)
        setUserIsClient(false)
        setRevalidate(1)
      } else if (loginReq.error === "User is client") {
        router.replace(`${routes.login.name}?${routes.login.queries.client}`)
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
      // *** Almacenar data en localStorage para mantener sesion iniciada
      const userData = {
        id: loginReq.userId,
        logged: true,
        user: formData.email,
        type: userQuery.split("=")[1],
        firstLogin: loginReq.firstLogin === 1,
        paymentExpireDate: "",
      }
      localStorage.setItem("userData", JSON.stringify(userData))

      router.replace(routes.dashboard.name)
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
          // *** Error ReCaptcha
          router.replace(
            `${routes.error.name}?${routes.error.queries.title}${errorTexts.robotDetected.title}&${routes.error.queries.type}preference&${routes.error.queries.span}${errorTexts.robotDetected.span}&${routes.error.queries.description}${errorTexts.robotDetected.description}`,
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
    setUserIsClient(!!(router.query.user === "client"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (accountBlocked) {
      router.replace(
        `${routes.error.name}?${routes.error.queries.title}${errorTexts.accountBlocked.title}&${routes.error.queries.type}preference&${routes.error.queries.span}${errorTexts.accountBlocked.span}&${routes.error.queries.description}${errorTexts.accountBlocked.description}`,
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

  return (
    <>
      <Container>
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
        <div>
          <Title>{texts.login.title}</Title>
          <RequiredError>
            {requiredError && `${texts.requiredError}`}
          </RequiredError>
        </div>
        <>
          <InputContainer>
            <Input
              status={requiredError || loginError ? "error" : ""}
              placeholder={texts.login.email}
              prefix={<UserOutlined />}
              required
              onChange={e => {
                setFormData({ ...formData, email: e.target.value })
                if (e.target.value !== "") {
                  setRequiredError(false)
                  setLoginError(false)
                }
              }}
            />
            <div className="input-password">
              <Input.Password
                placeholder={texts.login.password}
                status={requiredError || loginError ? "error" : ""}
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                required
                onChange={e => {
                  setFormData({ ...formData, password: e.target.value })
                  if (e.target.value !== "") {
                    setRequiredError(false)
                    setLoginError(false)
                  }
                }}
                onPressEnter={validateUser}
              />
              <a
                href={`${process.env.NEXT_PUBLIC_FRONT_URL}${routes.login.name}?${userQuery}&${routes.login.queries.resetPassword}&${routes.login.queries.email}${formData.email}`}
              >
                {texts.login.restorePassword}
              </a>
            </div>
            <ErrorMessage>{loginError && texts.login.error}</ErrorMessage>
          </InputContainer>
          {loginAttempts >= 3 && (
            <ReCAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}`}
              ref={captchaRef}
            />
          )}
          <ActionDiv>
            <RemainingAttempts>
              {loginAttempts >= 1 && (
                <p>
                  {texts.login.remainingAttempts} {5 - loginAttempts}
                </p>
              )}
            </RemainingAttempts>
            <Button type="primary" onClick={validateUser}>
              {texts.login.action}
            </Button>
            <URLContainer>
              {userIsClient && (
                <a
                  href={`${process.env.NEXT_PUBLIC_FRONT_URL}${routes.pricing.name}`}
                >
                  {texts.login.subscribe}
                  <b>{texts.login.subscribeBold}</b>
                </a>
              )}
            </URLContainer>
          </ActionDiv>
        </>
      </Container>
    </>
  )
}

export default LoginView
