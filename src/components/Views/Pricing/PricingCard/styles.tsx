import styled from "styled-components"
import theme from "theme/index"
import { FlexColumnDiv, TitleStyles } from "theme/styles"

const Card = styled.div`
  ${FlexColumnDiv}
  h3,
  h4,
  p {
    margin: 0;
  }
  background-color: #f2f8ff;
  border: 1px solid #466a957d;
  border-radius: 15px;
  padding: 25px 30px;
  width: 100%;
  gap: 26px;

  @media (max-width: ${theme.screenSize.tablet.height}) {
    width: 40%;
  }

  @media (max-width: ${theme.screenSize.transition}) {
    width: 35%;
  }

  @media (max-width: ${theme.screenSize.transition}) {
    width: 260px;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 100%;
  }
`

const Title = styled.h3`
  ${TitleStyles}
  font-weight: 600;
  font-size: ${theme.fontSizes.l};

  @media (max-width: ${theme.screenSize.desktop_medium}) {
    font-size: 25px;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: 20px;
  }
`
const Price = styled.h4`
  ${TitleStyles}
  font-weight: 400;
  font-size: ${theme.fontSizes.l};

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: 25px;
  }
`

const Detail = styled.p`
  ${TitleStyles}
  font-weight: 300;
  font-size: ${theme.fontSizes.m};

  @media (max-width: ${theme.screenSize.mobile}) {
    font-size: 16px;
  }
`

const Description = styled.p`
  font-family: ${theme.fonts.content};
  /* width: 300px; */
`

const Button = styled.button`
  font-family: ${theme.fonts.titles};
  background-color: ${theme.colors.blue};
  color: #f2f8ff;
  border: none;
  font-weight: 400;
  font-size: ${theme.fontSizes.s};
  padding: 10px 15px;
  border-radius: 10px;
  align-self: flex-end;
  cursor: pointer;
`

export { Card, Title, Price, Detail, Description, Button }
