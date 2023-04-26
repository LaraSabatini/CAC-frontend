import React, { useState, useEffect } from "react"
import { GrFormClose } from "react-icons/gr"
import { getAdminList } from "services/advisories/advisories.service"
import InputSelect from "components/UI/InputSelect"
import Modal from "components/UI/Modal"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import SearchByAdmin from "./ByAdmin"
import SearchByAvailability from "./ByAvailability"
import { Container, Title, InputContainer } from "./styles"

type AdminType = { id: number; userName: string; email: string }

function RequestAdvisory({ close }: { close: (arg?: any) => void }) {
  const [serverError, setServerError] = useState<boolean>(false)

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
  }, [])

  return (
    <Modal>
      <Container>
        {serverError && (
          <InternalServerError
            visible
            changeVisibility={() => setServerError(false)}
          />
        )}
        <button type="button" className="close" onClick={close}>
          <GrFormClose />
        </button>
        <Title>Agendar asesoria</Title>

        <InputContainer>
          <div className="sub-container">
            <InputSelect
              label="Tipo de busqueda"
              required
              width={380}
              onClick={e => {
                setSearchBy(e.id)
              }}
              options={[
                {
                  id: 14983,
                  value: "Buscar por disponibilidad",
                },
                {
                  id: 38731,
                  value: "Buscar por asesor",
                },
              ]}
            />
          </div>
          {searchBy === 14983 ? (
            <SearchByAvailability close={close} adminList={adminList} />
          ) : (
            <SearchByAdmin
              close={close}
              adminListForSelect={adminListForSelect}
            />
          )}
        </InputContainer>
      </Container>
    </Modal>
  )
}

export default RequestAdvisory
