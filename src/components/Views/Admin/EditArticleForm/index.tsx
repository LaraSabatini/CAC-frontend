import React, { useContext, useEffect, useState } from "react"
import texts from "strings/articles.json"
import { ArticlesContext } from "contexts/Articles"
import Modal from "components/UI/Modal"
import regionFilters from "const/regions"
import { Input, Select } from "antd"
import { filterList } from "const/filters"
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
    previsualizeEdit,
    setPrevisualizeEdit,
    articleSelected,
    articleEdited,
    setArticleEdited,
    setPortrait,
    setNewAttachmentsForDataBase,
  } = useContext(ArticlesContext)

  const [regionsSelected, setRegionsSelected] = useState<string[]>([])
  const [themesSelected, setThemesSelected] = useState<string[]>([])

  const { TextArea } = Input

  const setDefaultValuesForSelect = (themes: number[], regions: number[]) => {
    const regionsArray: string[] = []

    regions.forEach(value => {
      const filterRegions = regionFilters.filter(item => item.id === value)
      if (filterRegions.length > 0) {
        regionsArray.push(filterRegions[0].value)
      }
    })

    const themesArray: string[] = []

    themes.forEach(value => {
      const filterThemes = filterList.filter(item => item.id === value)
      if (filterThemes.length > 0) {
        themesArray.push(filterThemes[0].value)
      }
    })

    setRegionsSelected(regionsArray)
    setThemesSelected(themesArray)
  }

  useEffect(() => {
    setPrevisualizeEdit(false)
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
      setDefaultValuesForSelect(
        JSON.parse(articleSelected.themeFilters as string),
        JSON.parse(articleSelected.regionFilters as string),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleSelected])

  return (
    <Modal>
      <Container>
        {!previsualizeEdit &&
        themesSelected.length > 0 &&
        regionsSelected.length > 0 ? (
          <>
            <Title>Editar publicación</Title>
            <InputContainer>
              <HorizontalGroup>
                <Input
                  placeholder={texts.newArticleForm.labels.titlePlaceholder}
                  required
                  onChange={e => {
                    setArticleEdited({
                      ...articleEdited,
                      title: e.target.value,
                    })
                  }}
                  value={articleEdited.title}
                  maxLength={70}
                />
                <Input
                  placeholder={texts.newArticleForm.labels.subtitlePlaceholder}
                  required
                  value={articleEdited.subtitle}
                  onChange={e => {
                    setArticleEdited({
                      ...articleEdited,
                      subtitle: e.target.value,
                    })
                  }}
                  maxLength={70}
                />
              </HorizontalGroup>
              <HorizontalGroup>
                <Input
                  placeholder="Autor*"
                  className="autor"
                  required
                  value={articleEdited.author}
                  style={{ width: "100%" }}
                  onChange={e => {
                    setArticleEdited({
                      ...articleEdited,
                      author: e.target.value,
                    })
                  }}
                  maxLength={70}
                />
              </HorizontalGroup>
              <FiltersTitle>{texts.newArticleForm.labels.filters}</FiltersTitle>
              <HorizontalGroup>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Región"
                  defaultValue={regionsSelected}
                  onChange={value => {
                    setRegionsSelected(value)
                    const ids: number[] = []
                    value.forEach(item => {
                      const filterItem = regionFilters.filter(
                        region => region.value === item,
                      )
                      if (filterItem.length > 0) {
                        ids.push(filterItem[0].id)
                      }
                    })
                    setArticleEdited({
                      ...articleEdited,
                      regionFilters: ids,
                    })
                  }}
                  options={regionFilters}
                />
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Temática"
                  defaultValue={themesSelected}
                  onChange={value => {
                    setThemesSelected(value)
                    const ids: number[] = []
                    value.forEach(item => {
                      const filterItem = filterList.filter(
                        region => region.value === item,
                      )
                      if (filterItem.length > 0) {
                        ids.push(filterItem[0].id)
                      }
                    })
                    setArticleEdited({
                      ...articleEdited,
                      themeFilters: ids,
                    })
                  }}
                  options={filterList}
                />
              </HorizontalGroup>
              <HorizontalGroup>
                <TextArea
                  className="autor"
                  value={articleEdited.description}
                  rows={2}
                  placeholder={texts.newArticleForm.labels.description}
                  onChange={e =>
                    setArticleEdited({
                      ...articleEdited,
                      description: e.target.value,
                    })
                  }
                  maxLength={190}
                />
              </HorizontalGroup>
              <TextArea
                className="autor"
                rows={8}
                placeholder={texts.newArticleForm.labels.fullArticlePlaceholder}
                onChange={e =>
                  setArticleEdited({
                    ...articleEdited,
                    article: e.target.value,
                  })
                }
                required
                value={articleEdited.article}
                onPressEnter={() => {
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
            }}
          />
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default EditArticleForm
