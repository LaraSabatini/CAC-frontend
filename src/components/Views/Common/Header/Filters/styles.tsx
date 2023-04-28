import styled from "styled-components"
import theme from "theme/index"

const FilterContainer = styled.div`
  position: absolute;
  background-color: #fffffff5;

  box-shadow: 0px 3px 6px #00000029; /* Not in the theme */

  right: 0;
  top: 125%;
  z-index: 100;
  width: 250px;
  padding: 10px;
  border-radius: 5px;
  font-family: ${theme.fonts.extra};
`

const FilterSelector = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 300;
`

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-family: ${theme.fonts.extra};
  color: ${theme.colors.blue};
`

const OpenFilters = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${theme.colors.blue};
`

const Filter = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 5px;
  padding-top: 10px;
  padding-left: 5px;

  flex-direction: column;
`

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`

const FilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 0 10px;
`

const IconButton = styled.button`
  color: ${theme.colors.blue};
  background-color: transparent;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`

const SubFilters = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding-left: 20px;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`

export {
  FilterContainer,
  FilterSelector,
  Title,
  OpenFilters,
  Filter,
  SelectionContainer,
  FilterList,
  ButtonContainer,
  IconButton,
  SubFilters,
}
