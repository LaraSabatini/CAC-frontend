import styled from "styled-components"
import theme from "theme"

const Container = styled.div`
  width: 350px;
  padding: 10px 40px 25px 25px;
  background-color: ${theme.colors.white};
  border-radius: 18px;

  display: flex;
  flex-direction: column;

  .req-fields {
    color: ${theme.colors.red};
    font-size: 14px;
    padding-bottom: 15px;
    font-family: ${theme.fonts.extra};
    margin: 0;
  }

  textarea {
    margin-bottom: 10px;
  }

  .close {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin-right: -25px;

    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const Title = styled.h4`
  margin: 0;
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue_dark};
`

const InputContainer = styled.div`
  margin-top: 20px;
  width: 95%;

  .sub-container {
    display: flex;
    gap: 40px;
    align-items: center;
  }

  .req-button {
    display: flex;
  }
`

const NoAvailability = styled.p`
  margin: 0;
  font-family: ${theme.fonts.extra};
  color: ${theme.colors.blue};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;

  span {
    font-weight: ${theme.fontWeights.light};
    font-size: 14px;
    display: block;
  }
`

export { Container, Title, InputContainer, NoAvailability }
