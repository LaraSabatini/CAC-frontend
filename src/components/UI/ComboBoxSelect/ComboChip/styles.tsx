import styled from "styled-components"
import theme from "@theme/index"

export const ChipContainer = styled.div`
  margin: 0;
  padding: 0;
  width: fit-content;
  max-width: 100%;
  padding: 7px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #466a951f; /* Not in the theme */
  border-radius: 17px;
  gap: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  .chip-display-name {
    margin: 0;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: ${theme.fonts.content};
    font-weight: ${theme.fontWeights.medium};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.blue};
  }
`

export const Close = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
`
