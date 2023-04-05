import styled from "styled-components"
import theme from "theme/index"

const ArticlesContainer = styled.div`
  width: 97vw;
  margin: 0 auto;
  padding-top: 20px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  padding-bottom: 50px;

  @media (max-width: 1450px) {
    gap: 20px;
    /* gap: 0px; */
  }
`

const FullArticle = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding-top: 10px;
`

const Chip = styled.div`
  display: flex;
  align-items: center;

  font-family: ${theme.fonts.titles};
  font-size: 14px;
  gap: 10px;
  padding-bottom: 20px;

  font-weight: 600;

  a {
    margin: 0;
    text-decoration: none;
    color: ${theme.colors.blue_dark};
  }

  span,
  svg {
    color: ${theme.colors.blue};
    font-weight: 200;
  }
`

const EmptyPage = styled.h2`
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue};
  text-align: center;
  padding-top: 20px;
`

export { ArticlesContainer, FullArticle, Chip, EmptyPage }
