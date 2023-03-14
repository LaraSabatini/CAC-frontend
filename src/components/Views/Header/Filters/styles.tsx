import styled from "styled-components"
import theme from "theme/index"

const FilterContainer = styled.div`
  position: absolute;
  background-color: white;
  right: 0;
  top: 125%;
  z-index: 100;
  width: 200px;
  padding: 10px;
  border-radius: 5px;
`

const FilterSelector = styled.div`
  width: 100%;
  font-family: ${theme.fonts.content};
  font-size: 14px;
  font-weight: 300;
`

const Title = styled.p`
  margin: 0;
  font-size: 16px;
`

const OpenFilters = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: transparent;
`

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
  padding-left: 5px;
`

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 5px 15px;
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
}
