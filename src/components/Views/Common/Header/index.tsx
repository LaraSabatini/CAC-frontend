import React, { useState, useEffect, useContext } from "react"
import {
  AiOutlineLogout,
  AiFillSave,
  AiOutlineSave,
  AiOutlineVideoCamera,
} from "react-icons/ai"
import { FaUserFriends, FaCalendarWeek } from "react-icons/fa"
import { BsFilterCircle } from "react-icons/bs"
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
import SearchBar from "components/UI/SearchBar"
import Icon from "components/UI/Assets/Icon"
import Button from "components/UI/Button"
import Tooltip from "components/UI/Tooltip"
import Logo from "components/UI/Assets/Icon/Icons/Logo"
import ModalStatus from "components/UI/ModalStatus"
import Filters from "./Filters"
import {
  Container,
  SearchContainer,
  ProfilePic,
  ProfileOptions,
  GoHomeButton,
  ProfileContainer,
  SearchDiv,
  SVGButton,
  FiltersButton,
  ButtonContainer,
} from "./styles"

function Header() {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const {
    setTriggerArticleListUpdate,
    triggerArticleListUpdate,
    setArticles,
  } = useContext(DashboardContext)

  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false)
  const [openWarning, setOpenWarning] = useState<boolean>(false)
  const [deviceIsMobile, setDeviceIsMobile] = useState<boolean>(false)
  const [openFilters, setOpenFilters] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [savedArticlesSelected, setSavedArticlesSelected] = useState<boolean>(
    false,
  )

  const logout = () => {
    localStorage.removeItem("userData")
    router.replace(`${routes.login.name}?${routes.login.queries.client}`)
  }

  const handleResize = () => {
    if (window.innerWidth < 560) {
      setDeviceIsMobile(true)
    } else {
      setDeviceIsMobile(false)
    }
  }

  const searchArticlesInDB = async () => {
    const searchArticlesCall = await searchArticles({ search: searchValue })
    if (searchArticlesCall.status === 200) {
      setArticles(searchArticlesCall.data)
    } else {
      setServerErrorModal(true)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

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
            <SearchBar
              width={deviceIsMobile ? 200 : 300}
              searchValue={searchValue}
              onChangeSearch={e => {
                if (e !== undefined) {
                  if (e.target.value === "") {
                    setSearchValue("")
                    setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
                  } else {
                    setSearchValue(e.target.value)
                    if (e.target.value.length >= 4) {
                      searchArticlesInDB()
                    }
                  }
                }
              }}
              enterSearch={searchArticlesInDB}
            />
            {(router.asPath === "/dashboard" ||
              router.asPath === "/partners") && (
              <>
                <FiltersButton
                  type="button"
                  onClick={() => setOpenFilters(!openFilters)}
                >
                  <Tooltip title="Filtrar" placement="right">
                    <BsFilterCircle />
                  </Tooltip>
                </FiltersButton>

                {openFilters && (
                  <Filters closeTab={() => setOpenFilters(false)} />
                )}
              </>
            )}
          </SearchDiv>
        )}
      </SearchContainer>
      <ProfileContainer>
        <ButtonContainer>
          {userData?.type === "client" && (
            <FiltersButton
              type="button"
              onClick={() => {
                setSavedArticlesSelected(!savedArticlesSelected)
                if (!savedArticlesSelected) {
                  getMyArticles()
                } else {
                  setArticles([])
                  setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
                }
              }}
            >
              <Tooltip
                title={
                  !savedArticlesSelected
                    ? "Articulos guardados"
                    : "Todos los articulos"
                }
                placement="bottom-end"
              >
                {!savedArticlesSelected ? <AiFillSave /> : <AiOutlineSave />}
              </Tooltip>
            </FiltersButton>
          )}
          <FiltersButton
            type="button"
            onClick={() => router.replace("/trainings")}
          >
            <Tooltip title="Capacitaciones" placement="bottom-end">
              <AiOutlineVideoCamera />
            </Tooltip>
          </FiltersButton>
          <FiltersButton
            type="button"
            onClick={() => router.replace("/advisories")}
          >
            <Tooltip
              title={
                userData?.type === "client"
                  ? "Agenda tu asesoria"
                  : "Ver asesorias & eventos"
              }
              placement="bottom-end"
            >
              <FaCalendarWeek />
            </Tooltip>
          </FiltersButton>
        </ButtonContainer>
        {userData?.type !== "client" && (
          <>
            <FiltersButton
              type="button"
              onClick={() => router.replace(`${routes.partners.name}`)}
            >
              <Tooltip title="Socios" placement="bottom-end">
                <FaUserFriends />
              </Tooltip>
            </FiltersButton>
            <CreateArticleButton />
          </>
        )}
        <ProfilePic onClick={() => setOpenProfileMenu(!openProfileMenu)}>
          <Icon icon="Profile" />
          {openProfileMenu && (
            <ProfileOptions>
              <Button
                cta
                action={() => router.replace(routes.profile.name)}
                content={texts.title}
              />
              <Tooltip title={texts.logout} placement="bottom-end">
                <SVGButton onClick={() => setOpenWarning(true)}>
                  <AiOutlineLogout />
                </SVGButton>
              </Tooltip>
            </ProfileOptions>
          )}
        </ProfilePic>
      </ProfileContainer>
      {openWarning && (
        <ModalStatus
          title={texts.logoutModal.title}
          description=""
          status="notice"
          ctaButton={{
            content: `${texts.logout}`,
            action: logout,
          }}
          secondaryButton={{
            content: `${texts.logoutModal.cancel}`,
            action: () => setOpenWarning(false),
          }}
        />
      )}
    </Container>
  )
}

export default Header
