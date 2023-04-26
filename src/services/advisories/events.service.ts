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

const deleteEvent = async (id: number) => {
  const res = await axios.delete(`${apiURL}/id=${id}`, axiosHeader)
  return res.data
}

const editEvent = async (body: {
  id: number
  description: string
  title: string
  date: string
  month: number
  hour: string
}) => {
  const res = await axios.put(`${apiURL}/edit`, body, axiosHeader)
  return res
}

export { createEvent, getEventsByMonth, deleteEvent, editEvent }
