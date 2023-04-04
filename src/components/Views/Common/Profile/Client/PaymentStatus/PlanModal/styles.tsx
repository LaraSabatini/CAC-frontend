import styled from "styled-components"
import theme from "theme"
import { TitleStyles } from "theme/styles"

const ModalContainer = styled.div`
  background-color: ${theme.colors.white};
  width: 65vw;
  height: 50vh;
  padding: 20px 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CardContainer = styled.div`
  /* border: 1px solid green; */
  display: flex;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h5`
  margin: 0;
  ${TitleStyles}
  font-size: 25px;
  font-weight: 800;
  margin: 0;
  padding-bottom: 10px;
`

const UpdatePaymentButton = styled.button`
  background-color: #009ee3;
  border: none;
  border-radius: 4px;
  color: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875em;
  padding: 0 1.7142857142857142em;
  cursor: pointer;
`

export {
  ModalContainer,
  CardContainer,
  ButtonContainer,
  Title,
  UpdatePaymentButton,
}
