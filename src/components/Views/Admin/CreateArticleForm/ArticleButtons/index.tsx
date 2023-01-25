import React, { useContext } from "react"
import { DashboardContext } from "contexts/Dashboard"
import texts from "strings/articles.json"
import Button from "components/UI/Button"

import { ActionButtons } from "../styles"

interface ArticleButtonsFormInterface {
  closeForm: (arg?: any) => void
}

function ArticleButtons({ closeForm }: ArticleButtonsFormInterface) {
  const { previsualize, setPrevisualize } = useContext(DashboardContext)

  const publishArticle = () => {}

  return (
    <ActionButtons>
      <Button
        content={texts.newArticleForm.discard}
        cta={false}
        action={closeForm}
      />
      <Button
        content={
          !previsualize
            ? `${texts.newArticleForm.visualize}`
            : `${texts.newArticleForm.edit}`
        }
        cta={false}
        action={() => setPrevisualize(!previsualize)}
      />
      <Button
        content={texts.newArticleForm.publish}
        cta
        action={publishArticle}
      />
    </ActionButtons>
  )
}

export default ArticleButtons
