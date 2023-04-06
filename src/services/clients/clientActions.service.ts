import axios from "axios"
import axiosHeader from "services/axiosHeader"
import CommentsInterface from "interfaces/users/Comments"
import defaultPost from "../defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/clients`

const editSavedArticles = async (id: number, articleList: string) => {
  const res = await axios.put(
    `${apiURL}/saved-articles/id=${id}`,
    {
      savedArticles: articleList,
    },
    axiosHeader,
  )
  return res.data
}

const getSavedArticles = async (id: number) => {
  const res = await axios.get(`${apiURL}/saved-articles/id=${id}`, axiosHeader)
  return res.data
}

const getClientComments = async (id: number) => {
  const res = await axios.get(`${apiURL}/comments/id=${id}`, axiosHeader)
  return res.data
}

const createClientComment = async (body: CommentsInterface) => {
  const res = await defaultPost(`${apiURL}/comments`, body)
  return res
}

export {
  editSavedArticles,
  getSavedArticles,
  getClientComments,
  createClientComment,
}
