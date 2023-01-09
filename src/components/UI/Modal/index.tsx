import ReactDOM from "react-dom"
import React from "react"
import ModalResponseInterface from "interfaces/components/ModalResponseInterface"
import { Overlay, ModalCard } from "./styles"

const Modal: React.FC<ModalResponseInterface> = ({ children }) => {
  const portal = document.getElementById("overlay") as HTMLElement

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <ModalCard>{children}</ModalCard>
    </>,
    portal,
  )
}

export default Modal
