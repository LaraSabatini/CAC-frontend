import React from "react"
import headerTexts from "strings/header.json"
import { AiOutlineSearch } from "react-icons/ai"
import { SearchStyled, InputStyled, IconAbsolute } from "./styles"

interface SearchInterface {
  searchValue?: string
  width?: number
  enterSearch?: (e?: React.KeyboardEvent<HTMLInputElement>) => void
  lensSearch?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onBlurSearch?: (e?: React.FocusEvent<HTMLInputElement>) => void
  onChangeSearch?: (e?: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
}

// eslint-disable-next-line react/function-component-definition
const SearchBar: React.FC<SearchInterface> = ({
  searchValue,
  lensSearch,
  enterSearch,
  onBlurSearch,
  onChangeSearch,
  width,
  id,
}) => {
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && enterSearch) {
      enterSearch(e)
    }
  }
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlurSearch) {
      onBlurSearch(e)
    }
  }

  const handleLensSearch = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (lensSearch) {
      lensSearch(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeSearch) {
      onChangeSearch(e)
    }
  }

  return (
    <SearchStyled width={width && width}>
      <IconAbsolute
        isClickable={lensSearch && true}
        onClick={e => handleLensSearch(e)}
      >
        <AiOutlineSearch />
      </IconAbsolute>
      <InputStyled
        placeholder={headerTexts.search}
        onChange={e => handleChange(e)}
        type="text"
        onKeyPress={e => handleKeyPress(e)}
        onBlur={e => handleOnBlur(e)}
        value={searchValue}
        id={id}
      />
    </SearchStyled>
  )
}

export default SearchBar
