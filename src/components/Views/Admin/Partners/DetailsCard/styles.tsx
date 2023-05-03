import styled, { css } from "styled-components"
import theme from "theme/index"

const Card = styled.div`
  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);
  border-radius: 18px;
  width: 35%;
  height: fit-content;
  padding: 23px 35px;
  background-color: #fffffff5;

  .personal-data {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-bottom: 40px;
  }
`

const Title = styled.h3`
  margin: 0;
  padding-bottom: 20px;
  font-family: ${theme.fonts.titles};
  font-style: normal;
  font-weight: ${theme.fontWeights.semiBold};
  font-size: 20px;
  line-height: 28px;

  color: ${theme.colors.blue_dark};
`

const ActionButton = styled.button<{ action: "block" | "unblock" }>`
  border: none;
  border-radius: 4px;

  font-family: ${theme.fonts.content};
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.s};
  line-height: 19px;

  color: ${theme.colors.white};
  padding: 5px 15px;
  cursor: pointer;

  ${props =>
    props.action === "block"
      ? css`
          background: ${theme.colors.red};
        `
      : css`
          background: ${theme.colors.blue};
        `}
`

export { Card, Title, ActionButton }
