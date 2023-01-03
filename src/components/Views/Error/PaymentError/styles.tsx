import styled from "styled-components"
import { TitleStyles } from "theme/styles"
import theme from "theme/index"

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  ${TitleStyles}
`

const Description = styled.p`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
`

const Button = styled.button`
  background-color: ${theme.colors.blue};
  color: ${theme.colors.white};
  border: 1px solid transparent;
  font-family: ${theme.fonts.titles};
  font-weight: 400;
  font-size: ${theme.fontSizes.xs};
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
`

export { Container, Title, Description, Button }
