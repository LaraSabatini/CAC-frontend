import styled, { css } from "styled-components"
import theme from "theme/index"

const TextStyled = () => css`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
`

const InputContainer = styled.div<{ width?: number }>`
  ${TextStyled}
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  height: 75px;
`

const Label = styled.label<{ error?: boolean }>`
  ${props =>
    props.error &&
    css`
      color: ${theme.colors.red};
    `}
`

const InputStyled = styled.input<{
  width?: number
  error?: boolean
  pass?: "pass"
}>`
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  height: 30px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${theme.colors.blue_alpha};

  ${TextStyled}
  font-size: ${theme.fontSizes.s};

  &:focus {
    border-bottom: 1px solid ${theme.colors.blue};
    outline: none;
  }

  ${props =>
    props.error &&
    css`
      border-bottom: 1px solid ${theme.colors.red};
    `}

  ${props =>
    props.pass === "pass" &&
    css<{ width?: number }>`
      width: ${({ width }) => (width as number) - 60 || 200}px !important;
    `}
`

const ErrorMessage = styled.span<{ width?: number }>`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.red};
  padding: 5px 0 0 2px;
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
`

const InputPassword = styled.div<{ width?: number }>`
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  position: relative;
  ${TextStyled}
`

const IconContainer = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  bottom: 3px;
  right: 0;
`

const TextareaContainer = styled.div<{ width?: number; height?: number }>`
  ${TextStyled}
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  height: ${({ height }) => (height as number) - 25 || 60}px !important;
`

const InputTextarea = styled.textarea<{
  width?: number
  height?: number
  error?: boolean
}>`
  width: ${({ width }) => (width as number) - 25 || 180}px !important;
  height: ${({ height }) => (height as number) - 25 || 60}px !important;
  resize: none;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.blue_alpha};
  background-color: transparent;
  padding: 8px 10px;
  ${TextStyled}
  font-size: ${theme.fontSizes.s};

  &:focus {
    border: 1px solid ${theme.colors.blue};
    outline: none;
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid ${theme.colors.red};
    `}
`

export {
  InputContainer,
  InputStyled,
  Label,
  ErrorMessage,
  InputPassword,
  IconContainer,
  TextareaContainer,
  InputTextarea,
}
