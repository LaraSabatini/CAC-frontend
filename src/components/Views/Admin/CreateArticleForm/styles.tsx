import styled from "styled-components"
import { TitleStyles } from "theme/styles"
import theme from "theme/index"

const Container = styled.div`
  background-color: #f2f8ff;
  width: 70vw;
  max-width: 995px;
  border-radius: 18px;
  padding: 30px;
  height: fit-content;
`

const Title = styled.h2`
  ${TitleStyles}
  margin: 0;
`

const InputContainer = styled.div`
  padding-top: 43px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  .autor {
    margin-top: 10px;
  }
`

const HorizontalGroup = styled.div`
  display: flex;
  gap: 40px;

  padding-bottom: 15px;

  @media (max-width: 450px) {
    flex-direction: column;
    padding-bottom: 0px;
    gap: 10px;
  }
`

const FiltersTitle = styled.p`
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.xs};
  line-height: 22px;
  /* identical to box height */

  color: ${theme.colors.blue_dark};
  margin: 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 20px;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  flex-wrap: wrap;
`

const WarningMessage = styled.p`
  margin: 0;
  font-family: ${theme.fonts.content};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.red};
  position: absolute;
  right: 0;
  top: -25px;
  width: max-content;
`

export {
  Container,
  Title,
  InputContainer,
  HorizontalGroup,
  FiltersTitle,
  ButtonContainer,
  ActionButtons,
  WarningMessage,
}
