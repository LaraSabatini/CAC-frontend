/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react"
import { useRouter } from "next/router"
import { GrStatusGood, GrCircleAlert } from "react-icons/gr"
import restorePassword from "services/auth/restorePassword.service"
import changePassword from "services/auth/changePassword.service"
import texts from "strings/auth.json"
import routes from "routes"
import { UserType } from "interfaces/users/General"
import inputTexts from "strings/inputMessages.json"
import Input from "components/UI/Input"
import Button from "components/UI/Button"
import {
  Form,
  Title,
  Description,
  MessageContainer,
  MessageTitle,
  InputContainer,
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
          restorePasswordURL: `http://localhost:3000${routes.login.name}?${routes.login.queries.user}${user}&${routes.login.queries.resetPassword}&${routes.login.queries.email}${email}&${routes.login.queries.redirected}`,
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
          <Title>{texts.restorePassword.title}</Title>
          <Input
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setError(false)
            }}
            type="email"
            label={texts.login.email}
            required
            width={250}
            backError={error}
            backErrorMessage={errorMessage}
            keyDown={sendRestorePasswordEmail}
          />
          <Button
            content={texts.restorePassword.sendEmail}
            cta
            action={sendRestorePasswordEmail}
          />
        </Form>
      )}

      {redirected && (
        <Form>
          <Title>{texts.login.restorePasswordBold}</Title>
          <InputContainer>
            <Input
              onChange={e => {
                setPasswordForm({ ...passwordForm, first: e.target.value })
              }}
              type="password"
              label={texts.login.password}
              required
              width={270}
              backError={error}
            />
            <Input
              onChange={e => {
                setPasswordForm({ ...passwordForm, confirm: e.target.value })
              }}
              type="password"
              label={texts.restorePassword.newPassword}
              required
              width={270}
              backError={error}
              backErrorMessage={errorMessage}
              keyDown={validateChangePassword}
            />
          </InputContainer>
          <Button
            content={texts.restorePassword.changePassword}
            cta
            action={validateChangePassword}
          />
        </Form>
      )}

      {send_email === "success" && (
        <MessageContainer>
          <GrStatusGood />
          <MessageTitle>
            {texts.restorePassword.successEmail.title}
          </MessageTitle>
          <Description>
            {texts.restorePassword.successEmail.description}
          </Description>
        </MessageContainer>
      )}
      {send_email === "failure" && (
        <MessageContainer>
          <GrCircleAlert />
          <MessageTitle>
            {texts.restorePassword.failureEmail.title}
          </MessageTitle>
          <Description>
            {texts.restorePassword.failureEmail.description}
          </Description>
        </MessageContainer>
      )}

      {restore_password === "success" && (
        <MessageContainer>
          <GrStatusGood />
          <MessageTitle>{texts.restorePassword.success.title}</MessageTitle>
          <Button
            content={texts.login.action}
            cta
            action={() =>
              router.replace(
                `${routes.login.name}?${routes.login.queries.user}client`,
              )
            }
          />
        </MessageContainer>
      )}
      {restore_password === "failure" && (
        <MessageContainer>
          <GrCircleAlert />
          <MessageTitle>
            {texts.restorePassword.failureEmail.title}
          </MessageTitle>
          <Description>{texts.restorePassword.error.description}</Description>
          <Button
            content={texts.restorePassword.error.action}
            cta
            // eslint-disable-next-line no-console
            action={() => console.log("redirect to landing")}
          />
        </MessageContainer>
      )}
    </div>
  )
}

export default ResetPassword
