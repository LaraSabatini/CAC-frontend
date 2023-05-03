/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react"
import { useRouter } from "next/router"
import login from "services/auth/login.service"
import blockAccount from "services/auth/blockAccount.service"
import { createFeedback } from "services/feedback/feedback.service"
import texts from "strings/profile.json"
import deletionOptions from "const/deleteProfileOptions"
import { Button, Modal, Radio, Space, Input } from "antd"
import type { RadioChangeEvent } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"

import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import { InputContainer, ErrorMessage, FeedbackForm } from "./styles"

function WarningModal() {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [deleteProfileWarning, setDeleteProfileWarning] = useState<boolean>(
    false,
  )
  const [loading, setLoading] = useState<boolean>(false)

  const [formStep, setFormStep] = useState<1 | 2>(1)

  const [formError, setFormError] = useState<string>("")
  const [formData, setFormData] = useState<{
    password: string
    confirmPassword: string
  }>({
    password: "",
    confirmPassword: "",
  })

  const [deleteOptionSelected, setDeleteOptionSelected] = useState<{
    id: number
    value: string
  }>(deletionOptions[0])

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const deleteProfile = async () => {
    if (formData.password !== "" && formData.confirmPassword !== "") {
      setFormError("")
      setLoading(true)

      if (formData.password === formData.confirmPassword) {
        const loginReq = await login("client", {
          email: userData.user,
          password: formData.password,
        })

        if (loginReq.status === 201) {
          const blockAccountReq = await blockAccount(userData.id, "block")
          const createFeedbackReq = await createFeedback({
            optionId: deleteOptionSelected.id,
            optionValue: deleteOptionSelected.value,
            clientId: userData.id,
          })

          if (
            blockAccountReq.status === 500 ||
            createFeedbackReq.status === 500
          ) {
            setServerErrorModal(true)
          }

          if (
            blockAccountReq.status === 201 &&
            createFeedbackReq.status === 201
          ) {
            localStorage.removeItem("userData")
            router.reload()
          }
        } else if (loginReq.status === 401) {
          setFormError(`${texts.changePassword.wrongPassword}`)
        } else if (loginReq.status === 500) {
          setServerErrorModal(true)
        }
      }
      setFormError(`${texts.changePassword.matchingError}`)
      setLoading(false)
    }
    setFormError(`${texts.changePassword.requiredError}`)
    setLoading(false)
  }

  const onChange = (e: RadioChangeEvent) => {
    const filterOption = deletionOptions.filter(
      option => option.id === e.target.value,
    )
    setDeleteOptionSelected({
      id: e.target.value,
      value: filterOption[0].value,
    })
  }

  return (
    <>
      <Button danger onClick={() => setDeleteProfileWarning(true)}>
        {texts.deleteProfile.title}
      </Button>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />

      <Modal
        title={texts.deleteProfile.titleQuestion}
        open={deleteProfileWarning}
        width={400}
        onOk={() => {
          if (formStep === 1) {
            setFormStep(2)
          } else {
            deleteProfile()
          }
        }}
        onCancel={() => {
          if (formStep === 1) {
            setDeleteProfileWarning(false)
          } else {
            setFormStep(1)
          }
        }}
        okText={
          formStep === 1
            ? texts.deleteProfile.continue
            : texts.changePassword.confirm
        }
        cancelText={
          formStep === 1
            ? texts.changePassword.cancel
            : texts.deleteProfile.goBack
        }
        confirmLoading={loading}
      >
        {formStep === 1 ? (
          <>
            <span>{texts.deleteProfile.deleteDescription}</span>
            <FeedbackForm>
              <Radio.Group onChange={onChange} value={deleteOptionSelected.id}>
                <Space direction="vertical">
                  <Radio value={1}>No la necesito mas</Radio>
                  <Radio value={2}>Es muy caro</Radio>
                  <Radio value={3}>Voy a cambiar de servicio</Radio>
                  <Radio value={4}>Otro</Radio>
                </Space>
              </Radio.Group>
            </FeedbackForm>
          </>
        ) : (
          <InputContainer>
            {formError !== "" && <ErrorMessage>{formError}</ErrorMessage>}
            <Input.Password
              placeholder={texts.changePassword.password}
              width={320}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              required
              status={formError !== "" ? "error" : ""}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Input.Password
              placeholder={texts.changePassword.confirmPassword}
              width={320}
              required
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              status={formError !== "" ? "error" : ""}
              onChange={e =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              onPressEnter={deleteProfile}
            />
          </InputContainer>
        )}
      </Modal>
    </>
  )
}

export default WarningModal
