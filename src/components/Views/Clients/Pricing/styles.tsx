import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
  padding-top: 8.3%;
  position: relative;

  @media (max-width: 1366px) {
    padding-top: 11%;
  }

  @media (max-width: 1024px) {
    padding-top: 50px;
  }

  @media (max-width: 768px) {
    padding-top: 30px;
  }

  @media (max-width: 414px) {
    padding-top: 15px;
  }
`

const LogoContainer = styled.div`
  width: 70px;
  height: 70px;

  svg {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 414px) {
    width: 30px;
    height: 30px;

    svg {
      width: 30px;
      height: 30px;
    }
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

  @media (max-width: 768px) {
    font-size: 25px;
  }

  @media (max-width: 414px) {
    font-size: 20px;
    gap: 0px;
  }
`

const SubTitle = styled.span`
  font-family: ${theme.fonts.extra};
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.blue};
  color: white;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 414px) {
    font-size: 14px;
  }
`

const CardsContainer = styled.div`
  margin-top: 100px;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    margin-top: 60px;
  }

  @media (max-width: 768px) {
    margin-top: 40px;
    gap: 30px;
  }

  @media (max-width: 414px) {
    justify-content: flex-start;
  }
`

export { Container, Title, CardsContainer, SubTitle, LogoContainer }
