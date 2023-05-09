import styled from "styled-components"
import theme from "theme"

const Card = styled.div`
  border: 1px solid ${theme.colors.blue_alpha};
  width: 180px;
  padding: 15px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  .title,
  .price {
    font-family: ${theme.fonts.titles};
    margin: 0;
    color: ${theme.colors.blue_dark};
  }

  .price {
    font-weight: ${theme.fontWeights.semiBold};
    padding-bottom: 10px;
  }

  .description {
    font-family: ${theme.fonts.extra};
    margin: 0;
    color: ${theme.colors.blue_dark};
    font-size: 14px;
    padding-bottom: 15px;
  }

  .detail {
    margin: 0;
    font-family: ${theme.fonts.extra};
    font-weight: 300;
    font-size: 14px;
    padding-bottom: 10px;
  }
`
export default Card
