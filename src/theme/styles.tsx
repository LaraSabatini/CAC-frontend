import { createGlobalStyle, css } from "styled-components"
import theme from "./index"

const GlobalStyle = createGlobalStyle`
  body {
          margin: 0px;
          background-color:  #ebf1fa;
          padding-bottom: 50px;

          .background-pricing {

            background-image: url('https://camarafederal.com.ar/software/imgs/Pantalla%20login-04%20%281%29.png');

            background-repeat: no-repeat;
            background-position: center;
            height: 100vh;
            background-size: cover;
            overflow: hidden; 
          }
          
          /* Hide scrollbar for Chrome, Safari and Opera */
          ::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
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
