import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  width: 30vw;
  height: fit-content;
  margin: 200px auto;
  border-radius: 10px;
  padding: 20px 25px;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.m};
  color: ${theme.colors.blue_dark};
  padding-bottom: 40px;
`

const ButtonContainer = styled.div`
  margin-top: 20px;
  align-self: flex-end;
`

export { Container, Title, ButtonContainer }
