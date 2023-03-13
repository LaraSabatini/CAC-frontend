import styled, { css } from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"
import { Button } from "components/UI/sharedStyles"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  gap: 10px;

  .footer {
    width: 90%;
    display: flex;
    align-self: center;
    justify-content: space-between;

    a {
      text-decoration: none;
    }
  }
`

const Title = styled.p`
  ${TitleStyles}
  display: flex;
  gap: 18px;
  align-items: center;

  font-family: "Sora";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;

  color: #153654;

  svg {
    width: 18px;
    height: 18px;
  }
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  button {
    ${Button}
    padding: 0;

    svg {
      color: ${theme.colors.blue_dark};
      width: 15px;
      height: 15px;
    }
  }
`

const Indicator = styled.div`
  width: fit-content;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dot = styled.div<{ active: boolean }>`
  width: 7px;
  height: 7px;
  border: 1px solid ${theme.colors.blue_dark};
  border-radius: 50%;

  ${props =>
    props.active
      ? css`
          background-color: ${theme.colors.blue_dark};
        `
      : css`
          background-color: transparent;
        `}
`

const Content = styled.div`
  width: 93%;
  height: 94%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  object {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
`

export { Container, Title, Content, Navigation, Indicator, Dot }
