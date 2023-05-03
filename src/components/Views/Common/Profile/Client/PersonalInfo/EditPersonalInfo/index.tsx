import React, { useState, useContext } from "react"
import { ProfileContext } from "contexts/Profile"
import editProfile from "services/auth/editProfile.service"
import {
  validateEmail,
  validateIdentificationNumber,
} from "services/auth/validateClient.service"
import {
  DataInterface,
  EditPersonalInfoInterface,
} from "interfaces/components/PersonalInfoInterface"
import capitalizeFirstLetter from "helpers/formatting/capitalizeFirstLetter"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import texts from "strings/payment.json"
import profileTexts from "strings/profile.json"
import ClientInterface from "interfaces/users/Client"
import frontValidation from "helpers/forms/validateFrontRegistration"
import identificationTypes from "const/identificationTypes"
import regions from "const/regions"
import amountOfBuildings from "const/amountOfBuildings"
import { Input, Select, DatePicker, Button } from "antd"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Form, HorizontalGroup, ButtonContainer, Error, Label } from "./styles"

dayjs.extend(customParseFormat)

function EditPersonalInfo({ cancelChanges }: EditPersonalInfoInterface) {
  const userData = JSON.parse(localStorage.getItem("userData") as string)
  const dateFormat = "DD/MM/YYYY"

  const { profileData, triggerUpdate, setTriggerUpdate } = useContext(
    ProfileContext,
  )

  const [loading, setLoading] = useState<boolean>(false)

  const [serverError, setServerError] = useState<boolean>(false)

  const data = profileData as ClientInterface

  const [newData, setNewData] = useState<DataInterface>({
    name: `${data.name}`,
    lastName: `${data.lastName}`,
    identificationType: `${data.identificationType}`,
    identificationNumber: `${data.identificationNumber}`,
    phoneAreaCode: `${data.phoneAreaCode}`,
    phoneNumber: `${data.phoneNumber}`,
    email: `${data.email}`,
    region: data.region,
    realEstateRegistration: data.realEstateRegistration,
    amountOfBuildings: data.amountOfBuildings,
    activityStartDate: data.activityStartDate,
    birthdate: data.birthdate,
  })
  const [formError, setFormError] = useState<string>("")

  const saveChanges = async () => {
    const validate = frontValidation(
      newData.name,
      newData.lastName,
      newData.email,
      newData.phoneAreaCode,
      newData.phoneNumber,
      newData.identificationNumber,
    )

    if (validate) {
      setFormError("")
      setLoading(true)

      let emailValidation: boolean = true
      let identificationNumberValidation: boolean = true

      if (newData.email !== data.email) {
        const validateEmailReq = await validateEmail({ email: newData.email })

        emailValidation =
          validateEmailReq.status === 200 &&
          validateEmailReq.info === "available"

        if (validateEmailReq.status === 500) {
          setServerError(true)
        }
      }

      if (newData.identificationNumber !== data.identificationNumber) {
        const validateIdentificationNumberReq = await validateIdentificationNumber(
          {
            identificationNumber: newData.identificationNumber,
          },
        )
        identificationNumberValidation =
          validateIdentificationNumberReq.status === 200 &&
          validateIdentificationNumberReq.info === "available"

        if (validateIdentificationNumberReq.status === 500) {
          setServerError(true)
        }
      }

      if (emailValidation && identificationNumberValidation) {
        const editProfileReq = await editProfile("client", userData.id, {
          ...newData,
          firstLogin: 0,
        })
        if (editProfileReq.status === 201) {
          cancelChanges()
          setTriggerUpdate(triggerUpdate + 1)
        } else {
          setServerError(true)
        }
      } else {
        setFormError(texts.form.duplicatedError)
      }
    } else {
      setFormError(texts.form.requiredError)
    }
    setLoading(false)
  }

  return (
    <Form>
      {formError !== "" && <Error>{formError}</Error>}
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />
      <Label>Nombre y Apellido</Label>
      <HorizontalGroup>
        <Input
          value={newData.name}
          placeholder={texts.form.name}
          required
          type="text"
          onChange={e =>
            setNewData({
              ...newData,
              name: capitalizeFirstLetter(e.target.value),
            })
          }
        />
        <Input
          value={newData.lastName}
          placeholder={texts.form.surname}
          required
          type="text"
          onChange={e =>
            setNewData({
              ...newData,
              lastName: capitalizeFirstLetter(e.target.value),
            })
          }
        />
      </HorizontalGroup>
      <Label>Tipo y nº de documento</Label>
      <HorizontalGroup>
        <Select
          defaultValue={identificationTypes[0]}
          placeholder={texts.form.identificationType}
          style={{ width: 200 }}
          onChange={(e: { id: number; value: string }) => {
            setNewData({
              ...newData,
              identificationType: e.value,
            })
          }}
          options={identificationTypes}
        />
        <Input
          style={{ width: 200 }}
          placeholder={texts.form.identificationNumber}
          required
          value={newData.identificationNumber}
          onChange={e =>
            setNewData({ ...newData, identificationNumber: e.target.value })
          }
        />
      </HorizontalGroup>
      <Label>{texts.form.phone}</Label>
      <HorizontalGroup>
        <Input
          style={{ width: 100 }}
          placeholder={texts.form.areaCode}
          required
          value={newData.phoneAreaCode}
          onChange={e =>
            setNewData({ ...newData, phoneAreaCode: e.target.value })
          }
        />
        <Input
          style={{ width: 200 }}
          placeholder={texts.form.phone}
          required
          value={newData.phoneNumber}
          onChange={e =>
            setNewData({ ...newData, phoneNumber: e.target.value })
          }
        />
      </HorizontalGroup>
      <Label>Email</Label>
      <HorizontalGroup>
        <Input
          placeholder={texts.form.email}
          required
          value={newData.email}
          onChange={e => setNewData({ ...newData, email: e.target.value })}
        />
      </HorizontalGroup>

      <Label>Región y Cantidad de edificios</Label>
      <HorizontalGroup>
        <Select
          defaultValue={
            regions.filter(region => region.value === newData.region)[0]
          }
          placeholder={texts.form.identificationType}
          style={{ width: 200 }}
          onChange={(e: { id: number; value: string }) => {
            setNewData({
              ...newData,
              region: e.value,
            })
          }}
          options={regions}
        />
        <Select
          defaultValue={
            amountOfBuildings.filter(
              amount => amount.value === newData.amountOfBuildings,
            )[0]
          }
          placeholder="Cantidad de edificios"
          style={{ width: 200 }}
          onChange={(e: { id: number; value: string }) => {
            setNewData({
              ...newData,
              amountOfBuildings: e.value,
            })
          }}
          options={amountOfBuildings}
        />
      </HorizontalGroup>
      <Label>Fecha de nacimiento e inicio de actividad</Label>
      <HorizontalGroup>
        <DatePicker
          placeholder="Fecha de nacimiento"
          defaultValue={dayjs(
            `${newData.birthdate.replaceAll("-", "/")}`,
            dateFormat,
          )}
          style={{ width: 215 }}
          format={dateFormat}
          onChange={(e: any) => {
            if (e !== null) {
              const day = e.$D > 9 ? e.$D : `0${e.$D}`
              const month = e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`

              setNewData({
                ...newData,
                birthdate: `${day}-${month}-${e.$y}`,
              })
            }
          }}
        />
        <DatePicker
          placeholder="Inicio de actividad"
          defaultValue={dayjs(
            `${newData.activityStartDate.replaceAll("-", "/")}`,
            dateFormat,
          )}
          style={{ width: 215 }}
          format={dateFormat}
          onChange={(e: any) => {
            if (e !== null) {
              const day = e.$D > 9 ? e.$D : `0${e.$D}`
              const month = e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`

              setNewData({
                ...newData,
                activityStartDate: `${day}-${month}-${e.$y}`,
              })
            }
          }}
        />
      </HorizontalGroup>

      <Label>Nº de matrícula</Label>
      <HorizontalGroup>
        <Input
          value={newData.realEstateRegistration}
          placeholder="Matrícula"
          required
          type="text"
          onChange={e =>
            setNewData({
              ...newData,
              realEstateRegistration: e.target.value,
            })
          }
        />
      </HorizontalGroup>
      <ButtonContainer>
        <Button onClick={cancelChanges}>
          {profileTexts.changePassword.cancel}
        </Button>
        <Button loading={loading} type="primary" onClick={saveChanges}>
          {profileTexts.personalData.save}
        </Button>
      </ButtonContainer>
    </Form>
  )
}

export default EditPersonalInfo
