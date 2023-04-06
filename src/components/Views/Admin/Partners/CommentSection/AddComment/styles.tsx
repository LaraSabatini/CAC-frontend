import styled from "styled-components"
import theme from "theme"

const Container = styled.div`
  background-color: ${theme.colors.white};
  padding: 25px;
  width: 300px;
  height: 310px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`

export { Container, ButtonContainer }
