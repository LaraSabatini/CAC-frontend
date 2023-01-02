import defaultPost from "services/defaultPost"
import apiURL from "./route"

const validateClient = async (body: {
  email: string
  identificationNumber: string
}) => {
  const res = await defaultPost(`${apiURL}/client/validate`, body)
  return res
}

export default validateClient
