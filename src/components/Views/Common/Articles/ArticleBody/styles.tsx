import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div<{ inModal: boolean }>`
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

  ${props =>
    props.inModal &&
    css`
      width: 100%;
      height: 500px;
      overflow: auto;
    `}

  @media (max-width: 1030px) {
    width: 100%;
  }

  @media (max-width: 414px) {
    margin-left: 5px;
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

  @media (max-width: 414px) {
    font-size: 20px;
    line-height: 20px;
  }
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

  @media (max-width: 414px) {
    font-size: 16px;
    line-height: 20px;
  }
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

  p {
    margin: 0;
  }
`

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;

  @media (max-width: 414px) {
    width: 90%;
    padding: 0 15px;
    align-items: center;
    justify-content: center;
  }
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

  @media (max-width: 414px) {
    margin-left: 10px;
  }
`

const RigthContainer = styled.div`
  width: 1170px;
  height: fit-content;

  align-self: center;
  padding-top: 20px;
  display: flex;
  margin-left: -40px;

  @media (max-width: 1030px) {
    margin-left: 0px;
    width: 870px;
  }

  @media (max-width: 770px) {
    margin-left: 0px;
    width: 740px;
  }

  @media (max-width: 414px) {
    flex-wrap: wrap;
    width: 400px;
    height: fit-content;
  }

  @media (max-width: 390px) {
    width: 370px;
  }

  @media (max-width: 360px) {
    width: 340px;
  }
`

const RightSubcolumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`

const Description = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.s};
  line-height: 21px;
  color: ${theme.colors.blue_dark};
`

const ProfilePicContainer = styled.div<{ bg: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
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
  ProfilePicContainer,
}
