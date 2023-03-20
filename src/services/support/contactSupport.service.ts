import defaultPost from "services/defaultPost"

const apiURL = "http://localhost:3001/support"

const requestUnblock = async (
  body: {
    recipients: string[]
    name: string
    clientName: string
    unblockURL: string
  },
  id: number,
) => {
  const res = await defaultPost(`${apiURL}/unblock_account/id=${id}`, body)
  return res
}

export default requestUnblock
