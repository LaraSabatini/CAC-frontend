import { v4 as uuid } from "uuid"

type EventDataType = {
  summary: string
  description: string
  attendees: { email: string }[]
}

const createEventFunction = async (
  gapi: any,
  eventData: EventDataType,
  date: string,
  hour: string,
) => {
  const splitDate = date.split("/")
  const splitHour = hour.split(":")

  const dateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitHour[0]}:${splitHour[1]}:00-03:00`
  const endDateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${
    parseInt(splitHour[0], 10) + 1
  }:${splitHour[1]}:00-03:00`

  const eventObject = {
    ...eventData,
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
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  }

  return new Promise<string>((resolve, reject) => {
    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      sendNotifications: true,
      conferenceDataVersion: 1,
      resource: eventObject,
    })

    request.execute((ev: any) => {
      if (ev.hangoutLink) {
        resolve(ev.htmlLink)
      } else {
        reject(new Error("Hangout link not found in the response"))
      }
    })
  })
}

export default createEventFunction
