import styled, { css } from "styled-components"
import theme from "theme/index"

const ButtonStyled = styled.button<{ cta: boolean }>`
  font-family: ${theme.fonts.titles};
  font-weight: 400;
  font-size: ${theme.fontSizes.xs};
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  ${props =>
    props.cta
      ? css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.blue};
          border: 1px solid ${theme.colors.blue};
        `
      : css`
          background-color: ${theme.colors.blue};
          color: ${theme.colors.white};
          border: 1px solid transparent;
        `}
`

export default ButtonStyled
