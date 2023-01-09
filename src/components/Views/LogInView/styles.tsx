import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  background-color: #f2f8ff;
  width: 300px;
  height: 300px;
  border-radius: 15px;
  padding: 30px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h4`
  ${TitleStyles}
  margin: 0;
  font-weight: ${theme.fontWeights.medium};
`

const InputContainer = styled.div`
  /* margin-top: 50px; */
`

const URLContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: ${theme.fonts.extra};
  font-style: italic;
  font-weight: 400;
  font-size: 12px;

  a {
    text-decoration: none;
    color: ${theme.colors.blue};
  }
`

export { Container, Title, InputContainer, URLContainer }
