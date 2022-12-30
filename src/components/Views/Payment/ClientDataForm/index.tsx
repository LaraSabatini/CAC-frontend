import React from "react"
import Modal from "components/UI/Modal"
// import { PaymentContext } from "contexts/Payment"
import identificationTypes from "const/identificationTypes"
import texts from "strings/payment.json"
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import {
  FormContainer,
  Title,
  ButtonContainer,
  ContinueButton,
  CancelButton,
  HorizontalGroup,
} from "./styles"

interface ClientDataFormInterface {
  closeModal: (arg?: any) => void
}

function ClientDataForm({ closeModal }: ClientDataFormInterface) {
  // const { setPayment } = useContext(PaymentContext)

  return (
    <Modal>
      <FormContainer>
        <Title>{texts.form.title}</Title>
        <HorizontalGroup>
          <Input width={200} label="Nombre" required type="text" />
          <Input width={235} label="Apellido" required type="text" />
        </HorizontalGroup>
        <HorizontalGroup>
          <InputSelect
            label="Tipo de documento"
            width={200}
            options={identificationTypes}
            required
          />
          <Input width={235} label="Nº  de documento" required type="text" />
        </HorizontalGroup>
        <HorizontalGroup>
          <Input width={200} label="Email" required type="email" />
          <Input width={100} label="Cod. area" required type="number" />
          <Input width={140} label="Nº  de telefono" required type="number" />
        </HorizontalGroup>

        <ButtonContainer>
          <CancelButton type="button" onClick={closeModal}>
            {texts.form.cancel}
          </CancelButton>
          <ContinueButton type="button">{texts.form.next}</ContinueButton>
        </ButtonContainer>
      </FormContainer>
    </Modal>
  )
}

export default ClientDataForm
