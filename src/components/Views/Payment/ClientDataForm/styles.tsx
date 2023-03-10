import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const FormContainer = styled.div`
  background-color: #f2f8ff;
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
  padding-bottom: 10px;

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
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const Error = styled.p`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.red};
  font-weight: 500;
  margin: 0;
  padding-bottom: 15px;
`

export { FormContainer, Title, ButtonContainer, HorizontalGroup, Error }
