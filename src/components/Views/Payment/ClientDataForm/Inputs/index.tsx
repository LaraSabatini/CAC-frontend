import React, { useContext } from "react"
import { ClientsContext } from "contexts/Clients"
import capitalizeFirstLetter from "helpers/formatting/capitalizeFirstLetter"
import identificationTypes from "const/identificationTypes"
import texts from "strings/payment.json"
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import { HorizontalGroup } from "../styles"

function Inputs() {
  const { newClient, setNewClient } = useContext(ClientsContext)

  return (
    <>
      <HorizontalGroup>
        <Input
          width={200}
          label={texts.form.name}
          required
          type="text"
          onChange={e => {
            const name = capitalizeFirstLetter(e.target.value)
            setNewClient({
              ...newClient,
              name,
            })
          }}
        />
        <Input
          width={270}
          label={texts.form.surname}
          required
          type="text"
          onChange={e => {
            const lastName = capitalizeFirstLetter(e.target.value)
            setNewClient({
              ...newClient,
              lastName,
            })
          }}
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <InputSelect
          label={texts.form.identificationType}
          width={200}
          options={identificationTypes}
          required
          onClick={(e: { id: number; value: string }) => {
            setNewClient({
              ...newClient,
              identificationType: e.value,
            })
          }}
        />
        <Input
          width={270}
          label={texts.form.identificationNumber}
          required
          type="text"
          onChange={e =>
            setNewClient({
              ...newClient,
              identificationNumber: e.target.value,
            })
          }
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <Input
          width={200}
          label={texts.form.email}
          required
          type="email"
          onChange={e => {
            setNewClient({
              ...newClient,
              email: e.target.value,
            })
          }}
        />
        <Input
          width={100}
          label={texts.form.areaCode}
          required
          type="number"
          onChange={e => {
            setNewClient({
              ...newClient,
              phoneAreaCode: e.target.value,
            })
          }}
        />
        <Input
          width={175}
          label={texts.form.phone}
          required
          type="number"
          onChange={e => {
            setNewClient({
              ...newClient,
              phoneNumber: e.target.value,
            })
          }}
        />
      </HorizontalGroup>
    </>
  )
}

export default Inputs
