import styled, { css } from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"
import { Button } from "components/UI/sharedStyles"

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 18px;
  padding: 20px 30px;
  background-color: #466a9533;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      color: ${theme.colors.blue_dark};
      width: 22px;
      height: 22px;
    }
  }
`

const Title = styled.p`
  ${TitleStyles}
  font-weight: 500;
  display: flex;
  gap: 5px;
  font-size: 14px;
  align-items: center;
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
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  bottom: 20px;
`

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
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
  width: 90%;
  height: 90%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    border-radius: 10px;
  }

  object {
    border-radius: 10px;
    width: 100%;
    height: 90%;
  }
`

export { Container, Title, Content, Navigation, Indicator, Dot }
