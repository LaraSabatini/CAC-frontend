import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { PublicEventsInterface } from "interfaces/content/Advisories"
import defaultPost from "../defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/advisories/events`

const createEvent = async (body: PublicEventsInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const getEventsByMonth = async (month: number) => {
  const res = await axios.get(`${apiURL}/month=${month}`, axiosHeader)
  return res.data
}

const signUpToEvent = async (body: { id: number; clientIds: string }) => {
  const res = await axios.put(`${apiURL}`, body, axiosHeader)
  return res
}

export { createEvent, getEventsByMonth, signUpToEvent }
