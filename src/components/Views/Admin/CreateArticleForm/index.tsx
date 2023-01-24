import React, { useState } from "react"
import { AiOutlinePaperClip } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import ArticleInterface from "interfaces/content/Article"
import defaultArticle from "const/defaultArticle"
import Modal from "components/UI/Modal"
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import Button from "components/UI/Button"
import {
  Container,
  Title,
  InputContainer,
  HorizontalGroup,
  FiltersTitle,
  ButtonContainer,
  ActionButtons,
  IconButton,
} from "./styles"

interface CreateArticleFormInterface {
  closeForm: (arg?: any) => void
}

function CreateArticleForm({ closeForm }: CreateArticleFormInterface) {
  const [previsualize, setPrevisualize] = useState<boolean>(false)
  const [newArticle, setNewArticle] = useState<ArticleInterface>(defaultArticle)

  const regionOptions = [
    {
      id: 0,
      value: "Region",
    },
    {
      id: 1,
      value: "Ciudad de Buenos Aires",
    },
  ]

  const themeOptions = [
    {
      id: 0,
      value: "Tematica",
    },
  ]

  const publishArticle = () => {}

  return (
    <Modal>
      <Container>
        <Title>Nueva publicación</Title>
        <InputContainer>
          <HorizontalGroup>
            <Input
              label="Titulo"
              required
              type="text"
              placeholder="Titulo de la publicación"
              width={500}
              onChange={e =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
            <Input
              label="Subtitulo"
              required
              type="text"
              placeholder="Subtitulo de la publicación"
              width={500}
              onChange={e =>
                setNewArticle({ ...newArticle, subtitle: e.target.value })
              }
            />
          </HorizontalGroup>
          <FiltersTitle>Filtros</FiltersTitle>
          <HorizontalGroup>
            <InputSelect label="" options={regionOptions} width={243} />
            <InputSelect label="" options={themeOptions} width={243} />
          </HorizontalGroup>
          <Input
            label="Descripcion"
            required
            type="text"
            placeholder="Resumen de la publicación"
            width={1010}
            max={240}
          />
          <Input
            label="Texto completo"
            required
            type="textarea"
            width={995}
            height={280}
            placeholder="Texto de la publicación"
          />
        </InputContainer>
        <ButtonContainer>
          <ActionButtons>
            <Tooltip title="Adjuntar archivo">
              <IconButton>
                <AiOutlinePaperClip />
              </IconButton>
            </Tooltip>
            <Tooltip title="Adjuntar imagen">
              <IconButton>
                <Icon icon="IconImage" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Adjuntar video">
              <IconButton>
                <BsFillPlayFill />
              </IconButton>
            </Tooltip>
          </ActionButtons>
          <ActionButtons>
            <Button content="Descartar" cta={false} action={closeForm} />
            <Button
              content={!previsualize ? "Previsualizar" : "Editar"}
              cta={false}
              action={() => setPrevisualize(!previsualize)}
            />
            <Button content="Publicar" cta action={publishArticle} />
          </ActionButtons>
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default CreateArticleForm
