import axios from "axios"
import axiosHeader from "services/axiosHeader"
import ArticleInterface from "interfaces/content/Article"
import defaultPost from "../defaultPost"

const apiURL = "http://localhost:3001/articles"

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

export {
  createArticle,
  editArticle,
  deleteArticle,
  getArticles,
  getArticleById,
  getRelatedArticles,
  filterArticles,
}
