import styled, { css } from "styled-components"
import theme from "@theme/index"

export const SelectWrapper = styled.div`
  font-family: ${theme.fonts.content};
  width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
`

export const SelectLabel = styled.label<{ error: boolean; backError: boolean }>`
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.blue};
  margin: 0 0 2px 13px;
  padding: 0;
  ${({ error, backError }) =>
    (error || backError) &&
    css`
      color: ${theme.colors.red};
    `}
`

export const GroupTitle = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.blue};
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`

export const GroupContainer = styled.div<{ isTheLast: boolean }>`
  ${({ isTheLast }) =>
    !isTheLast &&
    css`
      border-bottom: 1px solid ${theme.colors.light_grey};
      padding-bottom: 6px;
      margin-bottom: 6px;
    `}
`

export const SelectContainer = styled.div<{
  width?: number
  height?: number
  isOpen?: boolean
  error: boolean
  backError: boolean
}>`
  height: fit-content;
  width: ${({ width }) => width || 312}px;
  display: flex;
  align-items: center;
  position: relative;
  ${({ isOpen }) =>
    isOpen &&
    css`
      border-color: ${theme.colors.blue};
    `}

  border: 0 0 1px 0;
  border-bottom-style: solid;
  border-color: ${({ error, backError }) =>
    error || backError ? theme.colors.red : theme.colors.blue_alpha};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`

export const ChipsContainer = styled.label<{
  isOpen?: boolean
  width: number
  readOnly?: true
  error: boolean
  backError: boolean
}>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          margin-top: 2px;
          margin-bottom: 2px;
        `
      : css`
          margin-top: 3px;
          margin-bottom: 3px;
        `}
  ${({ error, backError }) =>
    (error || backError) &&
    css`
      margin-top: 2px;
      margin-bottom: 2px;
    `}
  margin-left: ${({ isOpen }) => (isOpen ? "4px" : "5px")};
  margin-right: 6px;
  min-height: 32px;
  width: 100%;
  max-width: ${({ width }) => (width ? width - 37 : 273)}px;
  position: relative;
  .chips-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    width: 100%;
  }
  #chips-container {
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border: none;
    appearance: none;
    background: none;
    outline: none;
    caret-color: transparent;
  }
`

export const ReadOnlyChipsContainer = styled.label<{
  width: number
  error: boolean
  backError: boolean
}>`
  margin: 3px 6px 3px 5px;
  min-height: 32px;
  width: 100%;
  max-width: ${({ width }) => (width ? width - 12 : 300)}px;
  position: relative;
  .chips-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    width: 100%;
  }
  #chips-container {
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border: none;
    appearance: none;
    background: none;
    outline: none;
    caret-color: transparent;
  }
`

export const ClickableContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  cursor: pointer;
`

export const ToggleContainer = styled.div<{ isOpen: boolean }>`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  width: fit-content;
  cursor: pointer;
  margin-top: ${({ isOpen }) => (isOpen ? "14px" : "15px")};
  margin-right: ${({ isOpen }) => (isOpen ? "11px" : "12px")};
  svg {
    transform: rotate(${({ isOpen }) => isOpen && "180deg"});
  }
`

export const DropdownList = styled.div<{
  width: number
  placement: "bottom-start" | "bottom-end" | "top-start" | "top-end"
}>`
  min-width: ${({ width }) => width || 312}px;
  width: fit-content;
  max-width: 900px;
  position: absolute;
  ${({ placement }) =>
    (placement === undefined || placement === "bottom-start") &&
    css`
      top: 70%;
      left: 0;
      margin-top: 2px;
    `}
  ${({ placement }) =>
    placement === "bottom-end" &&
    css`
      top: 100%;
      right: 0;
      margin-top: 2px;
    `}
  ${({ placement }) =>
    placement === "top-start" &&
    css`
      bottom: 100%;
      left: 0;
      margin-bottom: 2px;
    `}
  ${({ placement }) =>
    placement === "top-end" &&
    css`
      bottom: 100%;
      right: 0;
      margin-bottom: 2px;
    `}
  padding: 10px;
  background: ${theme.colors.white};
  box-shadow: 0px 3px 6px #00000029; /* Not in the theme */
  border: 1px solid #8080802d; /* Not in the theme */

  border-radius: 5px;
  z-index: 2;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  .combobox-select-list {
    margin: 0;
    padding: 0;
  }

  .combobox-select-option {
    margin: 0;
    padding: 0;
    list-style: none;
    font-weight: ${theme.fontWeights.regular};
    font-size: ${theme.fontSizes.s};
    line-height: auto;
    color: ${theme.colors.blue};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

export const OptionWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 6px 0 6px 6px;
  margin-bottom: 6px;
  border-radius: 5px;
  position: relative;
  &:hover {
    ${({ disabled }) =>
      disabled !== undefined && disabled
        ? css`
            background: none;
          `
        : css`
            background: ${theme.colors.light_grey};
          `}
  }
  &:nth-last-child(1) {
    margin-bottom: 0;
  }
`

export const DisabledMask = styled.div<{ disabled?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  z-index: 2;
  background: ${theme.colors.white};
  opacity: 0.8;
`

// Errors Styles
export const ErrorMessageContainer = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  margin-top: 3px;
  min-height: 18px;
  width: ${({ width }) => width || 312}px !important;
`

export const PlaceHolder = styled.p`
  margin: 0;
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.xs};
  line-height: 18px;

  color: ${theme.colors.blue};
`
