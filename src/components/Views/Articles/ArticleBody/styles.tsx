import styled from "styled-components"
import theme from "theme/index"
import { Button } from "components/UI/sharedStyles"

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  gap: 18px;
  width: 97%;
  padding-top: 27px;
`

const ArticleParagraph = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.s};
  line-height: 21px;
  color: ${theme.colors.blue_dark};
  width: 540px;
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
  width: 670px;
  height: 363px;
  /* margin-top: -57px; */
`

const RightSubcolumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
}
