/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react"
import { useRouter } from "next/router"
import restorePassword from "services/auth/restorePassword.service"
import changePassword from "services/auth/changePassword.service"
import texts from "strings/auth.json"
import routes from "routes"
import { UserType } from "interfaces/users/General"
import inputTexts from "strings/inputMessages.json"
import { Input, Button } from "antd"
import {
  UserOutlined,
  ArrowLeftOutlined,
  InfoCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CheckCircleOutlined,
} from "@ant-design/icons"
import {
  Form,
  Title,
  Description,
  MessageContainer,
  MessageTitle,
  InputContainer,
  ErrorMessage,
} from "./styles"

function ResetPassword() {
  const router = useRouter()

  const {
    redirected,
    user,
    send_email,
    pass,
    id,
    restore_password,
  } = router.query

  const [email, setEmail] = useState<string>(router.query.email as string)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const [passwordForm, setPasswordForm] = useState({
    first: "",
    confirm: "",
  })

  const sendRestorePasswordEmail = async (e: any) => {
    e?.preventDefault()

    const validation = email === ""
    setError(validation)
    setErrorMessage(validation ? `${inputTexts.isRequired}` : "")

    if (!validation) {
      const restorePasswordReq = await restorePassword(
        router.query.user as UserType,
        {
          recipients: [email],
          name: email.split("@")[0],
          restorePasswordURL: `${process.env.NEXT_PUBLIC_FRONT_URL}${routes.login.name}?${routes.login.queries.user}${user}&${routes.login.queries.resetPassword}&${routes.login.queries.email}${email}&${routes.login.queries.redirected}`,
        },
      )

      if (restorePasswordReq.status === 201) {
        router.replace(
          `${routes.login.name}?${routes.login.queries.resetPassword}&${routes.login.queries.sendEmail}${routes.login.queries.success}`,
        )
      } else if (restorePasswordReq.status === 401) {
        setErrorMessage(`${texts.restorePassword.noAccountRelated}`)
      } else {
        router.replace(
          `${routes.login.name}?${routes.login.queries.resetPassword}&${routes.login.queries.sendEmail}${routes.login.queries.failure}`,
        )
      }
    }
  }

  const validateChangePassword = async (e: any) => {
    e.preventDefault()

    const validateRequired =
      passwordForm.first === "" || passwordForm.confirm === ""
    setError(validateRequired)
    setErrorMessage(validateRequired ? `${texts.requiredError}` : "")

    if (!validateRequired) {
      const validateEqual = passwordForm.first !== passwordForm.confirm
      setError(validateEqual)
      setErrorMessage(
        validateEqual ? `${texts.restorePassword.missmatchError}` : "",
      )

      if (!validateEqual) {
        const changePasswordReq = await changePassword(
          user as UserType,
          {
            id: parseInt(id as string, 10),
            password: pass as string,
            newPassword: passwordForm.confirm,
          },
          true,
        )

        if (changePasswordReq.status === 201) {
          router.replace(
            `${routes.login.name}?${routes.login.queries.resetPassword}&${routes.login.queries.restorePassword}${routes.login.queries.success}`,
          )
        } else {
          router.replace(
            `${routes.login.name}?${routes.login.queries.resetPassword}&${routes.login.queries.restorePassword}${routes.login.queries.failure}`,
          )
        }
      }
    }
  }

  return (
    <div>
      {!redirected && !send_email && !restore_password && (
        <Form>
          <Title>
            ¿Olvidaste tu contraseña?
            <span>Aqui te enviaremos instrucciones para recuperarla</span>
          </Title>

          <Input
            status={error ? "error" : ""}
            placeholder={texts.login.email}
            prefix={<UserOutlined />}
            required
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setError(false)
            }}
            onPressEnter={sendRestorePasswordEmail}
          />
          <ErrorMessage transparent={errorMessage === ""}>
            {errorMessage !== "" && (
              <p>
                <InfoCircleOutlined /> {errorMessage}
              </p>
            )}
          </ErrorMessage>
          <div className="buttons">
            <Button type="primary" onClick={sendRestorePasswordEmail}>
              {texts.restorePassword.sendEmail}
            </Button>
            <Button
              onClick={() =>
                router.replace(
                  `${routes.login.name}?${routes.login.queries.client}`,
                )
              }
            >
              <ArrowLeftOutlined />
              Volver a Inicio de sesión
            </Button>
            <a
              href={`${process.env.NEXT_PUBLIC_FRONT_URL}${routes.pricing.name}`}
            >
              {texts.login.subscribe}
              <b>{texts.login.subscribeBold}</b>
            </a>
          </div>
        </Form>
      )}

      {redirected && (
        <Form>
          <Title>{texts.login.restorePasswordBold}</Title>
          <InputContainer>
            <Input.Password
              placeholder={texts.login.password}
              status={error ? "error" : ""}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              required
              onChange={e => {
                setPasswordForm({ ...passwordForm, first: e.target.value })
              }}
            />
            <Input.Password
              placeholder={texts.restorePassword.newPassword}
              status={error ? "error" : ""}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              required
              onChange={e => {
                setPasswordForm({ ...passwordForm, confirm: e.target.value })
              }}
              onPressEnter={validateChangePassword}
            />
          </InputContainer>
          <ErrorMessage transparent={errorMessage === ""}>
            {errorMessage !== "" && (
              <p>
                <InfoCircleOutlined /> {errorMessage}
              </p>
            )}
          </ErrorMessage>
          <div className="buttons">
            <Button type="primary" onClick={validateChangePassword}>
              {texts.restorePassword.changePassword}
            </Button>
          </div>
        </Form>
      )}

      {send_email === "success" && (
        <Form>
          <MessageContainer>
            <div className="title">
              <CheckCircleOutlined />
              <MessageTitle>El mail ha sido enviado con exito!</MessageTitle>
            </div>
            <Description>
              {texts.restorePassword.successEmail.description}
            </Description>
          </MessageContainer>
          <div className="buttons">
            <Button
              type="primary"
              onClick={() =>
                router.replace(
                  `${routes.login.name}?${routes.login.queries.client}`,
                )
              }
            >
              Ir a iniciar sesión
            </Button>
          </div>
        </Form>
      )}
      {send_email === "failure" && (
        <Form>
          <MessageContainer>
            <div className="title">
              <InfoCircleOutlined />
              <MessageTitle>
                {texts.restorePassword.failureEmail.title}
              </MessageTitle>
            </div>
            <Description>
              {texts.restorePassword.failureEmail.description}
            </Description>
          </MessageContainer>
          <div className="buttons">
            <Button
              type="primary"
              onClick={() =>
                router.replace(
                  `${routes.login.name}?${routes.login.queries.client}`,
                )
              }
            >
              Ir a iniciar sesión
            </Button>
          </div>
        </Form>
      )}

      {restore_password === "success" && (
        <Form>
          <MessageContainer>
            <div className="title">
              <CheckCircleOutlined />
              <MessageTitle>{texts.restorePassword.success.title}</MessageTitle>
            </div>
            <Description>
              Tu contraseña se ha establecido con exito!
            </Description>
          </MessageContainer>
          <div className="buttons">
            <Button
              type="primary"
              onClick={() =>
                router.replace(
                  `${routes.login.name}?${routes.login.queries.client}`,
                )
              }
            >
              {texts.login.action}
            </Button>
          </div>
        </Form>
      )}
      {restore_password === "failure" && (
        <Form>
          <MessageContainer>
            <div className="title">
              <InfoCircleOutlined />
              <MessageTitle>
                {texts.restorePassword.failureEmail.title}
              </MessageTitle>
            </div>
            <Description>{texts.restorePassword.error.description}</Description>
          </MessageContainer>
          <div className="buttons">
            <Button
              type="primary"
              // eslint-disable-next-line no-console
              onClick={() => console.log("redirect to landing")}
            >
              {texts.restorePassword.error.action}
            </Button>
          </div>
        </Form>
      )}
    </div>
  )
}

export default ResetPassword
