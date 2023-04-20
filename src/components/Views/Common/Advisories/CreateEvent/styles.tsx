import styled from "styled-components"
import theme from "theme"

const Container = styled.div`
  background-color: ${theme.colors.white};
  width: 400px;
  border-radius: 18px;
  padding: 25px;
  display: flex;
  flex-direction: column;

  .input-container {
    padding-top: 20px;
  }

  .horizontal {
    padding-top: 65px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .required {
    color: ${theme.colors.red};
    margin: 0;
    font-family: ${theme.fonts.extra};
    font-size: 12px;
  }
`

const Title = styled.h4`
  margin: 0;
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue_dark};
  padding-bottom: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 15px;
`

export { Container, Title, ButtonContainer }
