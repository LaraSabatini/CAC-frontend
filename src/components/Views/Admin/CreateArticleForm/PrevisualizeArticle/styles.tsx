import styled from "styled-components"
import theme from "theme/index"
import {Button} from 'components/UI/sharedStyles'

const Container = styled.div``

const Content = styled.div`
  height: 570px;
  display: flex;
  align-items: center;
  justify-content: center;

  .bebe {
    /* background-color: red; */
    font-family: ${theme.fonts.content};
    font-size: 14px;

    .sc-iBYQkv {
      display: none;
    }

    #arrow_left {
      display: none;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
`

const Previewer = styled.div`
  width: 700px;
  height: 500px;
  background-color: ${theme.colors.blue_alpha};
  display: flex;
  border-radius: 18px;
`

const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 2.5%;
  width: 95%;

  button {
    ${Button}
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${theme.colors.white};
  }
`

const PreviewContent = styled.div`
  position: relative; 
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 500px;
    border-radius: 18px;
  }
`


export { PreviewContent, Container, ButtonContainer, Content, Previewer, ArrowContainer, }
