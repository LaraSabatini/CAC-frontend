import styled from "styled-components"
import theme from "theme/index"
import { Button } from "components/UI/sharedStyles"

const ArticleCard = styled.div`
  border: 1px solid rgba(70, 106, 149, 0.138);
  border-radius: 18px;

  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);

  transition: 0.3s;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(70, 106, 149, 0.356);
    box-shadow: 0px 8px 24px rgba(70, 106, 149, 0.248);
  }

  padding: 5px 25px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 600px;
  height: 320px;

  /* 
  @media (max-width: 1300px) {
    width: 795px;
    height: 441px;
    flex-direction: column-reverse;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 90vw;
    height: 578px;
  } */
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;

  height: 90%;

  @media (max-width: 1450px) {
    width: 49%;
    justify-content: space-between;

    .articleHeader {
      height: 112px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  /* @media (max-width: 1300px) {
    width: 96%;
    align-items: flex-start;
    justify-content: space-evenly;
    padding-left: 4%;
    padding-bottom: 2%;
    height: 45%;

    .articleHeader {
      padding-top: 10px;
    }
  } */

  /* @media (max-width: ${theme.screenSize.mobile}) {
    width: 90%;
    height: 52.5%;

    .articleHeader {
      padding-top: 10px;
    }
  } */
`

const CardImageContainer = styled.div`
  width: 45%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0px 18px 18px 0;
  height: 90%;

  img {
    height: 100%;
  }

  /* @media (max-width: 1450px) {
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
  } */
`

const ArticleTitle = styled.h3`
  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.ml};
  line-height: 33px;

  color: ${theme.colors.blue_dark};

  @media (max-width: 1450px) {
    font-size: 20px;
    line-height: 28px;
  }

  /* 
  @media (max-width: 1450px) {
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
  } */
`

const ArticleRegion = styled.span`
  margin: 0;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.light};
  font-size: ${theme.fontSizes.xs};

  color: ${theme.colors.blue_dark};

  display: flex;
  align-items: center;
  gap: 5px;

  color: #466995;
`

const ArticleDescription = styled.p`
  margin: 0;

  font-family: ${theme.fonts.extra};
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.s};

  text-align: justify;

  color: ${theme.colors.blue_dark};

  @media (max-width: 1450px) {
    height: 105px;
  }
  /*
  @media (max-width: 1300px) {
    width: 95%;
    height: fit-content;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: 15px;
    line-height: 20px;
    width: 100%;
  } */
`

const OpenButton = styled.button`
  ${Button}

  width: fit-content;
  height: 20px;

  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.light};
  font-size: ${theme.fontSizes.m};

  display: flex;
  align-items: center;
  gap: 10px;

  position: relative;

  color: ${theme.colors.blue};

  /*  
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
  }  */
`

const ButtonContainer = styled.div`
  justify-content: space-between;

  width: 100%;

  display: flex;
  align-items: center;

  color: ${theme.colors.blue};

  .saved-times {
    font-family: ${theme.fonts.extra};
    font-size: 14px;
  }

  .buttons,
  .saved-times {
    display: flex;
    align-items: center;
    gap: 5px;
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
  ButtonContainer,
}
