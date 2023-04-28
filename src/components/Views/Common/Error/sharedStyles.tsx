import styled from "styled-components"
import { TitleStyles } from "theme/styles"
import theme from "theme/index"

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

  .span {
    font-weight: ${theme.fontWeights.light};
    color: ${theme.colors.blue};
    font-family: ${theme.fonts.extra};
    display: block;
    font-size: 13px;
    padding-top: 10px;
  }
`

const Title = styled.h1`
  ${TitleStyles}
  margin: 0;
  font-weight: ${theme.fontWeights.medium};
  font-size: 20px;
`

const Description = styled.p`
  font-family: ${theme.fonts.extra};
  color: ${theme.colors.blue};
  font-size: 14px;
`

export { Container, Title, Description }
