/* eslint-disable no-console */
import React, { useEffect, useState, useRef, ChangeEvent } from "react"
import { useRouter } from "next/router"
import { EditOutlined, UploadOutlined } from "@ant-design/icons"
import Icon from "components/UI/Assets/Icon"
import { Tooltip, Button, Input, Modal } from "antd"
import getAdminName, { editData } from "services/admins/getAdmin.service"
import {
  uploadPic,
  getProfilePic,
  removeProfilePic,
} from "services/admins/profilePic.service"
import ChangePasswordModal from "../ChangePasswordModal"
import {
  Container,
  DataCard,
  ProfilePicContainer,
  ModalContent,
} from "./styles"

function AdminProfile() {
  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const hiddenImageInput = useRef<HTMLInputElement>(null)

  const [loadingProfile, setLoadingProfile] = useState<boolean>(false)
  const [currentImg, setCurrentImg] = useState<string>(userData?.profilePic)
  const [newImg, setNewImg] = useState<File>()

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


  const success = () => {
    Modal.success({
      content: "Acción realizada con éxito",
      async onOk() {
        setOpenModal(false)
        const updatePic = await getProfilePic(userData?.id, newData.userName)

        const newUserData = {
          id: userData?.id,
          firstLogin: userData?.firstLogin,
          logged: userData?.logged,
          paymentExpireDate: userData?.paymentExpireDate,
          profilePic: updatePic.data[0].profilePic,
          type: userData?.type,
          user: userData?.user,
        }
        localStorage.setItem("userData", JSON.stringify(newUserData))
        router.reload()
      },
    })
  }

  const changeProfile = async () => {
    if (newImg !== undefined && currentImg !== userData?.profilePic) {
      setLoadingProfile(true)
      const formData = new FormData()
      const fileName = `${newImg.name.split(".")[0]}.${
        newImg.name.split(".")[1]
      }`
      formData.append("file", newImg)
      formData.append("fileName", fileName)

      const req: any = await uploadPic(formData, userData?.id)

      if (req.data.code === 201) {
        setLoadingProfile(false)
        success()
      }
    }

    if (newImg === undefined && currentImg !== userData?.profilePic) {
      setLoadingProfile(true)

      const req = await removeProfilePic(userData?.id)

      if (req.status === 200) {
        setLoadingProfile(false)
        success()
      }
    }

    if (newImg === undefined && currentImg === userData?.profilePic) {
      setOpenModal(false)
      setCurrentImg(userData?.profilePic)
      setNewImg(undefined)
    }
  }

  const reader = new FileReader()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const { files } = e.target

      setCurrentImg(URL.createObjectURL(files[0]))
      reader.readAsDataURL(files[0])

      const originalName = files[0].name

      const fileRenamed = originalName.replaceAll(" ", "-")

      const newFile = new File([files[0]], fileRenamed, {
        type: files[0].type,
      })

      setNewImg(newFile)
    }
  }

  return (
    <Container>
      <Modal
        title="Editar foto de perfil"
        open={openModal}
        width={350}
        onOk={changeProfile}
        onCancel={() => {
          setOpenModal(false)
          setCurrentImg(userData?.profilePic)
          setNewImg(undefined)
        }}
        okText="Guardar cambios"
        cancelText="Cancelar"
        confirmLoading={loadingProfile}
      >
        <ModalContent>
          <div className="photo">
            {currentImg !== "" ? (
              <img src={currentImg} alt="Profile" />
            ) : (
              <p>
                <Icon icon="Profile" />
                No hay una foto seleccionada
              </p>
            )}
          </div>
          <div className="buttons">
            <Button
              danger
              onClick={() => {
                setCurrentImg("")
                setNewImg(undefined)
              }}
            >
              Eliminar foto
            </Button>
            <Button
              icon={<UploadOutlined />}
              onClick={() => {
                if (hiddenImageInput.current !== null) {
                  hiddenImageInput.current.click()
                }
              }}
            >
              Subir foto
              <input
                ref={hiddenImageInput}
                style={{ display: "none" }}
                type="file"
                onChange={e => handleFileChange(e)}
                accept="image/png, image/jpeg, image/jpg"
              />
            </Button>
          </div>
        </ModalContent>
      </Modal>
      <Tooltip title="Cambiar foto de perfil">
        <button
          type="button"
          className="button"
          onClick={() => setOpenModal(true)}
        >
          {userData?.profilePic !== "" ? (
            <ProfilePicContainer bg={userData?.profilePic} />
          ) : (
            <Icon icon="Profile" />
          )}
        </button>
      </Tooltip>

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
