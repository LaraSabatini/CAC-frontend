import React from "react"
import Button from "components/UI/Button"
import Modal from "components/UI/Modal"
import Icon from "components/UI/Assets/Icon"
import {
  ModalContainer,
  Title,
  SelfCloseButton,
  StatusIconContainer,
  Description,
  ButtonContainer,
} from "./styles"

interface ModalStatusInterface {
  title: string
  description: string
  status: "error" | "success" | "warning" | "notice"
  ctaButton?: {
    content: string
    action: (arg?: any) => void
  }
  secondaryButton?: {
    content: string
    action: (arg?: any) => void
  }
  selfClose?: boolean
  selfCloseAction?: (arg?: any) => void
}

function ModalStatus({
  title,
  description,
  status,
  ctaButton,
  secondaryButton,
  selfClose,
  selfCloseAction,
}: ModalStatusInterface) {
  return (
    <Modal>
      <ModalContainer>
        {selfClose && (
          <SelfCloseButton type="button" onClick={selfCloseAction}>
            <Icon icon="Error" width="20" height="20" />
          </SelfCloseButton>
        )}
        {status === "error" && (
          <StatusIconContainer status={status}>
            <Icon icon="Error" color="#fff" width="50" height="50" />
          </StatusIconContainer>
        )}
        {status === "success" && (
          <StatusIconContainer status={status}>
            <Icon icon="CheckModal" color="#fff" width="70" height="70" />
          </StatusIconContainer>
        )}
        {status === "warning" && (
          <StatusIconContainer status={status}>
            <Icon icon="Alert" color="#fff" width="45" height="45" />
          </StatusIconContainer>
        )}
        {status === "notice" && (
          <StatusIconContainer status={status}>
            <Icon icon="Notice" color="#fff" width="45" height="45" />
          </StatusIconContainer>
        )}
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonContainer>
          {secondaryButton && (
            <Button
              cta={false}
              content={secondaryButton.content}
              action={secondaryButton.action}
            />
          )}
          {ctaButton && (
            <Button cta content={ctaButton.content} action={ctaButton.action} />
          )}
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default ModalStatus
