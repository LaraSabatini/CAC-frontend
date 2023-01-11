import styled, { css } from "styled-components"
import theme from "theme/index"
import TooltipInterface from "interfaces/components/TooltipInterface"

type Positions = Pick<
  TooltipInterface,
  "placement" | "bgcolor" | "color" | "opacity"
>

interface TooltipItemI extends Positions {
  changePadding?: number
}

export const TooltipContainer = styled.div<Positions>`
  position: relative;
  width: fit-content;
  &:hover {
    .tooltip-item {
      display: block;
    }
  }
`
export const TooltipItem = styled.div<TooltipItemI>`
  background-color: ${({ bgcolor }) => bgcolor || theme.colors.blue_dark};
  color: ${({ color }) => color || theme.colors.white};
  opacity: ${({ opacity }) => opacity || 0.9};
  border-radius: 5px;
  padding: 7px 10px;
  font-size: ${theme.fontSizes.xs};
  font-family: ${theme.fonts.content};
  font-weight: ${theme.fontWeights.semiBold};
  margin: 0;
  position: absolute;
  width: max-content;
  line-height: ${theme.fontSizes.m};
  display: none;
  width: max-content;
  z-index: 100;
  ${props =>
    !props.placement &&
    css`
      bottom: 80%;
      right: 0;
    `}
  ${props =>
    props.placement === "top" &&
    css`
      bottom: 80%;
      left: 50%;
      transform: translateX(-50%);
    `}
  ${props =>
    props.placement === "top-start" &&
    css`
      bottom: 80%;
      left: 0;
    `}
    ${props =>
    props.placement === "top-end" &&
    css`
      bottom: 80%;
      right: 0;
    `}
  ${props =>
    props.placement === "left" &&
    css`
      right: 97%;
      top: 50%;
      transform: translateY(-50%);
    `}
    ${props =>
    props.placement === "left-start" &&
    css`
      right: 97%;
      top: 0;
    `}
    ${props =>
    props.placement === "left-end" &&
    css`
      right: 97%;
      bottom: 0;
    `}
      ${props =>
    props.placement === "bottom" &&
    css`
      top: 80%;
      left: 50%;
      transform: translateX(-50%);
    `}
    ${props =>
    props.placement === "bottom-start" &&
    css`
      top: 80%;
      left: 0px;
    `}
    ${props =>
    props.placement === "bottom-end" &&
    css`
      top: 80%;
      right: 0;
    `}
      ${props =>
    props.placement === "right" &&
    css`
      left: 97%;
      top: 50%;
      transform: translateY(-50%);
    `}
    ${props =>
    props.placement === "right-start" &&
    css`
      left: 97%;
      top: 0;
    `}
    ${props =>
    props.placement === "right-end" &&
    css`
      left: 97%;
      bottom: 0;
    `}
    ${props =>
    props.placement === "sidebar" &&
    css`
      left: 105%;
      top: 50%;
      transform: translateY(-50%);
    `}
    ${props =>
    props.placement === "sidebar" &&
    css`
      left: 120%;
    `}
`
