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

export default uploadFile
