import axios from "axios"

const apiURL = "https://www.googleapis.com/calendar/v3"

const deleteCalendarEvent = async (eventId: string, token: string) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const res = await axios.delete(
      `${apiURL}/calendars/primary/events/${eventId}`,
      headers,
    )
    return res
  } catch (ex) {
    return ex
  }
}

// https://www.google.com/calendar/event?eid=am1hN2hkNGRsY2s2OGpidTZ0YTRrZzdhb2sgc2FiYXRpbmlsYXJhQG0

// eslint-disable-next-line import/prefer-default-export
export { deleteCalendarEvent }
