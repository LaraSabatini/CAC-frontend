import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  background-color: #f2f8ff;
  width: 300px;
  border-radius: 15px;
  padding: 30px 35px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid rgba(70, 106, 149, 0.138);
  border-radius: 18px;

  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);

  transition: 0.3s;
`

const Title = styled.h4`
  ${TitleStyles}
  margin: 0;
  font-weight: ${theme.fontWeights.medium};
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;

  svg {
    fill: ${theme.colors.blue};
  }

  .input-password {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;

    a {
      text-decoration: none;
      color: ${theme.colors.blue};
      gap: 3px;
      font-family: ${theme.fonts.extra};
      font-weight: ${theme.fontWeights.regular};
      font-size: 12px;
      font-style: italic;
    }
  }
`

const URLContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  font-family: ${theme.fonts.extra};
  font-style: italic;
  font-weight: 400;
  font-size: 12px;

  a {
    text-decoration: none;
    color: ${theme.colors.blue};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }
`

const ActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const ErrorMessage = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.xxs};
  text-align: center;
  margin: 0;
  color: ${theme.colors.red};
  font-weight: ${theme.fontWeights.regular};
  height: 17px;
  padding-bottom: 15px;
`

const RequiredError = styled.p`
  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.xxs};
  margin: 0;
  color: ${theme.colors.red};
  font-weight: ${theme.fontWeights.regular};
  padding-top: 10px;
  height: 18px;
`

const RemainingAttempts = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.xxs};
  color: ${theme.colors.blue};
  font-family: ${theme.fonts.extra};
  font-style: italic;
  margin: 0;
  height: 17px;
`

export {
  Container,
  Title,
  InputContainer,
  URLContainer,
  ActionDiv,
  ErrorMessage,
  RequiredError,
  RemainingAttempts,
}
