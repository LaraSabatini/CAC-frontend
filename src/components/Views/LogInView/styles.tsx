import styled from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  background-color: #f2f8ff;
  width: 300px;
  border-radius: 15px;
  gap: 30px;
  padding: 30px 35px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 260px;
  }
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
  height: 50px;

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

const LoginButton = styled.button`
  ${TitleStyles}
  background-color: ${theme.colors.blue};
  color: ${theme.colors.white};
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid transparent;
`

const ActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const ErrorMessage = styled.p`
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.xs};
  text-align: center;
  margin: 0;
  color: ${theme.colors.red};
  font-weight: ${theme.fontWeights.light};
  height: 17px;
`

const RequiredError = styled.p`
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.xs};
  margin: 0;
  color: ${theme.colors.red};
  font-weight: ${theme.fontWeights.light};
  padding-top: 10px;
`

export {
  Container,
  Title,
  InputContainer,
  URLContainer,
  LoginButton,
  ActionDiv,
  ErrorMessage,
  RequiredError,
}
