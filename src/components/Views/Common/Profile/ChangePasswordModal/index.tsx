import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import { LoginContext } from "contexts/Login"
import { ProfileContext } from "contexts/Profile"
import changePassword from "services/auth/changePassword.service"
import errorTexts from "strings/errors.json"
import texts from "strings/profile.json"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import { Button, Modal, Input } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { InputContainer, ErrorMessage } from "./styles"

interface ChangePasswordModalInterface {
  cantCancel: boolean
}

function ChangePasswordModal({ cantCancel }: ChangePasswordModalInterface) {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const { setTriggerUpdate, triggerUpdate } = useContext(ProfileContext)
  const [loading, setLoading] = useState<boolean>(false)

  const { loginError, setLoginError, accountBlocked } = useContext(LoginContext)

  const [changePasswordView, setChangePasswordView] = useState<boolean>(false)

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
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const success = () => {
    Modal.success({
      title: `${texts.changePassword.success.title}`,
      content: `${texts.changePassword.success.description}`,
      onOk() {
        setTriggerUpdate(triggerUpdate + 1)
        router.replace(routes.profile.name)
        setChangePasswordView(false)
      },
    })
  }

  const tryChangePassword = async () => {
    setLoading(true)
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
      const newUserData = {
        ...userData,
        firstLogin: false,
      }
      success()
      localStorage.setItem("userData", JSON.stringify(newUserData))
    } else if (changePasswordReq.status === 401) {
      setFormError(`${texts.changePassword.wrongPassword}`)
      setLoginError(true)
    }
    if (changePasswordReq.status === 500) {
      setServerErrorModal(true)
    }
    setLoading(false)
  }

  const validateChange = async (e: any) => {
    e?.preventDefault()

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

  useEffect(() => {
    if (router.query.change_password === "true") {
      setChangePasswordView(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <>
      <Button type="primary" onClick={() => setChangePasswordView(true)}>
        {texts.changePassword.title}
      </Button>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      <Modal
        title="Cambiar contraseña"
        open={changePasswordView}
        width={400}
        onOk={validateChange}
        onCancel={() => {
          if (!cantCancel) {
            setChangePasswordView(false)
          }
        }}
        okText={texts.changePassword.confirm}
        cancelText="Cancelar"
        confirmLoading={loading}
        cancelButtonProps={{
          disabled: cantCancel,
        }}
      >
        {formError !== "" && <ErrorMessage>{formError}</ErrorMessage>}
        <InputContainer>
          <Input.Password
            placeholder={texts.changePassword.password}
            width={320}
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            required
            status={formError !== "" || loginError ? "error" : ""}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input.Password
            placeholder={texts.changePassword.newPassword}
            width={320}
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            required
            status={formError !== "" || loginError ? "error" : ""}
            onChange={e =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
          <Input.Password
            placeholder={texts.changePassword.confirmPassword}
            width={320}
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            required
            status={formError !== "" || loginError ? "error" : ""}
            onPressEnter={validateChange}
            onChange={e =>
              setFormData({ ...formData, confirmNewPassword: e.target.value })
            }
          />
        </InputContainer>
      </Modal>
    </>
  )
}

export default ChangePasswordModal
