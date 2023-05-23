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

  border: 1px solid rgba(70, 106, 149, 0.138);
  border-radius: 18px;

  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);
  background-color: #ebf1fa;

  transition: 0.3s;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(70, 106, 149, 0.356);
    box-shadow: 0px 8px 24px rgba(70, 106, 149, 0.248);
  }

  padding: 25px 30px;
  width: 230px;
  gap: 15px;
`

const Title = styled.h3`
  ${TitleStyles}
  font-weight: 600;
  font-size: 23px;
`
const Price = styled.h4`
  ${TitleStyles}
  font-weight: 400;
  font-size: 23px;
`

const Detail = styled.p`
  ${TitleStyles}
  font-weight: 300;
  font-size: 16px;
  font-weight: ${theme.fontWeights.light};

  color: ${theme.colors.blue};

  b {
    font-weight: ${theme.fontWeights.regular};
  }
`

const Description = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: 14px;
`

export { Card, Title, Price, Detail, Description }
