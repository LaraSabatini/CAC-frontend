import defaultPost from "services/defaultPost"

const apiURL = "/users/"

const login = async (
  type: "admin" | "client",
  body: { email: string; password: string },
) => {
  const res = await defaultPost(`${apiURL}${type}/login`, body)
  return res
}

export default login
