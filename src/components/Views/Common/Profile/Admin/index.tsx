/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { ProfileContext } from "contexts/Profile"
import { AdminInterface, AccessPermitsInterface } from "interfaces/users/Admin"
import Button from "components/UI/Button"
import ToggleSwitch from "components/UI/ToggleSwitch"
import ChangePasswordModal from "../ChangePasswordModal"
import { Title } from "../Client/styles"
import {
  Container,
  PermitsCard,
  PermitTitle,
  Permit,
  Option,
  ButtonContainer,
} from "./styles"

function AdminProfile() {
  const router = useRouter()

  const { profileData } = useContext(ProfileContext)

  const profile = profileData as AdminInterface

  const [changePasswordView, setChangePasswordView] = useState<boolean>(false)
  const [
    accessPermitsModified,
    setAccessPermitsModified,
  ] = useState<AccessPermitsInterface | null>(null)

  const permitRequest = () => {
    // crear request que envia mail a super usuario pidiendo permisos
    // pagina usuarios => usuario preseleccionado
    //                      => permisos requeridos pre-seleccionados
    //                      => otorgar permisos
    //                      => email notificacion permisos dados a usuario que lo pidio
  }

  useEffect(() => {
    if (typeof profile.accessPermits !== "string") {
      setAccessPermitsModified(profile.accessPermits)
    }
  }, [profile])

  return (
    <Container>
      {changePasswordView && (
        <ChangePasswordModal
          cancel={() => setChangePasswordView(false)}
          cantCancel={router.query.change_password === "true"}
        />
      )}
      {accessPermitsModified !== null && accessPermitsModified !== undefined && (
        <PermitsCard>
          <Title>Permisos:</Title>
          <Permit>
            <PermitTitle>Articulos:</PermitTitle>
            <Option>
              Crear:
              <ToggleSwitch
                onChange={e =>
                  setAccessPermitsModified({
                    ...accessPermitsModified,
                    articles: {
                      ...accessPermitsModified.articles,
                      create: e.target.checked,
                    },
                  })
                }
                defaultValue={accessPermitsModified.articles.create}
                ownState={accessPermitsModified.articles.create}
              />
            </Option>
            <Option>
              Editar:{" "}
              <ToggleSwitch
                onChange={e =>
                  setAccessPermitsModified({
                    ...accessPermitsModified,
                    articles: {
                      ...accessPermitsModified.articles,
                      edit: e.target.checked,
                    },
                  })
                }
                defaultValue={accessPermitsModified.articles.edit}
                ownState={accessPermitsModified.articles.edit}
              />
            </Option>
            <Option>
              Eliminar:{" "}
              <ToggleSwitch
                onChange={e =>
                  setAccessPermitsModified({
                    ...accessPermitsModified,
                    articles: {
                      ...accessPermitsModified.articles,
                      delete: e.target.checked,
                    },
                  })
                }
                defaultValue={accessPermitsModified.articles.delete}
                ownState={accessPermitsModified.articles.delete}
              />
            </Option>
          </Permit>
          <Permit>
            <PermitTitle>Socios:</PermitTitle>
            <Option>
              Visualizar:{" "}
              <ToggleSwitch
                onChange={e =>
                  setAccessPermitsModified({
                    ...accessPermitsModified,
                    partners: e.target.checked,
                  })
                }
                defaultValue={accessPermitsModified.partners}
                ownState={accessPermitsModified.partners}
              />
            </Option>
          </Permit>
          {profile.accessPermits !== accessPermitsModified && (
            <ButtonContainer>
              <Button
                content="Cancelar"
                cta={false}
                action={() => setAccessPermitsModified(profile.accessPermits)}
              />
              <Button content="Solicitar permisos" cta action={permitRequest} />
            </ButtonContainer>
          )}
        </PermitsCard>
      )}
      <Button
        content="Cambiar contraseña"
        cta
        action={() => setChangePasswordView(true)}
      />
    </Container>
  )
}

export default AdminProfile
