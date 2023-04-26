import React, { useState } from "react"
import Modal from "components/UI/Modal"
import CommentsInterface from "interfaces/users/Comments"
import ModalStatus from "components/UI/ModalStatus"
import { createClientComment } from "services/clients/clientActions.service"
import Input from "components/UI/Input"
import Button from "components/UI/Button"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import { dateFormated } from "helpers/dates/getToday"
import { Title } from "../styles"
import { Container, ButtonContainer } from "./styles"

function AddComment({
  closeModal,
  clientId,
}: {
  closeModal: (arg?: any) => void
  clientId: number
}) {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [success, setSuccess] = useState<boolean>(false)
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const now = new Date()

  const hour = now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`
  const minute =
    now.getMinutes() > 9 ? `${now.getMinutes()}` : `0${now.getMinutes()}`

  const [newComment, setNewComment] = useState<CommentsInterface>({
    clientId,
    comment: "",
    author: `@${userData.user.split("@")[0]}`,
    date: dateFormated,
    hour: `${hour}:${minute}`,
  })

  const createComment = async () => {
    if (newComment.comment !== "") {
      const createClientCommentCall = await createClientComment(newComment)
      setSuccess(createClientCommentCall.status === 201)
      setServerErrorModal(createClientCommentCall.status !== 201)
    }
  }

  return (
    <Modal>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      <Container>
        <Title>Agregar comentario</Title>
        <Input
          label="Comentario"
          required
          type="textarea"
          width={300}
          height={200}
          onChange={e =>
            setNewComment({ ...newComment, comment: e.target.value })
          }
        />
        <ButtonContainer>
          <Button content="Cancelar" cta={false} action={closeModal} />
          <Button content="Guardar" cta action={createComment} />
        </ButtonContainer>
        {success && (
          <ModalStatus
            title="Excelente"
            description="El comentario se ha guardado con exito"
            status="success"
            selfClose
            selfCloseAction={closeModal}
          />
        )}
      </Container>
    </Modal>
  )
}

export default AddComment
