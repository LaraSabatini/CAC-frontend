import React from "react"
import ModalStatusInterface from "interfaces/components/ModalStatusInterface"
import { Button } from "antd"
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
            <Button onClick={secondaryButton.action}>
              {secondaryButton.content}
            </Button>
          )}
          {ctaButton && (
            <Button type="primary" onClick={ctaButton.action}>
              {ctaButton.content}
            </Button>
          )}
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default ModalStatus
