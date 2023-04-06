import styled, { css } from "styled-components"
import theme from "theme/index"

export const SearchStyled = styled.div<{ width?: number }>`
  position: relative;
  ${({ width }) =>
    width
      ? css`
          width: ${width}px;
        `
      : css`
          width: 100%;
        `}
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const IconAbsolute = styled.div<{ isClickable?: boolean }>`
  position: absolute;
  left: 11px;
  width: fit-content;
  height: 20.6px;
  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
    `}

  svg {
    color: ${theme.colors.blue};
    width: 20px;
    height: 20px;
  }
`

export const InputStyled = styled.input`
  padding-left: 40px;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  font-size: ${theme.fontSizes.xs};
  border: 1px solid rgba(70, 106, 149, 0.235);
  border-radius: 10px;
  background-color: default;
  position: relative;
  padding-right: 35px;
  background-color: transparent;
  font-family: ${theme.fonts.extra};
  color: ${theme.colors.blue};
  ::placeholder {
    color: ${theme.colors.blue};
  }
`
