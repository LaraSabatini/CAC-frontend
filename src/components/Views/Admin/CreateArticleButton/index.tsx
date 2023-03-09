import React, { useState, useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import { MdAdd } from "react-icons/md"
import texts from "strings/header.json"
import Tooltip from "components/UI/Tooltip"
import CreateArticleForm from "../CreateArticleForm"
import AddButton from "./styles"

function CreateArticleButton() {
  const { discardNewArticle } = useContext(ArticlesContext)
  const [openForm, setOpenForm] = useState<boolean>(false)

  return (
    <>
      {openForm && (
        <CreateArticleForm
          closeForm={() => {
            setOpenForm(false)
            discardNewArticle()
          }}
        />
      )}
      <Tooltip title={texts.createArticle} placement="bottom-end">
        <AddButton onClick={() => setOpenForm(true)}>
          <MdAdd />
        </AddButton>
      </Tooltip>
    </>
  )
}

export default CreateArticleButton
