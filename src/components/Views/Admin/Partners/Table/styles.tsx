import styled, { css } from "styled-components"

const TableContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
`

const TableStyled = styled.div`
  box-shadow: 0px 8px 24px rgba(70, 105, 149, 0.1);
  border-radius: 18px;
  width: 100%;
  height: 400px;

  .name-tag {
    width: 170px;
  }

  .id-tag {
    width: 120px;
  }

  .plan-tag {
    width: 120px;
  }

  .identification-tag {
    width: 120px;
  }

  .region-tag {
    width: 185px;
  }

  .partner-tag {
    width: 130px;
  }
`

const TableHead = styled.div`
  padding: 16px 26px 11px 26px;
  border-bottom: 1px solid rgba(21, 54, 84, 0.6);
  display: flex;

  p {
    margin: 0;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;

    color: rgba(70, 105, 149, 0.6);
  }
`

const TableContent = styled.div`
  height: 350px;
  overflow: auto;
`

const Client = styled.div<{ selected: boolean }>`
  padding: 11px 26px 11px 26px;
  border-bottom: 1px solid rgba(70, 105, 149, 0.15);
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(70, 105, 149, 0.15);
  }

  ${props =>
    props.selected &&
    css`
      background-color: rgba(70, 105, 149, 0.15);
    `}

  p {
    margin: 0;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    color: #466995;
  }
`

export { TableContainer, TableStyled, TableHead, TableContent, Client }
