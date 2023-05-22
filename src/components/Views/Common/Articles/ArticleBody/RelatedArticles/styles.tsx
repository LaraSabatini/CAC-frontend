import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  margin-top: 50px;
`

const Title = styled.h3`
  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.light};
  font-size: ${theme.fontSizes.ml};
  margin: 0;
  color: ${theme.colors.blue};
`

const Carousel = styled.div`
  margin-top: 21px;
  padding-bottom: 40px;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;

  @media (max-width: 1030px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`

export { Container, Carousel, Title }
