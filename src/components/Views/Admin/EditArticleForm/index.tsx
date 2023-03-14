import React, { useContext, useEffect } from "react"
import texts from "strings/articles.json"
import { DashboardContext } from "contexts/Dashboard"
import { ArticlesContext } from "contexts/Articles"
import Modal from "components/UI/Modal"
import Input from "components/UI/Input"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import { OptionsInterface } from "interfaces/content/Article"
import ArticleButtons from "./ArticleButtons"
import AttachmentButton from "./AttachmentButtons"
import PrevisualizeArticle from "./PrevisualizeArticle"
import {
  Container,
  Title,
  InputContainer,
  HorizontalGroup,
  FiltersTitle,
  ButtonContainer,
} from "../CreateArticleForm/styles"

interface EditArticleFormInterface {
  closeForm: (arg?: any) => void
}

function EditArticleForm({ closeForm }: EditArticleFormInterface) {
  const {
    regionFilters,
    themeFilters,
    setTriggerArticleListUpdate,
    triggerArticleListUpdate,
  } = useContext(DashboardContext)

  const {
    previsualizeEdit,

    articleSelected,
    articleEdited,
    setArticleEdited,
    setPortrait,
    setNewAttachmentsForDataBase,
  } = useContext(ArticlesContext)

  const getActiveOptions = (
    idsSelected: number[],
    filters: { id: number; value: string }[],
  ): { id: number; value: string }[] => {
    const activeOptions = []

    for (let i = 0; i < filters.length; i += 1) {
      if (idsSelected.includes(filters[i].id)) {
        activeOptions.push(filters[i])
      }
    }

    return activeOptions
  }

  useEffect(() => {
    if (articleSelected !== null) {
      setArticleEdited({
        ...articleSelected,
        createdBy: JSON.parse(articleSelected.createdBy as string),
        changesHistory: JSON.parse(articleSelected.changesHistory as string),
        regionFilters: JSON.parse(articleSelected.regionFilters as string),
        themeFilters: JSON.parse(articleSelected.themeFilters as string),
        attachments: JSON.parse(articleSelected.attachments as string),
      })
      setPortrait(articleSelected.portrait)
      setNewAttachmentsForDataBase(
        JSON.parse(articleSelected.attachments as string),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleSelected])

  return (
    <Modal>
      <Container>
        {!previsualizeEdit ? (
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
                  value={articleEdited.title}
                  onChange={e =>
                    setArticleEdited({
                      ...articleEdited,
                      title: e.target.value,
                    })
                  }
                  max={70}
                />
                <Input
                  label={texts.newArticleForm.labels.subtitle}
                  required
                  type="text"
                  placeholder={texts.newArticleForm.labels.subtitlePlaceholder}
                  width={500}
                  value={articleEdited.subtitle}
                  max={100}
                  onChange={e =>
                    setArticleEdited({
                      ...articleEdited,
                      subtitle: e.target.value,
                    })
                  }
                />
              </HorizontalGroup>
              <FiltersTitle>{texts.newArticleForm.labels.filters}</FiltersTitle>
              <HorizontalGroup>
                <ComboBoxSelect
                  placeholder={
                    !articleEdited.regionFilters.length
                      ? `${texts.newArticleForm.labels.region}`
                      : ""
                  }
                  optionsList="single"
                  width={480}
                  options={regionFilters}
                  activeOptions={getActiveOptions(
                    articleEdited.regionFilters as number[],
                    regionFilters,
                  )}
                  onChange={(e: OptionsInterface[] | undefined) => {
                    if (e !== undefined) {
                      const filters: number[] = []
                      e.map(filter => filters.push(filter.id))
                      setArticleEdited({
                        ...articleEdited,
                        regionFilters: filters,
                      })
                    }
                  }}
                />
                <ComboBoxSelect
                  placeholder={
                    !articleEdited.themeFilters.length
                      ? `${texts.newArticleForm.labels.theme}`
                      : ""
                  }
                  optionsList="single"
                  width={475}
                  options={themeFilters}
                  activeOptions={getActiveOptions(
                    articleEdited.themeFilters as number[],
                    themeFilters,
                  )}
                  onChange={(e: OptionsInterface[] | undefined) => {
                    if (e !== undefined) {
                      const filters: number[] = []
                      e.map(filter => filters.push(filter.id))
                      setArticleEdited({
                        ...articleEdited,
                        themeFilters: filters,
                      })
                    }
                  }}
                />
              </HorizontalGroup>
              <HorizontalGroup>
                <Input
                  value={articleEdited.description}
                  label={texts.newArticleForm.labels.description}
                  required
                  type="text"
                  placeholder={
                    texts.newArticleForm.labels.descriptionPlaceholder
                  }
                  width={700}
                  max={300}
                  onChange={e =>
                    setArticleEdited({
                      ...articleEdited,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  value={articleEdited.author}
                  label={texts.newArticleForm.labels.author}
                  required
                  type="text"
                  placeholder={texts.newArticleForm.labels.author}
                  width={300}
                  max={100}
                  onChange={e =>
                    setArticleEdited({
                      ...articleEdited,
                      author: e.target.value,
                    })
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
                  setArticleEdited({
                    ...articleEdited,
                    article: e.target.value,
                  })
                }
                value={articleEdited.article}
                keyDown={() => {
                  setArticleEdited({
                    ...articleEdited,
                    article: `${articleEdited.article}\n`,
                  })
                }}
              />
            </InputContainer>
          </>
        ) : (
          <PrevisualizeArticle />
        )}
        <ButtonContainer>
          {!previsualizeEdit && <AttachmentButton />}
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

export default EditArticleForm
