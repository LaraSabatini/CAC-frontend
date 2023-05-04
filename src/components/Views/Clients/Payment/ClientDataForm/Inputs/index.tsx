import React, { useContext } from "react"
import { ClientsContext } from "contexts/Clients"
import { PaymentContext } from "contexts/Payment"
import capitalizeFirstLetter from "helpers/formatting/capitalizeFirstLetter"
import identificationTypes from "const/identificationTypes"
import texts from "strings/payment.json"
import regionOptions from "const/regions"
import { Input, Select, Tooltip, DatePicker } from "antd"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { HorizontalGroup, InputContainer } from "../styles"

dayjs.extend(customParseFormat)

function Inputs() {
  const dateFormat = "DD/MM/YYYY"

  const { newClient, setNewClient } = useContext(ClientsContext)
  const { formError } = useContext(PaymentContext)

  const validateError = (key: string) => {
    return formError !== "" && newClient[key as keyof typeof newClient] === ""
      ? "error"
      : ""
  }

  const amountOfBuildings = [
    { id: 222, value: "1 a 5" },
    { id: 223, value: "5 a 10" },
    { id: 224, value: "10 a 20" },
    { id: 225, value: "+ de 20" },
  ]

  return (
    <InputContainer>
      <HorizontalGroup>
        <Input
          placeholder="Nombre*"
          required
          status={validateError("name")}
          style={{ width: 215 }}
          onChange={e => {
            const name = capitalizeFirstLetter(e.target.value)
            setNewClient({
              ...newClient,
              name,
            })
          }}
        />
        <Input
          placeholder="Apellido*"
          status={validateError("lastName")}
          style={{ width: 215 }}
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
        <Select
          defaultValue={identificationTypes[0].value}
          placeholder={texts.form.identificationType}
          style={{ width: 215 }}
          status={validateError("identificationType")}
          onChange={e =>
            setNewClient({
              ...newClient,
              identificationType: e,
            })
          }
          options={identificationTypes}
        />
        <Input
          placeholder={texts.form.identificationNumber}
          style={{ width: 215 }}
          status={validateError("identificationNumber")}
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
          placeholder={texts.form.email}
          style={{ width: 215 }}
          status={validateError("email")}
          onChange={e =>
            setNewClient({
              ...newClient,
              email: e.target.value,
            })
          }
        />

        <div className="sub">
          <Tooltip
            trigger={["focus"]}
            title={texts.form.areaCode}
            placement="topLeft"
            overlayClassName="numeric-input"
          >
            <Input
              placeholder={texts.form.areaCode}
              style={{ width: 60 }}
              status={validateError("phoneAreaCode")}
              onChange={e => {
                setNewClient({
                  ...newClient,
                  phoneAreaCode: e.target.value,
                })
              }}
            />
          </Tooltip>
          <Input
            placeholder={texts.form.phone}
            style={{ width: 140 }}
            status={validateError("phoneNumber")}
            onChange={e =>
              setNewClient({
                ...newClient,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
      </HorizontalGroup>
      <HorizontalGroup>
        <Select
          placeholder="Región"
          defaultValue={regionOptions[1].value}
          style={{ width: 215 }}
          status={validateError("region")}
          onChange={e => {
            setNewClient({
              ...newClient,
              region: e,
            })
          }}
          options={regionOptions}
        />
        <Input
          placeholder="Matrícula"
          style={{ width: 215 }}
          onChange={e =>
            setNewClient({
              ...newClient,
              realEstateRegistration: e.target.value,
            })
          }
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <DatePicker
          placeholder="Fecha de nacimiento"
          style={{ width: 215 }}
          format={dateFormat}
          onChange={(e: any) => {
            if (e !== null) {
              const day = e.$D > 9 ? e.$D : `0${e.$D}`
              const month = e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`

              setNewClient({
                ...newClient,
                birthdate: `${day}-${month}-${e.$y}`,
              })
            }
          }}
        />
        <DatePicker
          placeholder="Inicio de actividad"
          style={{ width: 215 }}
          format={dateFormat}
          onChange={(e: any) => {
            if (e !== null) {
              const day = e.$D > 9 ? e.$D : `0${e.$D}`
              const month = e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`

              setNewClient({
                ...newClient,
                activityStartDate: `${day}-${month}-${e.$y}`,
              })
            }
          }}
        />
        <Select
          placeholder="Cantidad actual de edificios"
          style={{ width: 215 }}
          onChange={e =>
            setNewClient({
              ...newClient,
              amountOfBuildings: e,
            })
          }
          options={amountOfBuildings}
        />
      </HorizontalGroup>
    </InputContainer>
  )
}

export default Inputs
