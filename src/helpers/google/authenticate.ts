const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const SCOPES = "https://www.googleapis.com/auth/calendar"

const authenticate = (gapi: any, action: (arg?: any) => void) => {
  const openSignInPopup = () => {
    gapi.auth2.authorize(
      {
        client_id: CLIENT_ID,
        scope: SCOPES,
        plugin_name: "CFdAs", // CFdAs
      },
      (res: any) => {
        if (res) {
          if (res.access_token) {
            localStorage.setItem("access_token", res.access_token)

            gapi.client.load("calendar", "v3", action)
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
      action()
    }
  }

  gapi.load("client:auth2", initClient)
}

export default authenticate
