import axios from "axios"
import axiosHeader from "services/axiosHeader"
import {
  AdvisoryInterface,
  AdvisoryAvailavilityInterface,
} from "interfaces/content/Advisories"
import defaultPost from "../defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/advisories`

const getAdvisories = async (
  id: number,
  month: number,
  type: "client" | "admin",
) => {
  const res = await axios.get(
    `${apiURL}/month=${month}&id=${id}&type=${type}`,
    axiosHeader,
  )
  return res.data
}

const requestAdvisory = async (body: AdvisoryInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const requestAdvisoryChange = async (
  from: "client" | "admin",
  body: {
    id: number
    adminId: number
    clientId: number
    date: string
    hour: string
    month: number
    eventURL: string
    status: string
  },
) => {
  const res = await axios.put(
    `${apiURL}/change?from=${from}`,
    body,
    axiosHeader,
  )
  return res
}

const changeAdvisoryStatus = async (
  from: "client" | "admin",
  body: {
    id: number
    adminId: number
    clientId: number
    status: string
  },
) => {
  const res = await axios.put(
    `${apiURL}/status?from=${from}`,
    body,
    axiosHeader,
  )
  return res
}

const createAvailability = async (body: {
  adminId: number
  availability: string
}) => {
  const res = await defaultPost(`${apiURL}/availability`, body)
  return res.data
}

const getAvailability = async (id: number) => {
  const res = await axios.get(
    `${apiURL}/availability/adminId=${id}`,
    axiosHeader,
  )
  return res.data
}

const getAllAvailability = async () => {
  const res = await axios.get(`${apiURL}/all-availability`, axiosHeader)
  return res.data
}

const changeAvailability = async (body: AdvisoryAvailavilityInterface) => {
  const res = await axios.put(`${apiURL}/availability`, body, axiosHeader)
  return res.data
}

const getAdminList = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/admins`,
    axiosHeader,
  )
  return res.data
}

const getAdvisoriesByMonthAndAdmin = async (month: number, adminId: number) => {
  const res = await axios.get(
    `${apiURL}/month-admin/month=${month}&adminId=${adminId}`,
    axiosHeader,
  )
  return res.data
}

const getAllAdvisoriesByMonth = async (month: number) => {
  const res = await axios.get(`${apiURL}/month/month=${month}`, axiosHeader)
  return res.data
}

export {
  getAdvisories,
  requestAdvisory,
  requestAdvisoryChange,
  changeAdvisoryStatus,
  createAvailability,
  getAvailability,
  changeAvailability,
  getAdminList,
  getAdvisoriesByMonthAndAdmin,
  getAllAdvisoriesByMonth,
  getAllAvailability,
}
