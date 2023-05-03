import styled from "styled-components"
import theme from "theme/index"
import { Button } from "components/UI/sharedStyles"

const PersonalDataCard = styled.div`
  background-color: white;
  width: 380px;
  padding: 25px 30px;
  border: 1px solid rgba(70, 106, 149, 0.138);
  border-radius: 18px;

  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);

  @media (max-width: ${theme.screenSize.mobile}) {
    width: 260px;
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;

  svg {
    color: ${theme.colors.blue};
    width: 25px;
    height: 25px;
  }
`

const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const EditButton = styled.button`
  ${Button}
`

export { PersonalDataCard, Data, CardHeader, EditButton }
