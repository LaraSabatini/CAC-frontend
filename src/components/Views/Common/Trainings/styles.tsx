import styled, { css } from "styled-components"
import theme from "theme"

const Container = styled.div`
  width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  overflow: auto;

  h3 {
    margin: 0;
    font-family: ${theme.fonts.titles};
    color: ${theme.colors.blue_dark};
  }

  .container-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin-top: 10px;
`

const CreateTraining = styled.div`
  position: absolute;

  top: 20px;
  left: 100px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  padding-top: 50px;
`

const CardPlaceholder = styled.div`
  width: 420px;
  height: 270px;

  border: 1px solid green;
  border-radius: 18px;
  border: 1px solid rgba(70, 106, 149, 0.138);
  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);
  transition: 0.3s;

  position: relative;

  animation: skeleton-loading 1.5s linear infinite;

  @keyframes skeleton-loading {
    0% {
      background-color: #ebf1fa;
    }
    100% {
      background-color: #f3f3f3;
    }
  }
`

const FilterContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: center;
  height: 50px;

  svg {
    width: 10px;
  }
`
const Filter = styled.button<{ selected: boolean }>`
  border: 1px solid transparent;
  background-color: #466a955e;
  font-family: ${theme.fonts.extra};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.blue_dark};
  padding: 5px 10px;
  border-radius: 5px;

  ${props =>
    props.selected &&
    css`
      background-color: #466a95c7;
      border: 1px solid ${theme.colors.blue};
      color: ${theme.colors.white};
    `}
`

const EmptyResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.titles};
  font-size: 20px;
  color: ${theme.colors.blue};
  font-weight: ${theme.fontWeights.medium};

  width: 100%;
  height: 500px;

  svg {
    width: 40px;
    height: 40px;
  }
`

export {
  Container,
  Content,
  CreateTraining,
  ButtonContainer,
  CardPlaceholder,
  FilterContainer,
  Filter,
  EmptyResults,
}
