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
import Input from "components/UI/Input"
import InputSelect from "components/UI/InputSelect"
import Button from "components/UI/Button"
import { Form, HorizontalGroup, ButtonContainer, Error } from "./styles"

function EditPersonalInfo({
  cancelChanges,
  regions,
}: EditPersonalInfoInterface) {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const { profileData, triggerUpdate, setTriggerUpdate } = useContext(
    ProfileContext,
  )
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
      newData.realEstateRegistration,
    )

    if (validate) {
      setFormError("")

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
  }

  return (
    <Form>
      {formError !== "" && <Error>{formError}</Error>}
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />
      <HorizontalGroup>
        <Input
          width={200}
          value={newData.name}
          label={texts.form.name}
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
          width={200}
          value={newData.lastName}
          label={texts.form.surname}
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
      <HorizontalGroup>
        <InputSelect
          width={200}
          label={texts.form.identificationType}
          options={identificationTypes}
          required
          onClick={(e: { id: number; value: string }) => {
            setNewData({
              ...newData,
              identificationType: e.value,
            })
          }}
        />
        <Input
          width={200}
          label={texts.form.identificationNumber}
          required
          type="number"
          value={newData.identificationNumber}
          onChange={e =>
            setNewData({ ...newData, identificationNumber: e.target.value })
          }
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <Input
          width={100}
          label={texts.form.areaCode}
          required
          type="number"
          value={newData.phoneAreaCode}
          onChange={e =>
            setNewData({ ...newData, phoneAreaCode: e.target.value })
          }
        />
        <Input
          width={200}
          label={texts.form.phone}
          required
          type="number"
          value={newData.phoneNumber}
          onChange={e =>
            setNewData({ ...newData, phoneNumber: e.target.value })
          }
        />
      </HorizontalGroup>
      <Input
        label={texts.form.email}
        width={270}
        required
        type="email"
        value={newData.email}
        onChange={e => setNewData({ ...newData, email: e.target.value })}
      />
      <InputSelect
        width={270}
        label="Región"
        options={regions as { id: number; value: string }[]}
        required
        onClick={(e: { id: number; value: string }) => {
          setNewData({
            ...newData,
            region: e.value,
          })
        }}
      />
      <Input
        width={200}
        value={newData.realEstateRegistration}
        label="Matrícula"
        required
        type="text"
        onChange={e =>
          setNewData({
            ...newData,
            realEstateRegistration: e.target.value,
          })
        }
      />
      <ButtonContainer>
        <Button
          content={profileTexts.changePassword.cancel}
          cta={false}
          action={cancelChanges}
        />
        <Button
          content={profileTexts.personalData.save}
          cta
          action={saveChanges}
        />
      </ButtonContainer>
    </Form>
  )
}

export default EditPersonalInfo
