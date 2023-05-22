import styled from "styled-components"

const Container = styled.div`
  display: flex;
  gap: 35px;
  align-items: flex-start;
  margin: 0 auto;
  width: 96vw;
  padding-top: 15px;

  @media (max-width: 1030px) {
    flex-wrap: wrap;
  }
`

export default Container
