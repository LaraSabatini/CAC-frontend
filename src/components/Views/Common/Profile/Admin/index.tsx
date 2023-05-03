/* eslint-disable no-console */
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { EditOutlined } from "@ant-design/icons"
import { Tooltip, Button, Input } from "antd"
import getAdminName, { editData } from "services/admins/getAdmin.service"
import ChangePasswordModal from "../ChangePasswordModal"
import { Container, DataCard } from "./styles"

function AdminProfile() {
  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [name, setName] = useState<string>("")
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [newData, setNewData] = useState<{
    id: number
    userName: string
    email: string
  }>({
    id: userData?.id,
    userName: name,
    email: userData?.user,
  })

  const getData = async () => {
    const data = await getAdminName(userData?.id)

    setName(data.data[0].userName)
    setNewData({
      id: userData?.id,
      userName: data.data[0].userName,
      email: userData?.user,
    })
  }

  const saveChanges = async () => {
    if (newData.userName !== "" && newData.email !== "") {
      setLoading(true)
      const req = await editData(newData)
      if (req.status === 200) {
        setLoading(false)
        setIsEditing(false)
      }
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <DataCard>
        {!isEditing ? (
          <div>
            <p>
              <b>Nombre de usuario:</b> {newData.userName}
            </p>
            <p>
              <b>Email:</b> {userData?.user}
            </p>
          </div>
        ) : (
          <div className="inputs">
            <Input
              style={{ width: 300 }}
              value={newData.userName}
              placeholder="Nombre"
              onChange={e =>
                setNewData({
                  ...newData,
                  userName: e.target.value,
                })
              }
            />
            <Input
              style={{ width: 300 }}
              value={newData.email}
              placeholder="Nombre"
              onChange={e =>
                setNewData({
                  ...newData,
                  userName: e.target.value,
                })
              }
            />
          </div>
        )}
        {!isEditing && (
          <div className="head">
            <Tooltip title="Editar datos">
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
              />
            </Tooltip>
          </div>
        )}
      </DataCard>
      {isEditing && (
        <div className="buttons">
          <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
          <Button loading={loading} onClick={saveChanges} type="primary">
            Guardar cambios
          </Button>
        </div>
      )}
      <ChangePasswordModal
        cantCancel={router.query.change_password === "true"}
      />
    </Container>
  )
}

export default AdminProfile
