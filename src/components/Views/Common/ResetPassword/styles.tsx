import styled, { css } from "styled-components"
import theme from "theme/index"
import { TitleStyles } from "theme/styles"

const Form = styled.div`
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

  .buttons {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
      padding-top: 10px;
      font-family: ${theme.fonts.extra};
      font-size: 12px;
      font-style: italic;
      text-decoration: none;
      color: ${theme.colors.blue};
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 3px;
    }
  }
`

const Title = styled.h4`
  ${TitleStyles}
  margin: 0;
  font-weight: ${theme.fontWeights.medium};
  text-align: center;

  span {
    margin-top: 10px;
    font-weight: ${theme.fontWeights.light};
    color: ${theme.colors.blue};
    font-family: ${theme.fonts.extra};
    display: block;
    font-size: 13px;
  }

  padding-bottom: 30px;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  svg {
    width: 20px;
    height: 20px;
    padding-bottom: 10px;
    fill: ${theme.colors.blue};
  }
`

const Description = styled.p`
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.blue};
  font-family: ${theme.fonts.extra};
  display: block;
  font-size: 13px;
  text-align: center;
`

const MessageTitle = styled.p`
  margin: 0;
  font-family: ${theme.fonts.extra};
  font-weight: ${theme.fontWeights.medium};
  font-size: 16px;
  padding-bottom: 10px;
  color: ${theme.colors.blue};
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const ErrorMessage = styled.p<{ transparent: boolean }>`
  ${({ transparent }) =>
    transparent
      ? css`
          background-color: transparent;
        `
      : css`
          background-color: #ffb83e58;
        `}

  font-family: ${theme.fonts.extra};
  font-size: ${theme.fontSizes.xxs};
  text-align: center;
  margin: 0;
  color: ${theme.colors.blue};
  text-align: left;
  font-weight: ${theme.fontWeights.regular};
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  svg {
    width: 20px;
    height: 20px;
    transform: rotate(180deg);
  }
`
export {
  Form,
  Title,
  MessageContainer,
  Description,
  MessageTitle,
  InputContainer,
  ErrorMessage,
}
