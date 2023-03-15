import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;

  @media (max-width: 626px) {
    padding-top: 50px;
  }
`

const PermitsCard = styled.div`
  background-color: ${theme.colors.white};
  width: 280px;
  padding: 25px 30px;
  border-radius: 10px;

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 260px;
  }
`

const PermitTitle = styled.p`
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
  text-decoration: underline;
`

const Permit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-bottom: 0.5px solid ${theme.colors.blue};
  padding-bottom: 10px;
`

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${theme.fonts.extra};
  color: ${theme.colors.blue};
  font-size: ${theme.fontSizes.xs};
`

const ButtonContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
`

export { Container, PermitsCard, PermitTitle, Permit, Option, ButtonContainer }
