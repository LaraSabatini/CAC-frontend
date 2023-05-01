import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
  padding-top: 5%;

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
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    width: 50px;
    height: 50px;
  }
`

const SubTitle = styled.span`
  font-family: ${theme.fonts.extra};
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.blue};
  margin-left: 60px;
`

const CardsContainer = styled.div`
  margin-top: 120px;
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
