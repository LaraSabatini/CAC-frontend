import styled from "styled-components"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(36, 38, 42, 0.9);
  z-index: 100;
`

export const ModalCard = styled.div`
  position: fixed;
  top: 14%;
  left: 50%;
  transform: translate(-50%, -14%);
  z-index: 100;
`
