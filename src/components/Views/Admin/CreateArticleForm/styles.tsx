import styled from "styled-components"
import { TitleStyles } from "theme/styles"
import theme from "theme/index"

const Container = styled.div`
  background-color: #f2f8ff;
  width: 70vw;
  max-width: 995px;
  max-height: 670px;
  height: 85vh;
  border-radius: 18px;
  padding: 40px 50px;
`

const Title = styled.h2`
  ${TitleStyles}
  margin: 0;
`

const InputContainer = styled.div`
  padding-top: 43px;
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`

const HorizontalGroup = styled.div`
  display: flex;
  gap: 40px;
`

const FiltersTitle = styled.p`
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.xs};
  line-height: 22px;
  /* identical to box height */

  color: ${theme.colors.blue_dark};
  margin: 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1360px) {
    width: 800px;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
`

const IconButton = styled.button`
  background-color: transparent;
  border: 1px solid #466995;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: ${theme.colors.blue};
  }
`

const WarningMessage = styled.p`
  margin: 0;
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.red};
  position: absolute;
  right: 0;
  top: -25px;
  width: max-content;
`

export {
  Container,
  Title,
  InputContainer,
  HorizontalGroup,
  FiltersTitle,
  ButtonContainer,
  ActionButtons,
  IconButton,
  WarningMessage,
}
