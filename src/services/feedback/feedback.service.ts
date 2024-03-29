import axios from "axios"
import axiosHeader from "services/axiosHeader"
import FeedbackInterface from "interfaces/users/Feedback"
import defaultPost from "../defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/feedback`

const getFeedback = async (page: number) => {
  const res = await axios.get(`${apiURL}/page=${page}`, axiosHeader)
  return res.data
}

const createFeedback = async (body: FeedbackInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export { createFeedback, getFeedback }
