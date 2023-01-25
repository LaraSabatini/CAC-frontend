import React, { useContext } from "react"
import { DashboardContext } from "contexts/Dashboard"
import texts from "strings/articles.json"
import Button from "components/UI/Button"
import { ActionButtons } from "../styles"

interface ArticleButtonsFormInterface {
  closeForm: (arg?: any) => void
}

function ArticleButtons({ closeForm }: ArticleButtonsFormInterface) {
  const {
    previsualize,
    setPrevisualize,
    newArticle,
    attachmentsForDataBase,
  } = useContext(DashboardContext)

  const findPortrait = attachmentsForDataBase.filter(
    file => file.type === "image",
  )

  const canPreview =
    newArticle.title !== "" &&
    newArticle.description !== "" &&
    newArticle.subtitle !== "" &&
    newArticle.regionFilters.length &&
    newArticle.article !== "" &&
    findPortrait.length > 0

  const publishArticle = () => {}

  return (
    <ActionButtons>
      <Button
        content={texts.newArticleForm.discard}
        cta={false}
        action={closeForm}
      />
      {canPreview ? (
        <Button
          content={
            !previsualize
              ? `${texts.newArticleForm.visualize}`
              : `${texts.newArticleForm.edit}`
          }
          cta={false}
          action={() => setPrevisualize(!previsualize)}
        />
      ) : (
        <></>
      )}
      <Button
        content={texts.newArticleForm.publish}
        cta
        action={publishArticle}
      />
    </ActionButtons>
  )
}

export default ArticleButtons
