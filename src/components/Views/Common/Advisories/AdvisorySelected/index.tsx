import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { AdvisoriesContext } from "contexts/Advisories"
import { GrFormClose } from "react-icons/gr"
import { BsCalendar3 } from "react-icons/bs"
import {
  getAdvisoryData,
  changeAdvisoryStatus,
} from "services/advisories/advisories.service"
import { getClientEmail } from "services/clients/clientActions.service"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import authenticate from "helpers/google/authenticate"
import createEventFunction from "helpers/google/createEvent"
import getMeetURL from "helpers/google/getMeetURL"
import Modal from "components/UI/Modal"
import ModalStatus from "components/UI/ModalStatus"
import Button from "components/UI/Button"
import { AdvisoryInterface } from "interfaces/content/Advisories"
import { AdvisoryEvent } from "../styles"
import { ModalContent, Title } from "./styles"

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
  const [modalSuccess, setModalSuccess] = useState<boolean>(false)

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

    setModalSuccess(changeAdvisoryStatusCall.status === 201)
    setServerError(changeAdvisoryStatusCall.status !== 201)
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
      {openModalEvent && (
        <Modal>
          <ModalContent>
            {modalSuccess && (
              <ModalStatus
                title="Excelente!"
                description="La asesoria se ha modificado exitosamente"
                status="success"
                selfClose
                selfCloseAction={() => {
                  setModalSuccess(false)
                  setOpenModalEvent(false)
                  if (router.query.id !== undefined) {
                    delete router.query.id
                    router.push(router)
                  }
                  updateList()
                }}
              />
            )}
            <div className="modal-head">
              <Title>
                Asesoria con: <span>{eventData.clientName}</span>
              </Title>
              <button
                type="button"
                onClick={() => {
                  setOpenModalEvent(false)
                  if (router.query.id !== undefined) {
                    delete router.query.id
                    router.push(router)
                  }
                }}
              >
                <GrFormClose />
              </button>
            </div>
            <span className="date-data">
              <BsCalendar3 />
              {eventData.date.replaceAll("-", "/")} - {eventData.hour} hs
            </span>
            <p>
              <b>Descripcion:</b> {eventData.brief}
            </p>
            {eventData.status === "pending" && (
              <div className="button-container">
                <Button
                  content="Cancelar Asesoria"
                  cta={false}
                  action={() => changeStatus("cancel")}
                />
                {userData?.type === "admin" && (
                  <Button
                    content="Confirmar Asesoria"
                    cta
                    disabled={!allowClick}
                    action={() =>
                      authenticate(gapi, () => changeStatus("confirm"))
                    }
                  />
                )}
              </div>
            )}
            {eventData.status === "confirmed" && (
              <div className="button-container">
                <Button
                  content="Cancelar Asesoria"
                  cta={false}
                  action={() => changeStatus("cancel")}
                />
                {canJoinEvent ? (
                  <Button
                    content="Unirme"
                    cta
                    action={() =>
                      authenticate(gapi, () =>
                        getMeetURL(eventData.eventURL, gapi),
                      )
                    }
                  />
                ) : (
                  <Button
                    content="Ver en google calendar"
                    cta
                    action={() => window.open(event.eventURL)}
                  />
                )}
              </div>
            )}
          </ModalContent>
        </Modal>
      )}
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
