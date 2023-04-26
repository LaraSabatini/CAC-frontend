import styled from "styled-components"
import theme from "theme"

const ModalContent = styled.div`
  background-color: ${theme.colors.white};
  width: 400px;
  border-radius: 18px;
  padding: 25px;
  display: flex;
  flex-direction: column;

  .modal-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  p {
    padding-top: 20px;
    font-family: ${theme.fonts.extra};
    margin: 0;
    font-size: 14px;
    b {
      font-weight: ${theme.fontWeights.medium};
    }
  }

  .button-container {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
  }

  .date-data {
    font-family: ${theme.fonts.extra};
    font-size: 14px;
    color: ${theme.colors.blue};
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const Title = styled.h4`
  margin: 0;
  font-family: ${theme.fonts.titles};
  color: ${theme.colors.blue_dark};
  padding-bottom: 5px;

  span {
    font-weight: ${theme.fontWeights.medium};
  }
`

export { ModalContent, Title }
