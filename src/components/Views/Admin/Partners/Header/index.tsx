import React, { useState, useContext } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import { searchClients } from "services/clients/clientActions.service"
import { ClientsContext } from "contexts/Clients"
import CreateArticleButton from "components/Views/Admin/CreateArticleButton"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import texts from "strings/profile.json"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import Logo from "components/UI/Assets/Icon/Icons/Logo"
import { Input, Button, Modal } from "antd"
import {
  UsergroupAddOutlined,
  CalendarOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import {
  Container,
  SearchContainer,
  ProfilePic,
  ProfileOptions,
  GoHomeButton,
  ProfileContainer,
  SearchDiv,
  ButtonContainer,
  Menu,
  Option,
} from "components/Views/Common/Header/styles"
import Filters from "./Filters"

const { Search } = Input

function Header() {
  const router = useRouter()

  const { setClients, triggerListUpdate, setTriggerListUpdate } = useContext(
    ClientsContext,
  )

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false)
  const [openWarning, setOpenWarning] = useState<boolean>(false)
  const [openFilters, setOpenFilters] = useState<boolean>(false)

  const [openActionsMenu, setOpenActionsMenu] = useState<boolean>(false)

  const logout = () => {
    localStorage.removeItem("userData")
    router.replace(`${routes.login.name}?${routes.login.queries.client}`)
  }

  const onSearch = async (value: string) => {
    if (value !== "") {
      const searchClientsCall = await searchClients({ search: value })
      if (searchClientsCall.status === 200) {
        setClients(searchClientsCall.data)
      } else {
        setServerErrorModal(true)
      }
    } else {
      setTriggerListUpdate(triggerListUpdate + 1)
    }
  }

  return (
    <Container>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      <SearchContainer>
        <GoHomeButton onClick={() => router.replace(routes.dashboard.name)}>
          <Logo />
        </GoHomeButton>
        <SearchDiv>
          <Search
            placeholder="Buscar cliente..."
            onSearch={onSearch}
            allowClear
            style={{ width: 300 }}
          />
          {(router.asPath === "/dashboard" ||
            router.asPath === "/partners") && (
            <>
              <Button onClick={() => setOpenFilters(!openFilters)}>
                Filtrar
              </Button>

              {openFilters && (
                <Filters closeTab={() => setOpenFilters(false)} />
              )}
            </>
          )}
        </SearchDiv>
      </SearchContainer>
      <ProfileContainer>
        <ButtonContainer>
          <Tooltip title="Menú" placement="left">
            <button
              type="button"
              className="menu"
              onClick={() => setOpenActionsMenu(!openActionsMenu)}
            >
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </button>
          </Tooltip>
          {openActionsMenu && (
            <Menu>
              <Option onClick={() => router.replace(`${routes.partners.name}`)}>
                <UsergroupAddOutlined />
                Socios
              </Option>
              <CreateArticleButton />
              <Option onClick={() => router.replace("/trainings")}>
                <VideoCameraOutlined />
                Capacitaciones
              </Option>
              <Option onClick={() => router.replace("/advisories")}>
                <CalendarOutlined />
                Asesorías y eventos
              </Option>
            </Menu>
          )}
        </ButtonContainer>

        <ProfilePic onClick={() => setOpenProfileMenu(!openProfileMenu)}>
          <Icon icon="Profile" />
          {openProfileMenu && (
            <ProfileOptions>
              <Button
                type="primary"
                onClick={() => router.replace(routes.profile.name)}
              >
                Mi perfil
              </Button>
              <Button onClick={() => setOpenWarning(true)}>
                <LogoutOutlined /> {texts.logout}
              </Button>
            </ProfileOptions>
          )}
        </ProfilePic>
      </ProfileContainer>
      <Modal
        title={texts.logoutModal.title}
        open={openWarning}
        onOk={logout}
        onCancel={() => setOpenWarning(false)}
        okText={texts.logout}
        cancelText="Cancelar"
      />
    </Container>
  )
}

export default Header
