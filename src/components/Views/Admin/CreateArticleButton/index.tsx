import React from "react"
import { VscAdd } from "react-icons/vsc"
import texts from "strings/header.json"
import Tooltip from "components/UI/Tooltip"
import AddButton from "./styles"

function CreateArticleButton() {
  return (
    <Tooltip title={texts.createArticle} placement="bottom-end">
      <AddButton>
        <VscAdd />
      </AddButton>
    </Tooltip>
  )
}

export default CreateArticleButton
