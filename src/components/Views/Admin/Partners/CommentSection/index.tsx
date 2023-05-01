import React, { useEffect, useState } from "react"
import { BsDot } from "react-icons/bs"
import CommentsInterface from "interfaces/users/Comments"
import {
  getClientComments,
  createClientComment,
} from "services/clients/clientActions.service"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import { Button, Modal, Input } from "antd"
import { CommentOutlined } from "@ant-design/icons"
import { dateFormated } from "helpers/dates/getToday"
import {
  CommentContainer,
  Title,
  CommentList,
  Comment,
  AddCommentButton,
} from "./styles"

function CommentSection({ clientId }: { clientId: number | null }) {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [comments, setComments] = useState<CommentsInterface[]>([])
  const [addCommentModal, setAddCommentModal] = useState<boolean>(false)
  const [updateList, setUpdateList] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const { TextArea } = Input

  const now = new Date()

  const hour = now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`
  const minute =
    now.getMinutes() > 9 ? `${now.getMinutes()}` : `0${now.getMinutes()}`

  const [newComment, setNewComment] = useState<CommentsInterface>({
    clientId: clientId as number,
    comment: "",
    author: `@${userData.user.split("@")[0]}`,
    date: dateFormated,
    hour: `${hour}:${minute}`,
  })

  const success = () => {
    Modal.success({
      content: "El comentario se ha creado con éxito",
      onOk() {
        setAddCommentModal(false)
        setUpdateList(updateList + 1)
        setNewComment({
          clientId: clientId as number,
          comment: "",
          author: `@${userData.user.split("@")[0]}`,
          date: dateFormated,
          hour: `${hour}:${minute}`,
        })
      },
    })
  }

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const getComments = async () => {
    const getClientCommentsCall = await getClientComments(clientId as number)
    if (getClientCommentsCall.status === 200) {
      setComments(getClientCommentsCall.data)
    } else {
      setServerErrorModal(true)
    }
  }

  useEffect(() => {
    if (clientId !== null) {
      getComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, updateList])

  const createComment = async () => {
    if (newComment.comment !== "") {
      setLoading(true)
      const createClientCommentCall = await createClientComment({
        ...newComment,
        clientId: clientId as number,
      })

      if (createClientCommentCall.status === 201) {
        setLoading(false)
        success()
      }
      setServerErrorModal(createClientCommentCall.status !== 201)
    }
  }

  return (
    <>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      {clientId !== null ? (
        <CommentContainer>
          <Title>Comentarios</Title>
          <CommentList>
            {comments.length ? (
              comments.map(comment => (
                <Comment>
                  <p className="author">
                    <b>{comment.author}</b>
                    <BsDot />
                    {comment.date.replaceAll("-", "/")}
                    <BsDot />
                    {comment.hour} hs
                  </p>
                  <p className="comment">{comment.comment}</p>
                </Comment>
              ))
            ) : (
              <></>
            )}
          </CommentList>

          <AddCommentButton>
            <Button type="primary" onClick={() => setAddCommentModal(true)}>
              <CommentOutlined />
              Agregar comentario
            </Button>
          </AddCommentButton>

          <Modal
            title="Agregar comentario"
            open={addCommentModal}
            onOk={createComment}
            onCancel={() => {
              setAddCommentModal(false)
              setNewComment({
                clientId: clientId as number,
                comment: "",
                author: `@${userData.user.split("@")[0]}`,
                date: dateFormated,
                hour: `${hour}:${minute}`,
              })
            }}
            okText="Guardar"
            cancelText="Cancelar"
            confirmLoading={loading}
          >
            <TextArea
              value={newComment.comment}
              rows={4}
              onChange={e =>
                setNewComment({ ...newComment, comment: e.target.value })
              }
            />
          </Modal>
        </CommentContainer>
      ) : (
        <></>
      )}
    </>
  )
}

export default CommentSection
