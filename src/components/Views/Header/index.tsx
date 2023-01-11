import React, { useState, useEffect } from "react"
import { AiOutlineLogout, AiFillHome } from "react-icons/ai"
import { useRouter } from "next/router"
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
} from "./styles"

function Header() {
  const router = useRouter()

  const [profileMenu, setProfileMenu] = useState<boolean>(false)
  const [modalWarning, setModalWarning] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState(false)

  const userData = JSON.parse(sessionStorage.getItem("userData") as string)

  const logout = () => {
    sessionStorage.removeItem("userData")
    router.replace(`/login?client=true`)
  }

  const handleResize = () => {
    if (window.innerWidth < 560) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <Container>
      <SearchContainer>
        <GoHomeButton
          onClick={() => router.replace(`/dashboard?${userData.type}=true`)}
        >
          <AiFillHome />
        </GoHomeButton>
        <div className="subContainer">
          <SearchBar width={isMobile ? 200 : 300} />
          <Button cta content={headerTexts.filter} action={() => {}} />
        </div>
      </SearchContainer>
      <ProfileContainer>
        {userData.type === "client" && (
          <>
            <Button cta={false} content="Socios" action={() => {}} />
            <CreateArticleButton />
          </>
        )}
        <ProfilePic onClick={() => setProfileMenu(!profileMenu)}>
          <Icon icon="Profile" width="25" height="25" />
          {profileMenu && (
            <ProfileOptions>
              <Button
                cta={false}
                action={() => router.replace(`/profile`)}
                content={texts.title}
              />
              <Tooltip title={texts.logout} placement="bottom-end">
                <button type="button" onClick={() => setModalWarning(true)}>
                  <AiOutlineLogout />
                </button>
              </Tooltip>
            </ProfileOptions>
          )}
        </ProfilePic>
      </ProfileContainer>
      {modalWarning && (
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
            action: () => setModalWarning(false),
          }}
        />
      )}
    </Container>
  )
}

export default Header
