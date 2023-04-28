import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
  padding-top: 9%;

  @media (max-width: ${theme.screenSize.tablet.height}) {
    padding-top: 3%;
    gap: 5%;
  }
`

const Title = styled.h1`
  ${TitleStyles}
  font-size: 30px;
  font-weight: 700;
  margin: 0;
  padding-bottom: 10px;
`

const SubTitle = styled.span`
  font-family: ${theme.fonts.extra};
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.blue};
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
