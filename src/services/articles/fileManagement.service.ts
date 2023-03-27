import axios from "axios"

const apiURL = "http://localhost:3001/software/api/fileManagement"

const uploadFile = async (formData: any) => {
  try {
    const res = await axios.post(apiURL, formData)
    return res
  } catch (ex) {
    return ex
  }
}

const getFile = async (fileName: string, fileExtension: string) => {
  try {
    const res = await axios.get(
      `${apiURL}/file_name=${fileName}&file_extension=${fileExtension}`,
    )
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

export { uploadFile, deleteFile, getFile }
