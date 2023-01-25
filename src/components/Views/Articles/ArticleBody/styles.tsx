import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  width: 92vw;
  margin: 0 auto;
  display: flex;
  gap: 40px;
`

const LeftContainer = styled.div``

const ArticleTitle = styled.h3`
  width: 730px;

  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.ml};
  line-height: 33px;

  color: ${theme.colors.blue_dark};
`

const ArticleRegion = styled.span`
  width: 151px;
  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.light};
  font-size: ${theme.fontSizes.xs};

  line-height: 18px;

  color: ${theme.colors.blue_dark};
`

const Subtitle = styled.span`
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.ml};

  line-height: 33px;
  color: ${theme.colors.blue};

  margin: 0;
`

const ArticleContainer = styled.div`
  /* width: 550px; */
  padding-top: 27px;
  display: flex;
  gap: 35px;
`

const ArticleParagraph = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.s};
  line-height: 21px;
  color: ${theme.colors.blue_dark};

  width: 500px;
`

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 15px;

  p {
    font-family: ${theme.fonts.content};
    display: flex;
    flex-direction: column;
    font-size: ${theme.fontSizes.m};

    line-height: 24px;

    color: ${theme.colors.blue_dark};

    span {
      font-size: ${theme.fontSizes.xxs};
      line-height: 15px;
      color: ${theme.colors.blue};
    }
  }
`

const RigthContainer = styled.div`
  border: 1px solid #466995;
  width: 550px;
  height: 390px;
  border-radius: 18px;
`

export {
  Container,
  LeftContainer,
  ArticleTitle,
  ArticleRegion,
  Subtitle,
  ArticleContainer,
  ArticleParagraph,
  AuthorContainer,
  RigthContainer,
}
