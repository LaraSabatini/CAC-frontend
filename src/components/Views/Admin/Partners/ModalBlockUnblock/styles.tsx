import styled from "styled-components"
import theme from "theme/index"

const ModalContainer = styled.div`
  background-color: ${theme.colors.white};
  width: 400px;
  height: fit-content;
  border-radius: 10px;
  padding: 25px 25px;
  display: flex;
  flex-direction: column;

  .description {
    width: 390px;
    font-family: ${theme.fonts.extra};
    text-align: center;
    align-self: center;
    color: ${theme.colors.blue};
    padding-bottom: 20px;
    span {
      display: block;
      margin-top: 5px;
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colors.blue};
    }
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

  span {
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.blue};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`

export { ModalContainer, Title, ButtonContainer }
