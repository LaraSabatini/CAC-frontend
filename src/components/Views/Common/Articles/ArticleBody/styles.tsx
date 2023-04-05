import styled from "styled-components"
import theme from "theme/index"
import { Button } from "components/UI/sharedStyles"

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 80%;

  .articleHeader {
    width: 100%;

    display: flex;
    flex-direction: column;
  }
`

const LeftContainer = styled.div``

const ArticleTitle = styled.h3`
  width: 100%;
  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.ml};
  line-height: 33px;

  color: ${theme.colors.blue_dark};
`

const ArticleRegion = styled.div`
  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.light};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.blue};

  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

const Subtitle = styled.span`
  font-family: ${theme.fonts.titles};
  font-size: 18px;
  font-weight: ${theme.fontWeights.light};
  line-height: 25px;
  color: ${theme.colors.blue};
  margin: 10px 0 0 0;
  width: 90%;
  display: block;
`

const ArticleContainer = styled.div`
  display: flex;
  gap: 18px;
  width: 97%;
`

const ArticleParagraph = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.s};
  line-height: 21px;
  color: ${theme.colors.blue_dark};
  margin: 0;
  padding-bottom: 5px;
  text-align: justify;
`

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 1170px;

  height: 863px;

  align-self: center;
  padding-top: 20px;
  display: flex;
  margin-left: -40px;
`

const RightSubcolumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Buttons = styled.div`
  display: flex;
  gap: 20px;

  svg {
    color: ${theme.colors.white};
  }

  button {
    ${Button}
    width: 35px;
    height: 35px;
    border-radius: 4px;
  }

  .edit {
    background-color: ${theme.colors.blue};

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .delete {
    background-color: ${theme.colors.red};

    svg {
      width: 15px;
      height: 15px;
    }
  }
`

const Description = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.s};
  line-height: 21px;
  color: ${theme.colors.blue_dark};
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
  RightSubcolumn,
  Buttons,
  ArticleContent,
  Description,
}
