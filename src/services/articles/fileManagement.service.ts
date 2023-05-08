import axios from "axios"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/fileManagement`

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
      `http://camarafederal.com.ar/software/api/files/${fileName}.${fileExtension}`,
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
