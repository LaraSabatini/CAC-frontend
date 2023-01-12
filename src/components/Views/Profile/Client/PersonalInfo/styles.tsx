import styled from "styled-components"
import theme from "theme/index"
import { Button } from "components/UI/sharedStyles"

const PersonalDataCard = styled.div`
  background-color: ${theme.colors.white};
  width: 380px;
  padding: 25px 30px;
  border-radius: 10px;
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

const DataSet = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 15px;
  }

  span {
    color: #466a95c4;
    font-size: ${theme.fontSizes.xs};
    font-family: ${theme.fonts.extra};
    font-style: italic;
    margin: 0;
  }

  svg {
    width: 19px;
    height: 19px;
    color: ${theme.colors.blue};
  }
`

const RowContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const EditButton = styled.button`
  ${Button}
`

export { PersonalDataCard, DataSet, RowContent, Data, CardHeader, EditButton }
