import styled from "styled-components"
import theme from "theme/index"

const Form = styled.div``

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: ${theme.screenSize.mobile}) {
    flex-wrap: wrap;
  }
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

export { Form, HorizontalGroup, ButtonContainer, Error }
