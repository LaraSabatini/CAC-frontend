import defaultPost from "services/defaultPost"
import apiURL from "./route"

export const validateEmail = async (body: { email: string }) => {
  const res = await defaultPost(`${apiURL}/client/validate-email`, body)
  return res
}

export const validateIdentificationNumber = async (body: {
  identificationNumber: string
}) => {
  const res = await defaultPost(
    `${apiURL}/client/validate-identification_number`,
    body,
  )
  return res
}
