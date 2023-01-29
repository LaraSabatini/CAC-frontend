/* eslint-disable no-console */
import React from "react"
import Modal from "components/UI/Modal"

interface CreateArticleFormInterface {
  closeForm: (arg?: any) => void
}

function EditArticleForm({ closeForm }: CreateArticleFormInterface) {
  console.log(closeForm)

  return (
    <Modal>
      <div>hola</div>
    </Modal>
  )
}

export default EditArticleForm
