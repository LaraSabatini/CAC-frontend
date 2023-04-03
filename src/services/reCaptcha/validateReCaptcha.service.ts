import defaultPost from "services/defaultPost"

const apiURL = "http://camarafederal.com.ar/reCaptcha"

const validateReCaptcha = async (body: { token: string | null }) => {
  const res = await defaultPost(`${apiURL}`, body)
  return res
}

export default validateReCaptcha
