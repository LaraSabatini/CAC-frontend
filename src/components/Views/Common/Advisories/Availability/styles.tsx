import styled from "styled-components"
import theme from "theme"

const Container = styled.div`
  background-color: ${theme.colors.white};
  width: 500px;
  /* height: 200px; */
  padding: 25px;
  border-radius: 18px;
`

const Title = styled.h4`
  margin: 0;
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue_dark};
  padding-bottom: 15px;
`

const SelectionContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const Option = styled.p`
  font-family: ${theme.fonts.extra};
  color: ${theme.colors.blue_dark};

  padding-bottom: 5px;
`

export { Container, Title, SelectionContainer, Option }
