import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.white};
  width: 350px;
  padding: 25px;
  border-radius: 10px;

  h3 {
    ${TitleStyles}
    text-align: center;
    padding-bottom: 20px;
  }

  span {
    font-family: ${theme.fonts.extra};
    font-size: 12px;
    color: ${theme.colors.blue};
    padding-bottom: 20px;
    padding-left: 5px;
  }
`

const IconContainer = styled.div`
  background-color: ${theme.colors.yellow};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 50%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 30px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const ErrorMessage = styled.p`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.red};
  text-align: center;
  margin: 0;
  font-size: ${theme.fontSizes.xs};
`

const FeedbackForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-self: flex-start;
  padding-left: 20px;
`

const RadioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.blue};
`

export {
  ModalContainer,
  IconContainer,
  ButtonContainer,
  InputContainer,
  ErrorMessage,
  FeedbackForm,
  RadioButton,
}
