import styled from "styled-components"
import { Button } from "components/UI/sharedStyles"
import theme from "theme/index"

const Container = styled.div`
  margin: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(70, 106, 149, 0.235);

  padding: 0 10px 15px 10px;

  @media (max-width: ${theme.screenSize.transition_mobile}) {
    align-items: flex-start;
    border-bottom: none;
    padding: 0;
    margin: 15px 20px;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: ${theme.screenSize.transition_mobile}) {
    flex-wrap: wrap;
  }
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const ProfilePic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`

const ProfileOptions = styled.div`
  z-index: 100;
  position: absolute;
  top: 125%;
  background-color: #fffffff5;
  padding: 20px;
  border-radius: 8px;
  right: 0;
  /* width: 120px; */
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  box-shadow: 0px 8px 24px rgba(70, 106, 149, 0.055);

  .cta {
    background-color: ${theme.colors.blue};
    color: ${theme.colors.white};
    width: 70px;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: ${theme.fontSizes.xs};
    font-weight: ${theme.fontWeights.light};
  }
`

const GoHomeButton = styled.button`
  ${Button}
  svg {
    width: 40px;
    height: 40px;
  }
`

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

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 15px;
  @media (max-width: ${theme.screenSize.transition_mobile}) {
    margin-top: 10px;
  }
`

const SVGButton = styled.button`
  ${Button}
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
  cursor: pointer;

  svg {
    color: ${theme.colors.blue};
    width: 25px;
    height: 25px;
  }
`

const FiltersButton = styled.button`
  border: none;
  color: ${theme.colors.blue};
  cursor: pointer;
  background-color: transparent;

  svg {
    width: 25px;
    height: 25px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  padding-right: 10px;
  position: relative;

  .menu {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    cursor: pointer;
    border: none;
    outline: none;

    .line {
      border-radius: 2px;
      width: 20px;
      height: 2px;
      background-color: ${theme.colors.blue};
    }
  }
`

const Menu = styled.div`
  position: absolute;
  width: 240px;
  /* height: 275px; */
  height: fit-content;
  border-radius: 18px;
  padding: 25px;
  background-color: #ffffffe8;
  right: 0;
  top: 25px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Option = styled.div`
  font-family: ${theme.fonts.extra};
  color: ${theme.colors.blue};
  font-size: 15px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
`

const FilterContainer = styled.div``

export {
  Container,
  SearchContainer,
  ProfilePic,
  ProfileOptions,
  GoHomeButton,
  AddButton,
  ProfileContainer,
  SearchDiv,
  SVGButton,
  FiltersButton,
  ButtonContainer,
  Menu,
  Option,
  FilterContainer,
}
