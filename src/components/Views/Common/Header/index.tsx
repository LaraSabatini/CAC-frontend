import React, { useState, useContext } from "react"
import {
  SaveFilled,
  VideoCameraFilled,
  CalendarFilled,
  SaveOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { Input, Button, Modal, Tooltip } from "antd"
import { useRouter } from "next/router"
import routes from "routes"
import {
  searchArticles,
  getArticleById,
} from "services/articles/articles.service"
import { getSavedArticles } from "services/clients/clientActions.service"
import { DashboardContext } from "contexts/Dashboard"
import CreateArticleButton from "components/Views/Admin/CreateArticleButton"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import texts from "strings/profile.json"
import Icon from "components/UI/Assets/Icon"
import Logo from "components/UI/Assets/Icon/Icons/Logo"
import Filters from "./Filters"
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
  ProfilePicContainer,
} from "./styles"

const { Search } = Input

function Header() {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    setTriggerArticleListUpdate,
    triggerArticleListUpdate,
    setArticles,
  } = useContext(DashboardContext)

  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false)

  const [openActionsMenu, setOpenActionsMenu] = useState<boolean>(false)

  const [openWarning, setOpenWarning] = useState<boolean>(false)
  const [openFilters, setOpenFilters] = useState<boolean>(false)

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [savedArticlesSelected, setSavedArticlesSelected] = useState<boolean>(
    false,
  )

  const logout = () => {
    setLoading(true)
    localStorage.removeItem("userData")
    router.replace(`${routes.login.name}?${routes.login.queries.client}`)
  }

  const getMyArticles = async () => {
    const getSavedArticlesCall = await getSavedArticles(userData.id)
    if (getSavedArticlesCall.status === 200) {
      const articleList = JSON.parse(getSavedArticlesCall.data)

      if (!articleList.length) {
        setArticles(articleList)
      } else {
        const articleListArray = []
        // eslint-disable-next-line no-restricted-syntax
        for (const articleId of articleList) {
          // eslint-disable-next-line no-await-in-loop
          const getArticleByIdCall = await getArticleById(articleId)

          if (getArticleByIdCall.status === 200) {
            articleListArray.push(getArticleByIdCall.data[0])
          } else {
            setServerErrorModal(true)
          }
        }
        setArticles(articleListArray)
      }
    } else {
      setServerErrorModal(true)
    }
  }

  const onSearch = async (value: string) => {
    if (value !== "") {
      const searchArticlesCall = await searchArticles({ search: value })
      if (searchArticlesCall.status === 200) {
        setArticles(searchArticlesCall.data)
      } else {
        setServerErrorModal(true)
      }
    } else {
      setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
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
        {(router.asPath === "/dashboard" || router.asPath === "/partners") && (
          <SearchDiv>
            <Search
              placeholder="Buscar artículo..."
              onSearch={onSearch}
              allowClear
              className="search"
            />

            {(router.asPath === "/dashboard" ||
              router.asPath === "/partners") && (
              <div>
                <Button onClick={() => setOpenFilters(!openFilters)}>
                  Filtrar
                </Button>

                {openFilters && (
                  <Filters closeTab={() => setOpenFilters(false)} />
                )}
              </div>
            )}
          </SearchDiv>
        )}
      </SearchContainer>
      <ProfileContainer>
        <ButtonContainer>
          <Tooltip title="Menú">
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
              {userData?.type === "client" ? (
                <>
                  <Option
                    onClick={() => {
                      setOpenActionsMenu(false)
                      setSavedArticlesSelected(!savedArticlesSelected)
                      setOpenActionsMenu(false)
                      if (!savedArticlesSelected) {
                        getMyArticles()
                      } else {
                        setArticles([])
                        setTriggerArticleListUpdate(
                          triggerArticleListUpdate + 1,
                        )
                      }
                    }}
                  >
                    {!savedArticlesSelected ? <SaveFilled /> : <SaveOutlined />}

                    {!savedArticlesSelected
                      ? "Mis artículos guardados"
                      : "Todos los artículos"}
                  </Option>
                  <Option onClick={() => router.replace("/trainings")}>
                    <VideoCameraFilled />
                    Capacitaciones
                  </Option>
                  <Option onClick={() => router.replace("/advisories")}>
                    <CalendarFilled />
                    Agenda tu asesoría
                  </Option>
                </>
              ) : (
                <>
                  <Option
                    onClick={() => router.replace(`${routes.partners.name}`)}
                  >
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
                    Asesoría y eventos
                  </Option>
                </>
              )}
            </Menu>
          )}
        </ButtonContainer>

        <ProfilePic onClick={() => setOpenProfileMenu(!openProfileMenu)}>
          {userData?.type === "admin" ? (
            <>
              {userData?.profilePic !== "" ? (
                <ProfilePicContainer bg={userData?.profilePic} />
              ) : (
                <Icon icon="Profile" />
              )}
            </>
          ) : (
            <Icon icon="Profile" />
          )}

          {openProfileMenu && (
            <ProfileOptions>
              <Button
                type="primary"
                onClick={() => router.replace(routes.profile.name)}
              >
                Mi perfil
              </Button>
              <Button loading={loading} onClick={() => setOpenWarning(true)}>
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
