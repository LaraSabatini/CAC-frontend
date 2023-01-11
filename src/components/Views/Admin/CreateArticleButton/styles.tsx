import styled from "styled-components"
import theme from "theme/index"

const AddButton = styled.button`
  background-color: ${theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 4px 4px 5px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  svg {
    color: ${theme.colors.white};
    width: 25px;
    height: 25px;
  }
`
export default AddButton
