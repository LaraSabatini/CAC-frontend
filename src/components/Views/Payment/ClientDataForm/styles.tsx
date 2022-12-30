import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const FormContainer = styled.div`
  background-color: #f2f8ff;
  width: 410px;
  border-radius: 15px;
  padding: 25px 25px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  ${TitleStyles}
  margin: 0;
  font-size: ${theme.fontSizes.m};
  padding-bottom: 20px;
`

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 15px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    font-family: ${theme.fonts.titles};
    font-weight: 400;
    font-size: ${theme.fontSizes.xs};
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
`

const ContinueButton = styled.button`
  background-color: ${theme.colors.blue};
  color: ${theme.colors.white};
  border: 1px solid transparent;
`

const CancelButton = styled.button`
  background-color: ${theme.colors.white};
  color: ${theme.colors.blue};
  border: 1px solid ${theme.colors.blue};
`

export {
  FormContainer,
  Title,
  ButtonContainer,
  ContinueButton,
  CancelButton,
  HorizontalGroup,
}
