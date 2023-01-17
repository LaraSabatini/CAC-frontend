import styled, { css } from "styled-components"
import theme from "theme/index"

const Card = styled.div`
  background-color: ${theme.colors.white};
  padding: 20px 25px;
  border-radius: 10px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 43px;
`

const State = styled.p<{ state: boolean }>`
  font-family: ${theme.fonts.content};
  padding: 5px;
  width: 90px;
  text-align: center;
  border-radius: 5px;
  margin: 0;
  font-size: ${theme.fontSizes.xs};

  ${props =>
    !props.state
      ? css`
          background-color: ${theme.colors.green_light};
          color: ${theme.colors.white};
        `
      : css`
          background-color: ${theme.colors.red};
          color: ${theme.colors.white};
        `}
`

const ExpireDate = styled.div`
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
  gap: 5px;

  svg {
    width: 19px;
    height: 19px;
  }

  span {
    color: #466a95c4;
    font-size: ${theme.fontSizes.xs};
    font-family: ${theme.fonts.extra};
    font-style: italic;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: ${theme.fontSizes.xs};
  }
`

export { Card, State, ExpireDate, CardHeader }
