import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
  padding-top: 8.3%;
  position: relative;

  @media (max-width: 1366px) {
    padding-top: 11%;
  }
`

const LogoContainer = styled.div`
  width: 70px;
  height: 70px;

  svg {
    width: 70px;
    height: 70px;
  }
`

const Title = styled.h1`
  ${TitleStyles}
  color: white;
  font-size: 30px;

  font-weight: 700;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SubTitle = styled.span`
  font-family: ${theme.fonts.extra};
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.blue};
  color: white;
`

const CardsContainer = styled.div`
  margin-top: 120px;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  gap: 45px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    margin-top: 40px;
  }
`

export { Container, Title, CardsContainer, SubTitle, LogoContainer }
