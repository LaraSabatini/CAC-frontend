import styled, { css } from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"
import { Button } from "components/UI/sharedStyles"

const AttachmentsList = styled.div`
  width: 500px;
  padding: 25px;
  background-color: ${theme.colors.white};
  border-radius: 18px;
`

const Title = styled.h4`
  ${TitleStyles}
`

const AttachmentsListHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;

  svg {
    color: ${theme.colors.blue};
    width: 20px;
    height: 20px;
  }
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`

const Item = styled.div`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.xs};
  border: 1px solid ${theme.colors.blue_alpha};
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`

const DeleteItemButton = styled.button`
  ${Button}
  svg {
    width: 15px;
    height: 15px;
    color: ${theme.colors.blue};
  }
`

const CloseAttachmentsListButton = styled.button`
  ${Button}
`

const VideoModal = styled.div`
  width: 300px;
  padding: 25px;
  background-color: ${theme.colors.white};
  border-radius: 18px;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const AddVideoButton = styled.button`
  ${Button}

  svg {
    color: ${theme.colors.blue};
    width: 30px;
    height: 30px;
  }
`

const PortraitTag = styled.p<{ active: boolean }>`
  margin: 0;
  background-color: ${theme.colors.white};
  color: ${theme.colors.blue_dark};
  border: 1px solid ${theme.colors.blue_dark};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;

  ${props =>
    props.active &&
    css`
      background-color: ${theme.colors.blue_dark};
      color: ${theme.colors.white};
    `}
`

export {
  AttachmentsList,
  Title,
  Item,
  ItemContainer,
  AttachmentsListHead,
  DeleteItemButton,
  CloseAttachmentsListButton,
  VideoModal,
  InputContainer,
  AddVideoButton,
  PortraitTag,
}
