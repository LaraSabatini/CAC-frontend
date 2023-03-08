import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  width: 300px;
  padding: 30px 25px 25px 25px;
  border-radius: 10px;

  h3 {
    ${TitleStyles};
    margin: 0;
    padding-left: 15px;
  }

  @media (max-width: ${theme.screenSize.mobile}) {
    margin-left: 20px;
    width: 280px;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 25px 0 25px 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 15px;
`

const Error = styled.p`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.red};
  /* text-align: center; */
  margin: 0;
  padding-top: 20px;
  font-size: ${theme.fontSizes.xs};
`

export { ModalContainer, InputContainer, ButtonContainer, Error }
