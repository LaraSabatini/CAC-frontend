/* eslint-disable no-console */
import React, { useEffect, useState } from "react"

declare global {
  interface Window {
    gapi: any
  }
}

function Prueba() {
  const [allowClick, setAllowClick] = useState<boolean>(false)

  const gapi = typeof window !== "undefined" && window.gapi
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  // const CLIENT_SECRET = "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"
  // const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  // const DISCOVERY_DOCS = [
  //   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  // ]

  const SCOPES = "https://www.googleapis.com/auth/calendar"

  const createEvent = () => {
    const eventData = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2023-04-20T09:00:00-07:00",
        timeZone: "America/Buenos_Aires",
      },
      end: {
        dateTime: "2023-04-20T17:00:00-07:00",
        timeZone: "America/Buenos_Aires",
      },
      // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      // attendees: [
      //   { email: "lpage@example.com" },
      //   { email: "sbrin@example.com" },
      // ],
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
      resource: eventData,
    })

    request.execute((event: any) => {
      console.log(`Event created: ${event.htmlLink}`)
    })
  }

  const handleClientLoad = () => {
    const openSignInPopup = () => {
      gapi.auth2.authorize(
        {
          client_id: CLIENT_ID,
          scope: SCOPES,
          plugin_name: "camara-federal-consorcio",
        },
        (res: any) => {
          console.log("ACA RES", res)
          if (res) {
            if (res.access_token)
              localStorage.setItem("access_token", res.access_token)

            gapi.client.load("calendar", "v3", console.log("holis"))

            console.log("listo")
            createEvent()
          }
        },
      )
    }

    const initClient = () => {
      if (!localStorage.getItem("access_token")) {
        openSignInPopup()
      } else {
        createEvent()
      }
    }

    gapi.load("client:auth2", initClient)
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
    <div>
      Pruebas
      <button disabled={!allowClick} onClick={handleClientLoad} type="button">
        schedule
      </button>
    </div>
  )
}

export default Prueba
