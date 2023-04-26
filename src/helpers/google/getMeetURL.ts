const getMeetURL = (eventURL: string, gapi: any) => {
  const url = eventURL.split("eid=")
  const decodeEventId = atob(url[1])
  gapi.client.calendar.events
    .get({
      calendarId: "primary",
      eventId: decodeEventId.split(" ")[0],
    })

    .then(
      (response: any) => {
        window.open(response.result.hangoutLink)
      },
      (err: any) => {
        // eslint-disable-next-line no-console
        console.error("Execute error", err)
      },
    )
}

export default getMeetURL
