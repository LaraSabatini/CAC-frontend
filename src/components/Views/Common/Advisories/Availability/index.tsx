import React, { useState, useEffect, useContext } from "react"
import {
  getAvailability,
  createAvailability,
  changeAvailability,
} from "services/advisories/advisories.service"
import { AdvisoriesContext } from "contexts/Advisories"
import { days, listHours } from "const/dates"
import { ScheduleOutlined } from "@ant-design/icons"
import { Modal, Select } from "antd"

import { ScheduleAdvisory } from "../styles"

function Availability() {
  const { setServerError } = useContext(AdvisoriesContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [availabilityModal, setAvailabilityModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const virginList = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  }

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [availabilityId, setAvailabilityId] = useState<number>(0)

  const [availabilityList, setAvailabilityList] = useState<{
    sunday: number[]
    monday: number[]
    tuesday: number[]
    wednesday: number[]
    thursday: number[]
    friday: number[]
    saturday: number[]
  }>(virginList)

  const getAdminData = async () => {
    const getAvailabilityCall = await getAvailability(userData?.id)
    if (getAvailabilityCall.status === 200) {
      setAvailabilityList(
        getAvailabilityCall.data.length === 0
          ? virginList
          : JSON.parse(getAvailabilityCall.data[0].availability),
      )

      setIsEditing(getAvailabilityCall.data.length > 0)
      setAvailabilityId(
        getAvailabilityCall.data.length === 0
          ? 0
          : getAvailabilityCall.data[0].id,
      )
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    getAdminData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const success = () => {
    Modal.success({
      title: "Excelente!",
      content: "Tu disponibilidad se ha modificado con exito",
      onOk() {
        setAvailabilityModal(false)
      },
    })
  }

  const saveAvailability = async () => {
    setLoading(true)
    if (isEditing) {
      const changeAvailabilityCall = await changeAvailability({
        id: availabilityId,
        adminId: userData?.id,
        availability: JSON.stringify(availabilityList),
      })
      if (changeAvailabilityCall.status === 201) {
        success()
        setLoading(false)
      } else {
        setServerError(true)
      }
    } else {
      const createAvailabilityCall = await createAvailability({
        adminId: userData?.id,
        availability: JSON.stringify(availabilityList),
      })
      if (createAvailabilityCall.status === 201) {
        success()
        setLoading(false)
      } else {
        setServerError(true)
      }
    }
  }

  const getDefaultValues = (key: any) => {
    const newArray: string[] = []

    const day: number[] = availabilityList[key as keyof typeof availabilityList]

    day.forEach(hola => {
      const filterHours = listHours.filter(item => item.id === hola)
      if (filterHours.length > 0) {
        newArray.push(filterHours[0].value)
      }
    })

    return newArray
  }

  return (
    <>
      <ScheduleAdvisory onClick={() => setAvailabilityModal(true)}>
        <ScheduleOutlined />
        Agregar / Modificar disponibilidad
      </ScheduleAdvisory>
      <Modal
        title="Agregar o modificar disponibilidad horaria"
        open={availabilityModal}
        onOk={saveAvailability}
        onCancel={() => {
          setAvailabilityModal(false)
        }}
        okText="Crear"
        cancelText="Cancelar"
        confirmLoading={loading}
      >
        {days.map(day => (
          <div style={{ paddingBottom: "15px" }}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: 475 }}
              placeholder={day.name}
              defaultValue={getDefaultValues(day.value)}
              onChange={value => {
                const ids: number[] = []
                value.forEach((item: string) => {
                  const filterItem = listHours.filter(
                    hour => hour.value === item,
                  )
                  if (filterItem.length > 0) {
                    ids.push(filterItem[0].id)
                  }
                })
                setAvailabilityList({
                  ...availabilityList,
                  [day.value]: ids,
                })
              }}
              options={listHours}
            />
          </div>
        ))}
      </Modal>
    </>
  )
}

export default Availability
