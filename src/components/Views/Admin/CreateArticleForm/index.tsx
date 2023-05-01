import React, { useContext, useState } from "react"
import texts from "strings/articles.json"
import { DashboardContext } from "contexts/Dashboard"
import { ArticlesContext } from "contexts/Articles"
import regionFilters from "const/regions"
import Modal from "components/UI/Modal"
import { Input, Select } from "antd"
import { filterList } from "const/filters"
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
  const { setTriggerArticleListUpdate, triggerArticleListUpdate } = useContext(
    DashboardContext,
  )

  const { newArticle, setNewArticle, previsualize } = useContext(
    ArticlesContext,
  )

  const [regionsSelected, setRegionsSelected] = useState<string[]>()
  const [themesSelected, setThemesSelected] = useState<string[]>()

  const { TextArea } = Input

  return (
    <Modal>
      <Container>
        {!previsualize ? (
          <>
            <Title>{texts.newArticleForm.title}</Title>
            <InputContainer>
              <HorizontalGroup>
                <Input
                  placeholder={texts.newArticleForm.labels.titlePlaceholder}
                  required
                  onChange={e => {
                    setNewArticle({ ...newArticle, title: e.target.value })
                  }}
                  value={newArticle.title}
                  maxLength={70}
                />
                <Input
                  placeholder={texts.newArticleForm.labels.subtitlePlaceholder}
                  required
                  value={newArticle.subtitle}
                  onChange={e => {
                    setNewArticle({ ...newArticle, subtitle: e.target.value })
                  }}
                  maxLength={70}
                />
              </HorizontalGroup>
              <HorizontalGroup>
                <Input
                  placeholder="Autor*"
                  required
                  value={newArticle.author}
                  style={{ width: 475 }}
                  onChange={e => {
                    setNewArticle({ ...newArticle, author: e.target.value })
                  }}
                  maxLength={70}
                />
              </HorizontalGroup>
              <FiltersTitle>{texts.newArticleForm.labels.filters}</FiltersTitle>
              <HorizontalGroup>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: 475 }}
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
                    setNewArticle({
                      ...newArticle,
                      regionFilters: ids,
                    })
                  }}
                  options={regionFilters}
                />
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: 475 }}
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
                    setNewArticle({
                      ...newArticle,
                      themeFilters: ids,
                    })
                  }}
                  options={filterList}
                />
              </HorizontalGroup>
              <HorizontalGroup>
                <TextArea
                  value={newArticle.description}
                  rows={2}
                  placeholder={texts.newArticleForm.labels.description}
                  onChange={e =>
                    setNewArticle({
                      ...newArticle,
                      description: e.target.value,
                    })
                  }
                  maxLength={190}
                />
              </HorizontalGroup>
              <TextArea
                rows={12}
                placeholder={texts.newArticleForm.labels.fullArticlePlaceholder}
                onChange={e =>
                  setNewArticle({ ...newArticle, article: e.target.value })
                }
                required
                value={newArticle.article}
                onPressEnter={() => {
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
