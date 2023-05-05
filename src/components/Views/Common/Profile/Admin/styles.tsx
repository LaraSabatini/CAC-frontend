import styled from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;

  /* @media (max-width: 626px) {
    padding-top: 50px;
  } */

  .buttons {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`

const DataCard = styled.div`
  background-color: white;
  width: 320px;
  padding: 25px 30px;
  border: 1px solid rgba(70, 106, 149, 0.138);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);

  p {
    font-family: ${theme.fonts.extra};
    margin: 0;
    display: flex;
    gap: 10px;
    color: ${theme.colors.blue};
    font-size: 14px;

    b {
      font-weight: ${theme.fontWeights.medium};
    }
  }

  .head {
    /* padding-bottom: 20px; */
    align-self: flex-end;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

const PermitsCard = styled.div`
  background-color: ${theme.colors.white};
  width: 280px;
  padding: 25px 30px;
  border-radius: 10px;
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

export {
  Container,
  PermitsCard,
  PermitTitle,
  Permit,
  Option,
  ButtonContainer,
  DataCard,
}
