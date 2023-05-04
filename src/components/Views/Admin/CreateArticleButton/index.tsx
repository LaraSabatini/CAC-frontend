import React, { useState, useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import { FolderAddOutlined } from "@ant-design/icons"
import CreateArticleForm from "../CreateArticleForm"
import { Option } from "../../Common/Header/styles"

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

      <Option
        onClick={() => {
          setOpenForm(true)
        }}
      >
        <FolderAddOutlined />
        Crear artículo
      </Option>
    </>
  )
}

export default CreateArticleButton
