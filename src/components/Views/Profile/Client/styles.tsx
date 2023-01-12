import styled from "styled-components"
// import theme from "theme/index"
import { TitleStyles } from "theme/styles"
// import { Button } from "components/UI/sharedStyles"

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
`

const FirstRowData = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const Title = styled.h4`
  ${TitleStyles}
  margin: 0;
`

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export { Container, FirstRowData, Title, VerticalContainer }
