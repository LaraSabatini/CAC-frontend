import React, { useState, useContext } from "react"
import { useRouter } from "next/router"
import { deleteArticle } from "services/articles/articles.service"
import login from "services/auth/login.service"
import { DashboardContext } from "contexts/Dashboard"
import profileTexts from "strings/profile.json"
import texts from "strings/articles.json"
import Modal from "components/UI/Modal"
import ModalStatus from "components/UI/ModalStatus"
import Icon from "components/UI/Assets/Icon"
import { Button } from "antd"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import Input from "components/UI/Input"
import {
  ModalContainer,
  IconContainer,
  ButtonContainer,
  InputContainer,
  Error,
} from "./styles"

interface WarningModalInterface {
  cancel: (arg?: any) => void
}

function DeleteArticleModal({ cancel }: WarningModalInterface) {
  const router = useRouter()

  const { setTriggerArticleListUpdate, triggerArticleListUpdate } = useContext(
    DashboardContext,
  )

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [formError, setFormError] = useState<string>("")
  const [formData, setFormData] = useState<{
    password: string
    confirmPassword: string
  }>({
    password: "",
    confirmPassword: "",
  })

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)
  const [modalSuccess, setModalSuccess] = useState<boolean>(false)

  const deleteArticleAction = async () => {
    if (formData.password !== "" && formData.confirmPassword !== "") {
      setFormError("")

      if (formData.password === formData.confirmPassword) {
        const loginReq = await login("admin", {
          email: userData.user,
          password: formData.password,
        })

        if (loginReq.status === 201) {
          const deleteArticleReq = await deleteArticle(
            parseInt(router.query.articleId as string, 10),
          )

          if (deleteArticleReq.status === 200) {
            setModalSuccess(true)
          } else {
            setServerErrorModal(true)
          }
        } else if (loginReq.status === 401) {
          setFormError(`${profileTexts.changePassword.wrongPassword}`)
        } else if (loginReq.status === 500) {
          setServerErrorModal(true)
        }
      } else {
        setFormError(`${profileTexts.changePassword.matchingError}`)
      }
    } else {
      setFormError(`${profileTexts.changePassword.requiredError}`)
    }
  }

  return (
    <Modal>
      <ModalContainer>
        {modalSuccess && (
          <ModalStatus
            title={texts.deleteArticle.success.title}
            description={texts.deleteArticle.success.description}
            status="success"
            selfClose
            selfCloseAction={() => {
              setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
              router.replace("/dashboard")
            }}
          />
        )}
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />

        <IconContainer>
          <Icon icon="Alert" color="#fff" width="45" height="45" />
        </IconContainer>
        <h3>{texts.deleteArticle.title}</h3>
        <span>{texts.deleteArticle.span}</span>
        <InputContainer>
          {formError !== "" && <Error>{formError}</Error>}

          <Input
            label={profileTexts.changePassword.password}
            width={320}
            required
            type="password"
            backError={formError !== ""}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input
            label={profileTexts.changePassword.confirmPassword}
            width={320}
            required
            type="password"
            backError={formError !== ""}
            onChange={e =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            keyDown={deleteArticleAction}
          />
        </InputContainer>

        <ButtonContainer>
          <Button onClick={() => cancel()}>{texts.deleteArticle.cancel}</Button>
          <Button type="primary" onClick={() => deleteArticleAction()}>
            {texts.deleteArticle.confirm}
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default DeleteArticleModal
