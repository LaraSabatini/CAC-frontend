import { createGlobalStyle, css } from "styled-components"
import theme from "./index"

const GlobalStyle = createGlobalStyle`
  body {
          margin: 0px;
          /* background-color:  ${theme.colors.light_grey}; */
          background-color:  #d6dfed;
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
  margin: 0;
`

export { GlobalStyle, FlexColumnDiv, TitleStyles }
