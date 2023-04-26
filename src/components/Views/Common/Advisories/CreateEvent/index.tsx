/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react"
import { PublicEventsInterface } from "interfaces/content/Advisories"
import { AdvisoriesContext } from "contexts/Advisories"
import { createEvent } from "services/advisories/events.service"
import { getClientEmails } from "services/clients/clientActions.service"
import Modal from "components/UI/Modal"
import ModalStatus from "components/UI/ModalStatus"
import Input from "components/UI/Input"
import Button from "components/UI/Button"
import { v4 as uuid } from "uuid"
import { Container, Title, ButtonContainer } from "./styles"

declare global {
  interface Window {
    gapi: any
  }
}

function CreateEvent({ closeModal }: { closeModal: (arg?: any) => void }) {
  const { setServerError } = useContext(AdvisoriesContext)

  const [allowClick, setAllowClick] = useState<boolean>(false)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const gapi = typeof window !== "undefined" && window.gapi
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const SCOPES = "https://www.googleapis.com/auth/calendar"

  const [requiredError, setRequiredError] = useState<boolean>(false)
  const [modalSuccess, setModalSuccess] = useState<boolean>(false)
  const [newEvent, setNewEvent] = useState<PublicEventsInterface>({
    title: "",
    description: "",
    date: "",
    hour: "",
    month: 0,
    eventURL: "",
    attendant: [],
    createdBy: 0,
  })

  const createEventFunction = async () => {
    // CREAR EVENTO EN BDD
    const splitDate = newEvent.date.split("/")
    const splitHour = newEvent.hour.split(":")

    const dateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitHour[0]}:${splitHour[1]}:00-03:00`
    const endDateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${
      parseInt(splitHour[0], 10) + 1
    }:${splitHour[1]}:00-03:00`

    const clientEmails = await getClientEmails()

    const eventData = {
      summary: newEvent.title,
      location: "",
      description: newEvent.description,
      start: {
        dateTime: dateFormated,
        timeZone: "America/Buenos_Aires",
      },
      end: {
        dateTime: endDateFormated,
        timeZone: "America/Buenos_Aires",
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees: [...clientEmails.data, { email: userData.user }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    }

    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      sendNotifications: true,
      conferenceDataVersion: 1,
      resource: eventData,
    })

    request.execute(async (event: any) => {
      const createEventCall = await createEvent({
        ...newEvent,
        createdBy: userData.id,
        date: `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`,
        month: parseInt(splitDate[1], 10),
        eventURL: event.htmlLink,
      })
      setModalSuccess(createEventCall.status === 201)
      setServerError(createEventCall.status !== 201)
    })
  }

  const handleClientLoad = () => {
    if (
      newEvent.title === "" ||
      newEvent.description === "" ||
      newEvent.date === "" ||
      newEvent.hour === ""
    ) {
      setRequiredError(true)
    } else {
      const openSignInPopup = () => {
        gapi.auth2.authorize(
          {
            client_id: CLIENT_ID,
            scope: SCOPES,
            plugin_name: "camara-federal-consorcio",
          },
          (res: any) => {
            if (res) {
              if (res.access_token) {
                localStorage.setItem("access_token", res.access_token)
                gapi.client.load("calendar", "v3", createEventFunction)
              }
            }
          },
        )
      }

      const initClient = () => {
        if (
          !localStorage.getItem("access_token") ||
          gapi.client.calendar === undefined
        ) {
          openSignInPopup()
        } else {
          createEventFunction()
        }
      }

      gapi.load("client:auth2", initClient)
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

  return (
    <Modal>
      <Container>
        {modalSuccess && (
          <ModalStatus
            title="Excelente!"
            description="El evento se ha creado exitosamente"
            status="success"
            selfClose
            selfCloseAction={closeModal}
          />
        )}

        <Title>Crear evento publico</Title>
        {requiredError && (
          <p className="required">* Completa los campos requeridos</p>
        )}
        <div className="input-container">
          <Input
            label="Titulo"
            required
            type="text"
            width={400}
            onChange={e => {
              setNewEvent({ ...newEvent, title: e.target.value })
            }}
          />
          <Input
            label="Descripcion"
            required
            type="textarea"
            width={380}
            onChange={e => {
              setNewEvent({ ...newEvent, description: e.target.value })
            }}
          />
          <div className="horizontal">
            <Input
              label="Fecha"
              required
              type="text"
              placeholder="dd/mm/aaaa"
              width={200}
              value={newEvent.date}
              max={10}
              onChange={e => {
                if (e.target.value.length <= 12) {
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              }}
            />
            <Input
              label="Horario"
              required
              type="text"
              placeholder="hh:mm (24 horas)"
              width={200}
              value={newEvent.hour}
              onChange={e => {
                if (e.target.value.length <= 5) {
                  setNewEvent({ ...newEvent, hour: e.target.value })
                }
              }}
            />
          </div>
        </div>
        <ButtonContainer>
          <Button content="Cancelar" cta={false} action={closeModal} />
          <Button
            content="Crear"
            disabled={!allowClick}
            cta
            action={handleClientLoad}
          />
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default CreateEvent
