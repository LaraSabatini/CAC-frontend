/* eslint-disable no-nested-ternary */
import styled from "styled-components"
import theme from "theme/index"

const PaginationContainer = styled.div`
  display: flex;
  height: 20px;
  width: 87px;
  gap: 0px;
  color: ${theme.colors.blue};
`

const PagesContainer = styled.div`
  height: 20px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 18px;
  user-select: none;
`
const ArrowsContainer = styled.div`
  display: flex;
  height: 20px;
  width: 34px;
  justify-content: space-between;
  align-items: center;
  padding-top: 2px;
`
const ArrowItemContainer = styled.span`
  svg {
    stroke: ${theme.colors.blue};
  }
`

interface INumberPage {
  bold?: boolean
}

const NumberPage = styled.span<INumberPage>`
  font-size: ${theme.fontSizes.s};
  font-family: ${theme.fonts.content};
  font-weight: ${props =>
    props.bold ? theme.fontWeights.semiBold : theme.fontWeights.medium};
  :hover {
    cursor: ${props => props.onClick && "pointer"};
  }
`
export {
  PaginationContainer,
  PagesContainer,
  ArrowsContainer,
  NumberPage,
  ArrowItemContainer,
}
