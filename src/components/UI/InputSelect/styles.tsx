import styled, { css } from "styled-components"
import theme from "theme/index"

const TextStyled = () => css`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
`

const Button = () => css`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const InputContainer = styled.div<{ width?: number }>`
  ${TextStyled}
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  /* border: 1px solid red; */
`

const Label = styled.label``

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const IconContainer = styled.button`
  ${Button}
`

const Select = styled.div<{ width?: number }>`
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  position: relative;
  padding-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${theme.colors.blue_alpha};
`

const Option = styled.button`
  ${TextStyled}
  ${Button}
  padding: 10px;
  &:hover {
    font-weight: 500;
  }
`

const OptionsContainer = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.blue_alpha};
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 35px;
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  z-index: 100;
`

export {
  InputContainer,
  Label,
  Select,
  Option,
  OptionsContainer,
  Input,
  IconContainer,
}
