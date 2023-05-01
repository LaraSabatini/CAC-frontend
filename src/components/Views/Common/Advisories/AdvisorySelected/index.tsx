import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { AdvisoriesContext } from "contexts/Advisories"
import { CalendarOutlined } from "@ant-design/icons"
import {
  getAdvisoryData,
  changeAdvisoryStatus,
} from "services/advisories/advisories.service"
import { getClientEmail } from "services/clients/clientActions.service"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import authenticate from "helpers/google/authenticate"
import createEventFunction from "helpers/google/createEvent"
import getMeetURL from "helpers/google/getMeetURL"
import { Modal, Button } from "antd"
import { AdvisoryInterface } from "interfaces/content/Advisories"
import { AdvisoryEvent } from "../styles"
import { ModalContent } from "./styles"

function AdvisorySelected({
  event,
  updateList,
}: {
  event: AdvisoryInterface
  updateList: (arg?: any) => void
}) {
  const { setServerError } = useContext(AdvisoriesContext)
  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const gapi = typeof window !== "undefined" && window.gapi

  const [openModalEvent, setOpenModalEvent] = useState<boolean>(false)
  const [eventData, setEventData] = useState<AdvisoryInterface>(event)
  const [allowClick, setAllowClick] = useState<boolean>(false)

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [canJoinEvent, setCanJoinEvent] = useState<boolean>(false)

  const success = () => {
    Modal.success({
      content: "Accion realizada con exito",
      onOk() {
        setOpenModalEvent(false)
        if (router.query.id !== undefined) {
          delete router.query.id
          router.push(router)
        }
        updateList()
      },
    })
  }

  const getByURL = async () => {
    const getAdvisoriesCall = await getAdvisoryData(
      parseInt(router.query.id as string, 10),
    )
    if (getAdvisoriesCall.status === 200) {
      setEventData(getAdvisoriesCall.data[0])
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    if (router.query.id !== undefined) {
      setOpenModalEvent(true)
      getByURL()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const changeStatus = async (action: "cancel" | "confirm") => {
    let eventURL = ""
    if (action === "confirm") {
      const clientEmail = await getClientEmail(eventData.clientId)

      if (clientEmail.status === 200) {
        const eventDataForGoogle: {
          summary: string
          description: string
          attendees: { email: string }[]
        } = {
          summary: `Asesoria con ${eventData.clientName}`,
          description: eventData.brief,
          attendees: [
            { email: userData.user },
            { email: clientEmail.data[0].email },
          ],
        }

        eventURL = await createEventFunction(
          gapi,
          eventDataForGoogle,
          eventData.date.replaceAll("-", "/"),
          eventData.hour,
        )
      } else {
        setServerError(true)
      }
    }

    const advisoryData: {
      id: number
      adminId: number
      clientId: number
      status: string
      googleCalendarEvent: string
    } = {
      id: eventData.id as number,
      adminId: eventData.adminId,
      clientId: eventData.clientId,
      status: action === "cancel" ? "cancelled" : "confirmed",
      googleCalendarEvent: eventURL,
    }

    const changeAdvisoryStatusCall = await changeAdvisoryStatus(
      action === "cancel" ? userData.type : "admin",
      advisoryData,
    )

    if (changeAdvisoryStatusCall.status === 201) {
      success()
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.defer = true
    script.src = "https://apis.google.com/js/api.js"

    document.body.appendChild(script)

    script.addEventListener("load", () => {
      if (gapi) setAllowClick(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapi])

  useEffect(() => {
    const today = new Date()
    const month =
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : `0${today.getMonth() + 1}`
    const day = today.getDate()
    const year = today.getFullYear()

    if (openModalEvent && eventData.date === `${day}-${month}-${year}`) {
      setCanJoinEvent(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalEvent])

  return (
    <>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      <Modal
        title={`Asesoria con: ${eventData.clientName}`}
        open={openModalEvent}
        onCancel={() => {
          setOpenModalEvent(false)
          if (router.query.id !== undefined) {
            delete router.query.id
            router.push(router)
          }
        }}
        footer={[
          eventData.status === "pending" && (
            <>
              <Button onClick={() => changeStatus("cancel")}>
                Cancelar Asesoria
              </Button>
              {userData?.type === "admin" && (
                <Button
                  type="primary"
                  disabled={!allowClick}
                  onClick={() =>
                    authenticate(gapi, () => changeStatus("confirm"))
                  }
                >
                  Confirmar Asesoria
                </Button>
              )}
            </>
          ),
          eventData.status === "confirmed" && (
            <>
              <Button onClick={() => changeStatus("cancel")}>
                Cancelar Asesoria
              </Button>
              {canJoinEvent ? (
                <Button
                  type="primary"
                  onClick={() =>
                    authenticate(gapi, () =>
                      getMeetURL(eventData.eventURL, gapi),
                    )
                  }
                >
                  Unirme
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => window.open(event.eventURL)}
                >
                  Ver en google calendar
                </Button>
              )}
            </>
          ),
        ]}
      >
        <ModalContent>
          <span className="date-data">
            <CalendarOutlined />
            {eventData.date.replaceAll("-", "/")} - {eventData.hour} hs
          </span>
          <p>Descripcion: {eventData.brief}</p>
        </ModalContent>
      </Modal>

      <AdvisoryEvent
        type="button"
        eventType="advisory"
        cancelled={eventData.status === "cancelled"}
        onClick={() => {
          if (eventData.status !== "cancelled") {
            setOpenModalEvent(true)
          }
        }}
      >
        <div className="marker" />
        <p>
          {event.hour} asesoria con <b>{event.clientName}</b>
        </p>
      </AdvisoryEvent>
    </>
  )
}

export default AdvisorySelected
