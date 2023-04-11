import styled from "styled-components"
import theme from "@theme/index"

const CheckboxContainer = styled.div`
  background-color: ${theme.colors.white};
  display: inline-block;
  position: relative;
  height: 22px;
  width: 22px;
  border-radius: 5px;

  input {
    visibility: hidden;
  }
  label {
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgba(70, 106, 149, 0.235);
    color: ${theme.colors.white};
    display: flex;
    height: 20px;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    top: 0px;
    left: 0px;
    overflow: hidden;
    transition: all 0s ease;
    width: 20px;
    z-index: 1;

    svg {
      width: 20px;
      height: 20px;
    }
  }
  input[type="checkbox"]:checked + label {
    border: 1px solid ${theme.colors.blue};
    border-radius: 5px;
    color: ${theme.colors.white};
    background: ${theme.colors.blue};
    width: 20px;
    height: 20px;
  }
  input[type="checkbox"]:disabled:checked + label {
    background: #c8c8c8;
    border-color: #c8c8c8;
  }
`

export default CheckboxContainer
