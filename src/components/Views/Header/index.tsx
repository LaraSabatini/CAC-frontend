import React, { useState, useEffect } from "react"
import { AiOutlineLogout, AiFillHome } from "react-icons/ai"
import { useRouter } from "next/router"
import CreateArticleButton from "components/Views/Admin/CreateArticleButton"
import userData from "const/userData"
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

  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false)
  const [openWarning, setOpenWarning] = useState<boolean>(false)
  const [deviceIsMobile, setDeviceIsMobile] = useState<boolean>(false)

  const logout = () => {
    sessionStorage.removeItem("userData")
    router.replace(`/login?client=true`)
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
        <GoHomeButton onClick={() => router.replace(`/dashboard`)}>
          <AiFillHome />
        </GoHomeButton>
        <SearchDiv>
          <SearchBar width={deviceIsMobile ? 200 : 300} />
          <Button cta content={headerTexts.filter} action={() => {}} />
        </SearchDiv>
      </SearchContainer>
      <ProfileContainer>
        {userData.type === "admin" && (
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
          <Icon icon="Profile" width="25" height="25" />
          {openProfileMenu && (
            <ProfileOptions>
              <Button
                cta
                action={() => router.replace(`/profile`)}
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
