import styled, { css } from "styled-components"
import theme from "theme/index"
import { TextStyled } from "components/UI/sharedStyles"

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

  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.blue};

  &:focus {
    border-bottom: 1px solid ${theme.colors.blue};
    outline: none;
  }

  ${props =>
    props.pass === "pass" &&
    css<{ width?: number }>`
      width: ${({ width }) => (width as number) - 60 || 200}px !important;
    `}

  ${props =>
    props.error &&
    css`
      border-bottom: 1px solid ${theme.colors.red};
    `}
`

const InputPassword = styled.div<{ width?: number }>`
  width: ${({ width }) => (width as number) - 55 || 200}px !important;
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
  InputStyled,
  InputPassword,
  IconContainer,
  TextareaContainer,
  InputTextarea,
}
