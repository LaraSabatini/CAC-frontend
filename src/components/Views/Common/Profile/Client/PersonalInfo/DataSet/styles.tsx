import styled from "styled-components"
import theme from "theme/index"

const DataSetStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-family: ${theme.fonts.content};
  color: ${theme.colors.blue};
  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 15px;
  }

  span {
    color: #466a95c4;
    font-size: ${theme.fontSizes.xs};
    font-family: ${theme.fonts.extra};
    font-style: italic;
    margin: 0;
  }

  svg {
    width: 19px;
    height: 19px;
    color: ${theme.colors.blue};
  }
`

const RowContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export { DataSetStyled, RowContent }
