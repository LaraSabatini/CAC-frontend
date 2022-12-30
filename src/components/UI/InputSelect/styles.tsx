import styled, { css } from "styled-components"
import theme from "theme/index"
import { Button, TextStyled } from "components/UI/sharedStyles"

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const IconContainer = styled.button`
  ${Button}
`

const Select = styled.div<{ width?: number; error?: boolean }>`
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
  position: relative;
  border-bottom: 1px solid ${theme.colors.blue_alpha};
  padding: 8px 0 5px 3px;

  ${props =>
    props.error &&
    css`
      border-bottom: 1px solid ${theme.colors.red};
    `}
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

const ErrorMessage = styled.span<{ width?: number }>`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.red};
  padding: 5px 0 0 2px;
  width: ${({ width }) => (width as number) - 25 || 200}px !important;
`

export { Select, Option, OptionsContainer, Input, IconContainer, ErrorMessage }
