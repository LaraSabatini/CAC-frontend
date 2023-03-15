import React, { useContext, useEffect, useState } from "react"
import { ClientsContext } from "contexts/Clients"
import { getFilters } from "services/articles/filters.service"
import capitalizeFirstLetter from "helpers/formatting/capitalizeFirstLetter"
import identificationTypes from "const/identificationTypes"
import texts from "strings/payment.json"
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import { HorizontalGroup, InputContainer } from "../styles"

function Inputs() {
  const { newClient, setNewClient } = useContext(ClientsContext)

  const [regionOptions, setRegionOptions] = useState<
    { id: number; value: string }[]
  >([])

  const fillRegionOptions = async () => {
    const getFiltersCall = await getFilters("regions")
    setRegionOptions(getFiltersCall.data)
  }

  useEffect(() => {
    fillRegionOptions()
  }, [])

  return (
    <InputContainer>
      <HorizontalGroup>
        <Input
          width={230}
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
          width={230}
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
          width={230}
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
          width={230}
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
          width={230}
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
          width={150}
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
      <HorizontalGroup>
        <InputSelect
          label="Region"
          width={230}
          options={regionOptions}
          required
          onClick={(e: { id: number; value: string }) => {
            setNewClient({
              ...newClient,
              region: e.id,
            })
          }}
        />
      </HorizontalGroup>
    </InputContainer>
  )
}

export default Inputs
