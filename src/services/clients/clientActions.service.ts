import axios from "axios"
import axiosHeader from "services/axiosHeader"

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

export { editSavedArticles, getSavedArticles }
