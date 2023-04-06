import axios from "axios"
import axiosHeader from "services/axiosHeader"
import ArticleInterface from "interfaces/content/Article"
import defaultPost from "../defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/articles`

const getArticles = async (page: number) => {
  const res = await axios.get(`${apiURL}/page=${page}`, axiosHeader)
  return res.data
}

const getArticleById = async (id: number) => {
  const res = await axios.get(`${apiURL}/id=${id}`, axiosHeader)
  return res.data
}

const createArticle = async (body: ArticleInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const deleteArticle = async (id: number) => {
  const res = await axios.delete(`${apiURL}/id=${id}`, axiosHeader)
  return res.data
}

const editArticle = async (body: ArticleInterface) => {
  const res = await axios.put(`${apiURL}/id=${body.id}`, body, axiosHeader)
  return res.data
}

const editSavedTimes = async (
  id: number,
  action: "add" | "remove",
  prevAmount: number,
) => {
  const res = await axios.put(
    `${apiURL}/saved/id=${id}&action=${action}&prevAmount=${prevAmount}`,
    axiosHeader,
  )
  return res.data
}

const getRelatedArticles = async (themeId: number, regionId: number) => {
  const res = await axios.get(
    `${apiURL}/related-articles/themeId=${themeId}&regionId=${regionId}`,
    axiosHeader,
  )
  return res.data
}

const filterArticles = async (body: {
  regionIds: number[]
  themeIds: number[]
}) => {
  const res = await defaultPost(`${apiURL}/filterArticles`, body)
  return res
}

const searchArticles = async (body: { search: string }) => {
  const res = await defaultPost(`${apiURL}/search`, body)
  return res
}

export {
  createArticle,
  editArticle,
  deleteArticle,
  getArticles,
  getArticleById,
  getRelatedArticles,
  filterArticles,
  searchArticles,
  editSavedTimes,
}
