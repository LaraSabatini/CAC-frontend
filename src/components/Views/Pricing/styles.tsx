import styled from "styled-components"
import theme from "theme/index"
import { FlexColumnDiv, TitleStyles } from "theme/styles"

const Container = styled.div`
  ${FlexColumnDiv}
  width: 90%;
  height: 80vh;
  margin: 0 auto;
  gap: 100px;
  padding-top: 150px;
`

const Title = styled.h1`
  ${TitleStyles}
  font-size: ${theme.fontSizes.xl};
  font-weight: 800;
  margin: 0;
  padding-bottom: 10px;
`

const SubTitle = styled.span`
  font-family: ${theme.fonts.content};
  font-weight: 400;
  font-size: ${theme.fontSizes.m};
  color: ${theme.colors.blue_dark};
`

const CardsContainer = styled.div`
  display: flex;
  gap: 36px;
`

export { Container, Title, CardsContainer, SubTitle }
