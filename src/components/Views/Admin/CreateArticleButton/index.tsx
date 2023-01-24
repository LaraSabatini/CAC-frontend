import React, { useState } from "react"
import { MdAdd } from "react-icons/md"
import texts from "strings/header.json"
import Tooltip from "components/UI/Tooltip"
import CreateArticleForm from "../CreateArticleForm"
import AddButton from "./styles"

function CreateArticleButton() {
  const [openForm, setOpenForm] = useState<boolean>(false)

  return (
    <>
      {openForm && <CreateArticleForm closeForm={() => setOpenForm(false)} />}
      <Tooltip title={texts.createArticle} placement="bottom-end">
        <AddButton onClick={() => setOpenForm(true)}>
          <MdAdd />
        </AddButton>
      </Tooltip>
    </>
  )
}

export default CreateArticleButton
