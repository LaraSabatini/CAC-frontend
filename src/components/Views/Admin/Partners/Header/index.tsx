import React, { useState, useEffect, useContext } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserFriends } from "react-icons/fa"
import { BsFilterCircle } from "react-icons/bs"
import { useRouter } from "next/router"
import routes from "routes"
import { searchClients } from "services/clients/clientActions.service"
import { ClientsContext } from "contexts/Clients"
import { DashboardContext } from "contexts/Dashboard"
import CreateArticleButton from "components/Views/Admin/CreateArticleButton"
import texts from "strings/profile.json"
import SearchBar from "components/UI/SearchBar"
import Icon from "components/UI/Assets/Icon"
import Button from "components/UI/Button"
import Tooltip from "components/UI/Tooltip"
import Logo from "components/UI/Assets/Icon/Icons/Logo"
import ModalStatus from "components/UI/ModalStatus"
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
} from "components/Views/Common/Header/styles"
import Filters from "./Filters"

function Header() {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const { setClients } = useContext(ClientsContext)

  const { setTriggerArticleListUpdate, triggerArticleListUpdate } = useContext(
    DashboardContext,
  )

  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false)
  const [openWarning, setOpenWarning] = useState<boolean>(false)
  const [deviceIsMobile, setDeviceIsMobile] = useState<boolean>(false)
  const [openFilters, setOpenFilters] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

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

  const searchCliensInDb = async () => {
    const searchClientsCall = await searchClients({ search: searchValue })
    setClients(searchClientsCall.data)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <Container>
      <SearchContainer>
        <GoHomeButton onClick={() => router.replace(routes.dashboard.name)}>
          <Logo />
        </GoHomeButton>
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
                    searchCliensInDb()
                  }
                }
              }
            }}
            enterSearch={searchCliensInDb}
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
      </SearchContainer>
      <ProfileContainer>
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
