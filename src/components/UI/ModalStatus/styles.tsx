import styled, { css } from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const ModalContainer = styled.div`
  background-color: #f2f8ff;
  width: 350px;
  border-radius: 10px;
  margin: 100px 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h3`
  ${TitleStyles}
  margin: 0;
  padding-top: 15px;
  text-align: center;
`

const Description = styled.p`
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.s};
  color: ${theme.colors.blue};
  text-align: center;
  font-weight: 200;
`

const SelfCloseButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  cursor: pointer;
`

const StatusIconContainer = styled.div<{
  status: "error" | "success" | "warning" | "notice"
}>`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  align-self: center;

  ${props =>
    props.status === "error" &&
    css`
      background-color: #c1292989;
    `}

  ${props =>
    props.status === "success" &&
    css`
      background-color: ${theme.colors.green_light};
    `}

    ${props =>
    props.status === "warning" &&
    css`
      background-color: ${theme.colors.yellow};
    `}
    ${props =>
    props.status === "notice" &&
    css`
      background-color: ${theme.colors.blue};
    `}
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  width: 100%;
`

export {
  ModalContainer,
  Title,
  SelfCloseButton,
  StatusIconContainer,
  Description,
  ButtonContainer,
}
