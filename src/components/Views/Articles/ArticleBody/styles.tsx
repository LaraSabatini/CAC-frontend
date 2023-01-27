import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const LeftContainer = styled.div`
  width: 890px;
`

const ArticleTitle = styled.h3`
  width: 100%;
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
  display: flex;
  gap: 36px;
  width: 90%;
  padding-top: 27px;
`

const ArticleParagraph = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.s};
  line-height: 21px;
  color: ${theme.colors.blue_dark};
  width: 517px;
`

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 15px;

  p {
    display: flex;
    flex-direction: column;

    font-family: ${theme.fonts.content};
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
  width: 820px;
  height: 513px;
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
