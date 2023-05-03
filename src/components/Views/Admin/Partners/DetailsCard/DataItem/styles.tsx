import styled from "styled-components"
import theme from "theme/index"

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    font-family: ${theme.fonts.extra};
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.xs};
  }

  .value {
    color: rgba(70, 105, 149, 0.6);
  }

  .content {
    color: ${theme.colors.blue};
  }
`
export default Item
