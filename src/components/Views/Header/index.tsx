import React, { useState, useEffect } from "react"
import { AiOutlineLogout, AiFillHome } from "react-icons/ai"
import { useRouter } from "next/router"
import routes from "routes"
import CreateArticleButton from "components/Views/Admin/CreateArticleButton"
import texts from "strings/profile.json"
import headerTexts from "strings/header.json"
import SearchBar from "components/UI/SearchBar"
import Icon from "components/UI/Assets/Icon"
import Button from "components/UI/Button"
import Tooltip from "components/UI/Tooltip"
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
} from "./styles"

function Header() {
  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false)
  const [openWarning, setOpenWarning] = useState<boolean>(false)
  const [deviceIsMobile, setDeviceIsMobile] = useState<boolean>(false)

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

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <Container>
      <SearchContainer>
        <GoHomeButton onClick={() => router.replace(routes.dashboard.name)}>
          <AiFillHome />
        </GoHomeButton>
        <SearchDiv>
          <SearchBar width={deviceIsMobile ? 200 : 300} />
          <Button cta content={headerTexts.filter} action={() => {}} />
        </SearchDiv>
      </SearchContainer>
      <ProfileContainer>
        {userData?.type === "admin" && (
          <>
            <Button
              cta={false}
              content={headerTexts.clients}
              action={() => {}}
            />
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
