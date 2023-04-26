import { TrainingsInterface } from "interfaces/trainings/Trainings"
import axios from "axios"
import axiosHeader from "services/axiosHeader"
import defaultPost from "../defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/trainings`

const createTraining = async (body: TrainingsInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const getTrainings = async (page: number) => {
  const res = await axios.get(`${apiURL}/page=${page}`, axiosHeader)
  return res.data
}

const deleteTraining = async (id: number) => {
  const res = await axios.delete(`${apiURL}/id=${id}`, axiosHeader)
  return res.data
}

const editTraining = async (body: TrainingsInterface) => {
  const res = await axios.put(`${apiURL}/id=${body.id}`, body, axiosHeader)
  return res.data
}

export { createTraining, getTrainings, deleteTraining, editTraining }
