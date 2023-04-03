import defaultPost from "services/defaultPost"
import apiURL from "./route"

const sendAccountBlockedEmailNotification = async (
  body: {
    recipients: string[]
    name: string
    motive: string
  },
  id: number,
  clientName: string,
) => {
  const res = await defaultPost(`${apiURL}/client/block_account_mail`, {
    ...body,
    supportURL: `https://cac-frontend-git-feat-update-payment-larasabatini.vercel.app/contactSupport?id=${id}&clientName=${clientName}`,
  })
  return res
}

const sendAccountUnblockedEmailNotification = async (body: {
  recipients: string[]
  name: string
}) => {
  const res = await defaultPost(`${apiURL}/client/unblock_account_mail`, {
    ...body,
    loginURL:
      "https://cac-frontend-git-feat-update-payment-larasabatini.vercel.app/login?user=client",
  })
  return res
}

export {
  sendAccountBlockedEmailNotification,
  sendAccountUnblockedEmailNotification,
}
