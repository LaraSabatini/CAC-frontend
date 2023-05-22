import styled from "styled-components"
import theme from "theme/index"

const Notification = styled.div`
  width: 600px;
  margin: 10% auto;

  h1 {
    font-family: ${theme.fonts.titles};
    display: flex;
    align-items: center;
    color: ${theme.colors.blue_dark};
    gap: 20px;
  }

  span {
    display: block;
    font-family: ${theme.fonts.extra};
    color: ${theme.colors.blue_dark};
    margin-bottom: 10px;
    margin-left: 50px;
  }

  .description {
    color: ${theme.colors.blue};
  }
`

export default Notification
