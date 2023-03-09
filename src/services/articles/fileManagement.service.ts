import axios from "axios"

const apiURL = "http://localhost:3001/fileManagement"

const uploadFile = async (formData: any) => {
  try {
    const res = await axios.post(apiURL, formData)
    return res
  } catch (ex) {
    return ex
  }
}

const deleteFile = async (route: string) => {
  try {
    const res = await axios.delete(`${apiURL}/route=${route}`)
    return res
  } catch (ex) {
    return ex
  }
}

export { uploadFile, deleteFile }
