import React from "react"
import { AiOutlinePaperClip } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import texts from "strings/articles.json"
import Tooltip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import { ActionButtons, IconButton } from "../styles"

function AttachmentButtons() {
  return (
    <ActionButtons>
      <Tooltip title={texts.newArticleForm.attachFile}>
        <IconButton>
          <AiOutlinePaperClip />
        </IconButton>
      </Tooltip>
      <Tooltip title={texts.newArticleForm.attachImage}>
        <IconButton>
          <Icon icon="IconImage" />
        </IconButton>
      </Tooltip>
      <Tooltip title={texts.newArticleForm.attachVideo}>
        <IconButton>
          <BsFillPlayFill />
        </IconButton>
      </Tooltip>
    </ActionButtons>
  )
}

export default AttachmentButtons
