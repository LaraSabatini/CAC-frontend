import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/support`

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
