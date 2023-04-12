import styled from "styled-components"
import theme from "theme"

const Container = styled.div`
  width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  overflow: auto;

  h3 {
    margin: 0;
    font-family: ${theme.fonts.titles};
    color: ${theme.colors.blue_dark};
  }

  .container-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin-top: 10px;
`

const CreateTraining = styled.button`
  /* position: absolute; */
  background-color: ${theme.colors.blue};
  border: none;
  outline: none;

  align-self: flex-end;

  /* margin: 0 5px 20px 0; */

  /* right: 0;
  bottom: 0; */

  color: ${theme.colors.white};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;

  width: 50px;
  height: 50px;

  cursor: pointer;

  svg {
    width: 25px;
    height: 25px;
  }
`

export { Container, Content, CreateTraining }
