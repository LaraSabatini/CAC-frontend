import ReactDOM from "react-dom"
import React from "react"
import { Overlay, ModalCard } from "./styles"

interface ModalResponseInterface {
  cancelFunction?: () => void
  children: JSX.Element[] | JSX.Element
}

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
