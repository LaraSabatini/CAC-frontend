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

const deleteArticle = async (id: ArticleInterface) => {
  const res = await axios.delete(`${apiURL}/${id}`, axiosHeader)
  return res.data
}

const editArticle = async (body: ArticleInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export {
  createArticle,
  editArticle,
  deleteArticle,
  getArticles,
  getArticleById,
}
