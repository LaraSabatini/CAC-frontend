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
    supportURL: `${process.env.NEXT_PUBLIC_FRONT_URL}/contactSupport?id=${id}&clientName=${clientName}`,
  })
  return res
}

const sendAccountUnblockedEmailNotification = async (body: {
  recipients: string[]
  name: string
}) => {
  const res = await defaultPost(`${apiURL}/client/unblock_account_mail`, {
    ...body,
    loginURL: `${process.env.NEXT_PUBLIC_FRONT_URL}/login?user=client`,
  })
  return res
}

export {
  sendAccountBlockedEmailNotification,
  sendAccountUnblockedEmailNotification,
}
