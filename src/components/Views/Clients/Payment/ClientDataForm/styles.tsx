import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const FormContainer = styled.div`
  background-color: #f5f9ff;
  width: 450px;
  border-radius: 15px;
  padding: 25px 25px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 90%;
  }
`

const Title = styled.h3`
  ${TitleStyles}
  margin: 0;
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.medium};

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: ${theme.fontSizes.s};
  }
`

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 15px;
  flex-wrap: wrap;

  .sub {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  input {
    display: inline;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ErrorMessage = styled.p`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.red};
  font-weight: 500;
  font-size: ${theme.fontSizes.xs};
  margin: 0;
  padding-top: 15px;

  font-weight: ${theme.fontWeights.light};
`

const InputContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export {
  FormContainer,
  Title,
  ButtonContainer,
  HorizontalGroup,
  ErrorMessage,
  InputContainer,
}
