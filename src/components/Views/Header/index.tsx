import React, { useState } from "react"
import { AiOutlineLogout, AiFillHome } from "react-icons/ai"
import { useRouter } from "next/router"
import CreateArticleButton from "components/Views/Admin/CreateArticleButton"
import texts from "strings/profile.json"
import headerTexts from "strings/header.json"
import SearchBar from "components/UI/SearchBar"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import ModalStatus from "components/UI/ModalStatus"
import {
  Container,
  FilterButton,
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

  const userData = JSON.parse(sessionStorage.getItem("userData") as string)

  const logout = () => {
    sessionStorage.removeItem("userData")
    router.replace(`/login?client=true`)
  }

  return (
    <Container>
      <SearchContainer>
        <GoHomeButton
          onClick={() => router.replace(`/dashboard?${userData.type}=true`)}
        >
          <AiFillHome />
        </GoHomeButton>
        <SearchBar width={300} />
        <FilterButton>{headerTexts.filter}</FilterButton>
      </SearchContainer>
      <ProfileContainer>
        {userData.type === "admin" && <CreateArticleButton />}
        <ProfilePic onClick={() => setProfileMenu(!profileMenu)}>
          <Icon icon="Profile" width="25" height="25" />
          {profileMenu && (
            <ProfileOptions>
              <button
                className="cta"
                type="button"
                onClick={() => router.replace(`/profile`)}
              >
                {texts.title}
              </button>
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
