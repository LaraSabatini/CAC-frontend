import styled from "styled-components"
import theme from "theme/index"
import { FlexColumnDiv, TitleStyles } from "theme/styles"

const Card = styled.div`
  ${FlexColumnDiv}
  h3,
  h4,
  p {
    margin: 0;
  }
  background-color: #f2f8ff;
  border: 1px solid #466a957d;
  border-radius: 15px;
  padding: 25px 30px;
  width: 324px;
  gap: 26px;
`

const Title = styled.h3`
  ${TitleStyles}
  font-weight: 600;
  font-size: ${theme.fontSizes.l};
`
const Price = styled.h4`
  ${TitleStyles}
  font-weight: 400;
  font-size: ${theme.fontSizes.l};
`

const Detail = styled.p`
  ${TitleStyles}
  font-weight: 300;
  font-size: ${theme.fontSizes.m};
`

const Description = styled.p`
  font-family: ${theme.fonts.content};
`

const Button = styled.button`
  font-family: ${theme.fonts.titles};
  background-color: ${theme.colors.blue};
  color: #f2f8ff;
  border: none;
  font-weight: 400;
  font-size: ${theme.fontSizes.s};
  padding: 10px 15px;
  border-radius: 10px;
  align-self: flex-end;
  cursor: pointer;
`

export { Card, Title, Price, Detail, Description, Button }
