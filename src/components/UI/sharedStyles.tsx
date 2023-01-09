import styled, { css } from "styled-components"
import theme from "theme/index"

const Button = () => css`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const ErrorMessage = styled.span<{ width?: number }>`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.red};
  padding: 5px 0 0 2px;
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
`

const Label = styled.label<{ error?: boolean }>`
  ${props =>
    props.error &&
    css`
      color: ${theme.colors.red};
    `}
  color: ${theme.colors.blue_dark};
  font-family: ${theme.fonts.content};
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.xs};
`

const TextStyled = () => css`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
`

const InputContainer = styled.div<{ width?: number }>`
  ${TextStyled}
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  display: flex;
  height: 75px;
  flex-direction: column;
`

export { Button, ErrorMessage, Label, TextStyled, InputContainer }
