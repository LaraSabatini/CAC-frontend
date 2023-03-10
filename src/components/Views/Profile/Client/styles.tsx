import styled from "styled-components"
import { TitleStyles } from "theme/styles"

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  padding-top: 100px;
`

const FirstRowData = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`

const Title = styled.h4`
  ${TitleStyles}
  margin: 0;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export { Container, FirstRowData, Title, RightColumn, ButtonContainer }
