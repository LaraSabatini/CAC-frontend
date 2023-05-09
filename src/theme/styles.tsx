import { createGlobalStyle, css } from "styled-components"
import theme from "./index"

const GlobalStyle = createGlobalStyle`
  body {
          margin: 0px;
          background-color:  #ebf1fa;
          padding-bottom: 50px;

          .background-pricing {
            background-image: url('https://camarafederal.com.ar/software/imgs/Pantalla%20pricing-06.png');
            height: 100vh;
            @media (max-width: 1024px) {
              background-image: url('https://camarafederal.com.ar/software/imgs/pricing%20-%20tablet%20horizontal.png');
              background-position: top;
            }

            @media (max-width: 768px) {
              background-image: url('https://camarafederal.com.ar/software/imgs/pricing%20-%20tablet%20vertical.png');
              background-position: top;
              height: 100vh;
            }

            @media (max-width: 414px) {
              background-image: url('https://camarafederal.com.ar/software/imgs/pricing%20-%20mobile%203.png');
              background-position: top;
              height: 200vh;
            }

            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
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
