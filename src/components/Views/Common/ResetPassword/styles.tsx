import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Form = styled.div`
  background-color: #f2f8ff;
  width: 230px;
  border-radius: 15px;
  padding: 30px 35px;
  margin: 100px auto;
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 260px;
  }
`

const Title = styled.h4`
  ${TitleStyles}
  margin: 0;
  font-weight: ${theme.fontWeights.medium};
  padding-bottom: 20px;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: flex-start;
  gap: 5px;

  margin: 0 auto;
  padding-top: 10%;

  svg {
    width: 50px;
    height: 50px;
    padding-bottom: 10px;

    path {
      stroke: ${theme.colors.blue};
      stroke-width: 1.5;
    }
  }
`

const Description = styled.p`
  margin: 0;
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
  padding-bottom: 10px;
`

const MessageTitle = styled.h2`
  ${TitleStyles}
  margin: 0;
  font-weight: ${theme.fontWeights.medium};
  padding-bottom: 10px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-bottom: 30px;
`

export {
  Form,
  Title,
  MessageContainer,
  Description,
  MessageTitle,
  InputContainer,
}
