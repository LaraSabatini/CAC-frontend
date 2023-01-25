import React, { useContext } from "react"
import texts from "strings/articles.json"
import { DashboardContext } from "contexts/Dashboard"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import Modal from "components/UI/Modal"
import Input from "components/UI/Input"
import Button from "components/UI/Button"
import AttachmentButtons from "./AttachmentButtons"
import {
  Container,
  Title,
  InputContainer,
  HorizontalGroup,
  FiltersTitle,
  ButtonContainer,
  ActionButtons,
} from "./styles"

interface CreateArticleFormInterface {
  closeForm: (arg?: any) => void
}

interface OptionsInterface {
  id: number
  value: string
}

function CreateArticleForm({ closeForm }: CreateArticleFormInterface) {
  const {
    regionFilters,
    themeFilters,
    newArticle,
    setNewArticle,
    previsualize,
    setPrevisualize,
  } = useContext(DashboardContext)

  const publishArticle = () => {}

  return (
    <Modal>
      <Container>
        <Title>{texts.newArticleForm.title}</Title>
        <InputContainer>
          <HorizontalGroup>
            <Input
              label={texts.newArticleForm.labels.title}
              required
              type="text"
              placeholder={texts.newArticleForm.labels.titlePlaceholder}
              width={500}
              onChange={e =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
            <Input
              label={texts.newArticleForm.labels.subtitle}
              required
              type="text"
              placeholder={texts.newArticleForm.labels.subtitlePlaceholder}
              width={500}
              onChange={e =>
                setNewArticle({ ...newArticle, subtitle: e.target.value })
              }
            />
          </HorizontalGroup>
          <FiltersTitle>Filtros</FiltersTitle>
          <HorizontalGroup>
            <ComboBoxSelect
              placeholder={
                !newArticle.regionFilters.length
                  ? `${texts.newArticleForm.labels.region}`
                  : ""
              }
              optionsList="single"
              width={480}
              options={regionFilters}
              onChange={(e: OptionsInterface[] | undefined) => {
                if (e !== undefined) {
                  setNewArticle({
                    ...newArticle,
                    regionFilters: e,
                  })
                }
              }}
            />
            <ComboBoxSelect
              placeholder={
                !newArticle.themeFilters.length
                  ? `${texts.newArticleForm.labels.theme}`
                  : ""
              }
              optionsList="single"
              width={475}
              options={themeFilters}
              onChange={(e: OptionsInterface[] | undefined) => {
                if (e !== undefined) {
                  setNewArticle({
                    ...newArticle,
                    themeFilters: e,
                  })
                }
              }}
            />
          </HorizontalGroup>
          <Input
            label={texts.newArticleForm.labels.description}
            required
            type="text"
            placeholder={texts.newArticleForm.labels.descriptionPlaceholder}
            width={1010}
            max={240}
            onChange={e =>
              setNewArticle({ ...newArticle, description: e.target.value })
            }
          />
          <Input
            label={texts.newArticleForm.labels.fullArticle}
            required
            type="textarea"
            width={995}
            height={280}
            placeholder={texts.newArticleForm.labels.fullArticlePlaceholder}
            onChange={e =>
              setNewArticle({ ...newArticle, article: e.target.value })
            }
          />
        </InputContainer>
        <ButtonContainer>
          <AttachmentButtons />
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
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default CreateArticleForm
