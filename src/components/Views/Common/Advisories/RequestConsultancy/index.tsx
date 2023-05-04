import React, { useState, useEffect, useContext } from "react"
import { getAdminList } from "services/advisories/advisories.service"
import { AdvisoriesContext } from "contexts/Advisories"
import { CalendarOutlined } from "@ant-design/icons"
import { Modal, Select } from "antd"
import SearchByAdmin from "./ByAdmin"
import SearchByAvailability from "./ByAvailability"
import { ScheduleAdvisory } from "../styles"

type AdminType = { id: number; userName: string; email: string }

function RequestAdvisory({ updateList }: { updateList: (arg?: any) => void }) {
  const { setServerError } = useContext(AdvisoriesContext)

  const [requestAdvisoryModal, setRequestAdvisoryModal] = useState<boolean>(
    false,
  )

  const [searchBy, setSearchBy] = useState<number>(14983)
  const [adminList, setAdminList] = useState<AdminType[]>([])
  const [adminListForSelect, setAdminListForSelect] = useState<
    { id: number; value: string }[]
  >([])

  const getAdmins = async () => {
    const getAdminListCall = await getAdminList()
    if (getAdminListCall.status === 200) {
      setAdminList(getAdminListCall.data)

      const list: { id: number; value: string }[] = []
      getAdminListCall.data.forEach((admin: AdminType) =>
        list.push({ id: admin.id, value: admin.userName }),
      )
      setAdminListForSelect(list)
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    getAdmins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const options = [
    {
      id: 14983,
      value: "Buscar por disponibilidad",
    },
    {
      id: 38731,
      value: "Buscar por asesor",
    },
  ]

  return (
    <>
      <ScheduleAdvisory onClick={() => setRequestAdvisoryModal(true)}>
        <CalendarOutlined />
        Solicitar asesoría
      </ScheduleAdvisory>
      <Modal
        title="Agendar asesoría"
        width={420}
        open={requestAdvisoryModal}
        footer={null}
        onCancel={() => {
          setRequestAdvisoryModal(false)
        }}
      >
        <Select
          defaultValue="Buscar por disponibilidad"
          style={{ width: 350 }}
          onChange={value => {
            const filterOption = options.filter(
              option => option.value === value,
            )
            setSearchBy(filterOption[0].id)
          }}
          options={options}
        />
        {searchBy === 14983 ? (
          <SearchByAvailability
            close={() => {
              updateList()
              setRequestAdvisoryModal(false)
            }}
            adminList={adminList}
          />
        ) : (
          <SearchByAdmin
            close={() => {
              updateList()
              setRequestAdvisoryModal(false)
            }}
            adminListForSelect={adminListForSelect}
          />
        )}
      </Modal>
    </>
  )
}

export default RequestAdvisory
