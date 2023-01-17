import styled from "styled-components"
import theme from "theme/index"
import { FlexColumnDiv, TitleStyles } from "theme/styles"

const Container = styled.div`
  ${FlexColumnDiv}
  width: 90%;
  height: 80vh;
  margin: 0 auto;
  gap: 15%;
  padding-top: 9%;

  @media (max-width: ${theme.screenSize.tablet.height}) {
    padding-top: 3%;
    gap: 5%;
  }
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
  gap: 1.6%;
  @media (max-width: ${theme.screenSize.tablet.height}) {
    flex-wrap: wrap;
    gap: 30px;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    gap: 10px;
  }
`

export { Container, Title, CardsContainer, SubTitle }
