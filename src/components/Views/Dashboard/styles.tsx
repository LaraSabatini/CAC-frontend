import styled from "styled-components"
import theme from "theme/index"

const ArticlesContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FullArticle = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 30px;
  /* display: flex;
  flex-direction: column; */
`

const Chip = styled.div`
  display: flex;
  align-items: center;

  font-family: ${theme.fonts.titles};
  font-size: 14px;
  gap: 10px;
  padding-bottom: 40px;
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
