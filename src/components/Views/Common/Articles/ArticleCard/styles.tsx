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

  width: 550px;
  height: 320px;

  @media (max-width: 1366px) {
    width: 45%;
  }

  @media (max-width: 1274px) {
    width: 70%;
  }
  @media (max-width: 1024px) {
    height: 400px;
  }

  @media (max-width: 768px) {
    height: 540px;
    width: 80%;
    flex-direction: column-reverse;
    padding: 0px 0px 15px 0px;
    gap: 15px;
  }

  @media (max-width: 414px) {
    width: 90%;
    height: 450px;
  }
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 90%;
  width: 50%;

  @media (max-width: 1024px) {
    width: 40%;
  }

  @media (max-width: 768px) {
    height: 45%;
    width: 90%;
  }

  @media (max-width: 414px) {
    width: 92%;
  }
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

  @media (max-width: 1024px) {
    width: 55%;
  }

  @media (max-width: 768px) {
    border-radius: 18px 18px 0px 0;
    width: 100%;

    img {
      width: 100%;
    }
  }
`

const ArticleTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-family: ${theme.fonts.titles};
  font-weight: ${theme.fontWeights.semiBold};

  color: ${theme.colors.blue_dark};

  @media (max-width: 1024px) {
    line-height: 30px;
  }

  @media (max-width: 414px) {
    font-size: 16px;
    line-height: 20px;
  }
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

  padding-bottom: 5px;

  @media (max-width: 414px) {
    font-size: 14px;
    padding-bottom: 10px;
  }
`

const ArticleDescription = styled.p`
  margin: 0;

  font-family: ${theme.fonts.extra};
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.s};

  text-align: justify;

  color: ${theme.colors.blue_dark};

  @media (max-width: 414px) {
    font-size: 14px;
    padding: 10px 0;
  }
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
