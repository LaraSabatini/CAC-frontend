import { useEffect } from "react"
import { useRouter } from "next/router"
import checkLastPayment from "helpers/dates/checkLastPayment"
import { UserDataType } from "interfaces/users/General"

function usePaymentStatus(userData: UserDataType) {
  const router = useRouter()

  useEffect(() => {
    if (userData.type === "client") {
      const checkPayment = async () => {
        const checkLastPaymentReq = await checkLastPayment(userData)
        if (checkLastPaymentReq === "expired") {
          router.replace("/profile")
        }
      }

      checkPayment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default usePaymentStatus
