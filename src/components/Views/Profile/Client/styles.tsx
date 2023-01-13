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

  .subdiv {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

const Title = styled.h4`
  ${TitleStyles}
  margin: 0;
`

export { Container, FirstRowData, Title }
