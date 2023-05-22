import styled from "styled-components"
import theme from "theme/index"

const AddButton = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  svg {
    color: ${theme.colors.blue};
    width: 30px;
    height: 30px;
  }
`
export default AddButton
