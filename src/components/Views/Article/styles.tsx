import styled from "styled-components"
import theme from "theme/index"
import { Button } from "components/UI/sharedStyles"

const ArticleCard = styled.div`
  border: 1px solid rgba(70, 105, 149, 0.7);
  border-radius: 18px;

  width: 767px;
  height: 389px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${theme.screenSize.desktop_medium}) {
    width: 600px;
    height: 350px;
  }

  @media (max-width: 1300px) {
    width: 795px;
    height: 441px;
    flex-direction: column-reverse;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 90vw;
    height: 578px;
  }
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 60%;

  .articleHeader {
    padding-top: 41px;
  }

  @media (max-width: ${theme.screenSize.desktop_medium}) {
    .articleHeader {
      padding-top: 20px;
    }
    width: 58%;
  }

  @media (max-width: 1300px) {
    width: 96%;
    align-items: flex-start;
    justify-content: space-evenly;
    padding-left: 4%;
    padding-bottom: 2%;
    height: 45%;

    .articleHeader {
      padding-top: 10px;
    }
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 90%;
    height: 52.5%;

    .articleHeader {
      padding-top: 10px;
    }
  }
`

const CardImageContainer = styled.div`
  width: 40%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 100%;
  }

  @media (max-width: ${theme.screenSize.desktop_medium}) {
    width: 42%;
  }

  @media (max-width: 1300px) {
    width: 100%;
    height: 55%;
    border-radius: 18px 18px 0px 0px;
    align-items: center;

    img {
      width: 100%;
      height: max-content;
    }
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    height: 47.5%;

    img {
      height: 100%;
    }
  }
`

const ArticleTitle = styled.h3`
  width: 390px;
  height: 58px;

  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.ml};
  line-height: 33px;

  color: ${theme.colors.blue_dark};

  @media (max-width: ${theme.screenSize.desktop_medium}) {
    width: 320px;
    font-size: ${theme.fontSizes.m};
    line-height: 30px;
  }

  @media (max-width: 1300px) {
    width: 100%;
    height: fit-content;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: 18px;
    line-height: 25px;
  }
`

const ArticleRegion = styled.span`
  width: 151px;
  height: 18px;
  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.light};
  font-size: ${theme.fontSizes.xs};

  line-height: 18px;

  color: ${theme.colors.blue_dark};
`

const ArticleDescription = styled.p`
  margin: 0;
  width: 390px;
  height: 134px;

  font-family: ${theme.fonts.extra};
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.s};
  line-height: 21px;

  color: ${theme.colors.blue_dark};

  @media (max-width: ${theme.screenSize.desktop_medium}) {
    width: 320px;
  }

  @media (max-width: 1300px) {
    width: 95%;
    height: fit-content;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: 15px;
    line-height: 20px;
    width: 100%;
  }
`

const OpenButton = styled.button`
  ${Button}

  width: fit-content;
  height: 19px;

  text-decoration: underline;
  font-family: ${theme.fonts.content};
  font-style: italic;
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.s};

  line-height: 19px;
  color: ${theme.colors.blue};
  margin-left: 50%;

  @media (max-width: ${theme.screenSize.tablet.width}) {
    padding-top: 20px;
  }

  @media (max-width: 1300px) {
    margin-left: 0;
    align-self: flex-end;
    margin-right: 5%;
    padding-top: 15px;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: ${theme.fontSizes.xs};
  }
`

export {
  ArticleCard,
  ArticleTitle,
  ArticleRegion,
  CardInfo,
  CardImageContainer,
  ArticleDescription,
  OpenButton,
}
