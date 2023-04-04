import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/reCaptcha`

const validateReCaptcha = async (body: { token: string | null }) => {
  const res = await defaultPost(`${apiURL}`, body)
  return res
}

export default validateReCaptcha
