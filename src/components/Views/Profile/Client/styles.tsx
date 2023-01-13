import styled from "styled-components"
import { TitleStyles } from "theme/styles"

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

export { Container, FirstRowData, Title }
