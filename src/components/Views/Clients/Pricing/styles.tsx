import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
  padding-top: 5%;
  position: relative;

  @media (max-width: ${theme.screenSize.tablet.height}) {
    padding-top: 3%;
    gap: 5%;
  }
`

// const Miscelaneous = styled.div`
//   position: absolute;
//   z-index: 5 !important;
//   right: 0px;
//   top: 0;
//   right: -72px;
//   width: 111%;
//   height: 100%;
//   .line {
//     margin-left: 1035px;
//     margin-top: 20px;
//     width: 400px;
//     height: 20px;
//     display: flex;

//     .blue {
//       width: 90px;
//       background-color: #466995;
//     }

//     .green {
//       width: 90px;
//       background-color: #2c8c89;
//     }

//     .light-green {
//       width: 220px;
//       background-color: #a9d3cf;
//     }
//   }

//   .squares {
//     .square-1 {
//       margin-top: 400px;
//       margin-left: 0px;

//       width: 50%;
//       /* height: 1px; */
//       border-top: 1px dashed black;
//     }
//     .square-2 {
//       /* margin-top: 200px; */
//       margin-left: 43%;
//       margin-top: 2px;

//       height: 345px;
//       width: 100px;
//       /* height: 1px; */
//       border-right: 1px dashed black;
//     }
//   }
// `

const Title = styled.h1`
  ${TitleStyles}
  font-size: 30px;
  font-weight: 700;
  margin: 0;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    width: 50px;
    height: 50px;
  }
`

const SubTitle = styled.span`
  font-family: ${theme.fonts.extra};
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.blue};
  margin-left: 60px;
`

const CardsContainer = styled.div`
  margin-top: 120px;
  display: flex;
  gap: 1.6%;
  @media (max-width: ${theme.screenSize.tablet.height}) {
    flex-wrap: wrap;
    gap: 30px;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    gap: 10px;
  }
`

export { Container, Title, CardsContainer, SubTitle }
