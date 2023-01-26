import styled, { css } from "styled-components"
import theme from "@theme/index"

export const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
`
export const ButtonZoom = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: ${theme.colors.black};
  border-radius: 5px;
  color: ${theme.colors.white};
  &:hover {
    background-color: ${theme.colors.white};
    transition: all 300ms;
    path {
      fill: grey !important;
    }
  }
  path {
    fill: ${theme.colors.white} !important;
  }
`

export const ScrollViewFile = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DeleteIcon = styled.div``

// black background
export const ViewerContainer = styled.div`
  width: 600px;
  height: 400px;
  border-radius: 10px;
  background: transparent
    linear-gradient(180deg, #24262a 0%, #494b4e 26%, #393b3e 68%, #24262a 100%)
    0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  position: relative;
  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
    background-color: #80808071;
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb {
    height: 5px;
    background-clip: padding-box;
    background-color: grey;
    border-radius: 7px;
    -webkit-border-radius: 7px;
  }
  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-corner {
    background-color: #80808071;
  }
`
// above title
export const ViewerLabel = styled.p`
  align-self: flex-start;
  margin: 0 0 8px;
  font-family: ${theme.fonts.titles};
  font-size: ${theme.fontSizes.xs};
  color: grey;
`

export const FileTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: fit-content;
  position: absolute;
  top: 25px;
  left: 25px;
  z-index: 5;
  .file-title {
    margin: 0;
    color: ${theme.colors.white};
    font-family: ${theme.fonts.titles};
    font-size: ${theme.fontSizes.xs};
    font-weight: ${theme.fontWeights.semiBold};
  }
  .file-name {
    margin: 0;
    color: ${theme.colors.white};
    font-family: ${theme.fonts.titles};
    font-size: ${theme.fontSizes.xs};
  }
`

export const RightTopIcons = styled.div`
  display: flex;
  position: absolute;
  right: 18px;
  top: 20px;
  z-index: 5;
  gap: 4px;
  .delete {
    cursor: pointer;
  }
`

export const LeftArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
`

export const RightArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
`

export const FileContainer = styled.div<{
  arrowsAreActive: boolean
  isPDF: boolean
  clicks: number
}>`
  width: 60%;
  height: auto;
  z-index: 1;
  ${({ isPDF }) =>
    isPDF &&
    css`
      width: 98%;
      height: 80%;
      position: absolute;
      bottom: 10px;
    `}
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    ${({ clicks }) =>
      clicks === 1 &&
      css`
        transform: scale(1.2);
      `}
    ${({ clicks }) =>
      clicks === 2 &&
      css`
        transform: scale(1.4);
      `}
        ${({ clicks }) =>
      clicks === 3 &&
      css`
        transform: scale(1.6);
      `}
        ${({ clicks }) =>
      clicks === 4 &&
      css`
        transform: scale(1.8);
      `}
        ${({ clicks }) =>
      clicks === 5 &&
      css`
        transform: scale(2);
      `}
  }
  .pdf {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* border-radius: 0 0 10px 10px; */
    ${({ clicks }) =>
      clicks === 1 &&
      css`
        transform: scale(1.2);
      `}
    ${({ clicks }) =>
      clicks === 2 &&
      css`
        transform: scale(1.4);
      `}
        ${({ clicks }) =>
      clicks === 3 &&
      css`
        transform: scale(1.6);
      `}
        ${({ clicks }) =>
      clicks === 4 &&
      css`
        transform: scale(1.8);
      `}
        ${({ clicks }) =>
      clicks === 5 &&
      css`
        transform: scale(2);
      `}
  }
  ${({ arrowsAreActive, isPDF }) =>
    arrowsAreActive &&
    isPDF &&
    css`
      width: 80%;
    `}
`

export const FileIndexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
  position: absolute;
  bottom: 72px;
  z-index: 5;
`

export const SelectedImageContainer = styled.div`
  display: flex;
  position: absolute;
  gap: 16px;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`

export const FileIndex = styled.div<{
  fileIndex: number
  currentFile: number
}>`
  width: 26px;
  height: 3px;
  /* margin-right: 16px; */
  border-radius: 5px;
  cursor: pointer;
  ${({ fileIndex, currentFile }) =>
    fileIndex === currentFile
      ? css`
          background-color: ${theme.colors.white};
        `
      : css`
          background-color: grey;
        `}
`

export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  button {
    cursor: pointer;
    margin: 0px 8px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: ${theme.colors.black};
    border-radius: 5px;
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.white};
      transition: all 300ms;
    }
  }
`
