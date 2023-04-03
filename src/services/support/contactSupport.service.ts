import defaultPost from "services/defaultPost"

const apiURL = "https://camarafederal.com.ar/software/api/support"

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
