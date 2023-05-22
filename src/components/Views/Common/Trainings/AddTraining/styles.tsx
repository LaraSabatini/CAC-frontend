import styled from "styled-components"
import theme from "theme"

const Container = styled.div`
  width: 475px;
  border-radius: 18px;
  padding: 25px;

  h3 {
    margin: 0;
    font-family: ${theme.fonts.titles};
    color: ${theme.colors.blue_dark};
  }

  display: flex;
  flex-direction: column;
`

const InputContainer = styled.div`
  .required-error {
    margin: 0;
    color: ${theme.colors.red};
    font-family: ${theme.fonts.extra};
    font-weight: ${theme.fontWeights.medium};
    font-size: 12px;
    padding-bottom: 10px;
  }

  .sub-container {
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
  }
`

const ButtonContainer = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 20px;
`

export { Container, ButtonContainer, InputContainer }
