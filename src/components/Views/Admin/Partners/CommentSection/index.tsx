import React, { useEffect, useState } from "react"
import { BsDot } from "react-icons/bs"
import { BiCommentAdd } from "react-icons/bi"
import CommentsInterface from "interfaces/users/Comments"
import { getClientComments } from "services/clients/clientActions.service"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import AddComment from "./AddComment"
import {
  CommentContainer,
  Title,
  CommentList,
  Comment,
  AddCommentButton,
} from "./styles"

function CommentSection({ clientId }: { clientId: number | null }) {
  const [comments, setComments] = useState<CommentsInterface[]>([])
  const [addCommentModal, setAddCommentModal] = useState<boolean>(false)
  const [updateList, setUpdateList] = useState<number>(0)

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
          <AddCommentButton
            type="button"
            onClick={() => setAddCommentModal(true)}
          >
            Agregar comentario
            <BiCommentAdd />
          </AddCommentButton>
          {addCommentModal && (
            <AddComment
              clientId={clientId}
              closeModal={() => {
                setAddCommentModal(false)
                setUpdateList(updateList + 1)
              }}
            />
          )}
        </CommentContainer>
      ) : (
        <></>
      )}
    </>
  )
}

export default CommentSection
