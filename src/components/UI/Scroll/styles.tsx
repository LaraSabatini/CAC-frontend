import styled, { css } from "styled-components"
import theme from "theme/index"

const ScrollView = styled.div<{ height: number; horizontal?: boolean }>`
  height: ${({ height }) => height}px;
  list-style-type: none;
  padding: 0;
  margin: 1;
  width: auto;
  overflow-y: auto;
  ${({ horizontal }) =>
    horizontal &&
    css`
      overflow-x: auto;
    `}
  padding-right: 20px;
  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
    background-color: ${theme.colors.blue_alpha};
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb {
    height: 5px;
    background-clip: padding-box;
    background-color: ${theme.colors.blue};
    border-radius: 7px;
    -webkit-border-radius: 7px;
  }
  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

export default ScrollView
