import React, { useContext } from "react"
import texts from "strings/articles.json"
import { DashboardContext } from "contexts/Dashboard"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import Modal from "components/UI/Modal"
import Input from "components/UI/Input"
import {
  ArticleFiltersInterface,
  OptionsInterface,
} from "interfaces/content/Article"
import AttachmentButtons from "./AttachmentButtons"
import ArticleButtons from "./ArticleButtons"
import PrevisualizeArticle from "./PrevisualizeArticle"
import {
  Container,
  Title,
  InputContainer,
  HorizontalGroup,
  FiltersTitle,
  ButtonContainer,
} from "./styles"

interface CreateArticleFormInterface {
  closeForm: (arg?: any) => void
}

function CreateArticleForm({ closeForm }: CreateArticleFormInterface) {
  const {
    regionFilters,
    themeFilters,
    newArticle,
    setNewArticle,
    previsualize,
    setTriggerArticleListUpdate,
    triggerArticleListUpdate,
  } = useContext(DashboardContext)

  return (
    <Modal>
      <Container>
        {!previsualize ? (
          <>
            <Title>{texts.newArticleForm.title}</Title>
            <InputContainer>
              <HorizontalGroup>
                <Input
                  label={texts.newArticleForm.labels.title}
                  required
                  type="text"
                  placeholder={texts.newArticleForm.labels.titlePlaceholder}
                  width={500}
                  value={newArticle.title}
                  onChange={e =>
                    setNewArticle({ ...newArticle, title: e.target.value })
                  }
                  max={70}
                />
                <Input
                  label={texts.newArticleForm.labels.subtitle}
                  required
                  type="text"
                  placeholder={texts.newArticleForm.labels.subtitlePlaceholder}
                  width={500}
                  value={newArticle.subtitle}
                  max={100}
                  onChange={e =>
                    setNewArticle({ ...newArticle, subtitle: e.target.value })
                  }
                />
              </HorizontalGroup>
              <FiltersTitle>{texts.newArticleForm.labels.filters}</FiltersTitle>
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
                  activeOptions={
                    newArticle.regionFilters as ArticleFiltersInterface[]
                  }
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
                  activeOptions={
                    newArticle.themeFilters as ArticleFiltersInterface[]
                  }
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
              <HorizontalGroup>
                <Input
                  value={newArticle.description}
                  label={texts.newArticleForm.labels.description}
                  required
                  type="text"
                  placeholder={
                    texts.newArticleForm.labels.descriptionPlaceholder
                  }
                  width={700}
                  max={300}
                  onChange={e =>
                    setNewArticle({
                      ...newArticle,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  value={newArticle.author}
                  label={texts.newArticleForm.labels.author}
                  required
                  type="text"
                  placeholder={texts.newArticleForm.labels.author}
                  width={300}
                  max={100}
                  onChange={e =>
                    setNewArticle({ ...newArticle, author: e.target.value })
                  }
                />
              </HorizontalGroup>
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
                value={newArticle.article}
                keyDown={() => {
                  setNewArticle({
                    ...newArticle,
                    article: `${newArticle.article}\n`,
                  })
                }}
              />
            </InputContainer>
          </>
        ) : (
          <PrevisualizeArticle />
        )}
        <ButtonContainer>
          {!previsualize && <AttachmentButtons />}
          <ArticleButtons
            closeForm={closeForm}
            updateList={() => {
              closeForm()
              setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
            }}
          />
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default CreateArticleForm
