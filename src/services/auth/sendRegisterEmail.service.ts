import defaultPost from "services/defaultPost"
import apiURL from "./route"

const sendRegistarEmail = async (body: {
  recipients: string[]
  name: string
  item: string
  password: string
  loginURL: string
}) => {
  const res = await defaultPost(`${apiURL}/client/register_success_email`, body)
  return res
}

export default sendRegistarEmail
