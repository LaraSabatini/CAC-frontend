import { createGlobalStyle, css } from "styled-components"
import theme from "./index"

const GlobalStyle = createGlobalStyle`
  body {
          margin: 0px;
          padding: 0px;
          background-color:  ${theme.colors.light_grey};
        }
`

const FlexColumnDiv = () => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const TitleStyles = () => css`
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue_dark};
`

export { GlobalStyle, FlexColumnDiv, TitleStyles }
