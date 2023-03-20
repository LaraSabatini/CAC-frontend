import styled from "styled-components"
import theme from "theme"

const PageContainer = styled.div`
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue};
  width: 50vw;
  margin: 0 auto;
  padding-top: 200px;

  span {
    font-size: ${theme.fontSizes.s};
    font-weight: ${theme.fontWeights.medium};
    display: block;
  }
`
export default PageContainer
