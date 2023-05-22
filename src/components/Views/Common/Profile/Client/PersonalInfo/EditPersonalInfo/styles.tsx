import styled from "styled-components"
import theme from "theme/index"

const Form = styled.div``

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  gap: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Error = styled.p`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.red};
  font-weight: 500;
  margin: 0;
  padding-bottom: 15px;
`

const Label = styled.p`
  margin: 0;
  font-family: ${theme.fonts.extra};
  font-size: 14px;
  padding-bottom: 5px;
`

export { Form, HorizontalGroup, ButtonContainer, Error, Label }
