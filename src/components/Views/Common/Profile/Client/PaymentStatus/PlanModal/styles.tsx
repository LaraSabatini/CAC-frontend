import styled from "styled-components"
import theme from "theme"
import { TitleStyles } from "theme/styles"

const ModalContainer = styled.div`
  background-color: ${theme.colors.white};
  height: fit-content;
  padding: 20px 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;

  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    width: 600px;
  }
`

const ButtonContainer = styled.div`
  margin-top: 5px;
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
