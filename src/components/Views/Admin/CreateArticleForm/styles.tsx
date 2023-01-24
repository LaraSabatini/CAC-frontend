import styled from "styled-components"
import { TitleStyles } from "theme/styles"
import theme from "theme/index"

const Container = styled.div`
  background-color: #f2f8ff;
  width: 70vw;
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
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
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

  svg {
    width: 20px;
    height: 20px;
  }
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
}
