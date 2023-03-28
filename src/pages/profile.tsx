/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import updateClientPaymentData from "services/auth/updateClientPaymentData.service"
import registerPaymentInDB from "services/payment/registerPaymentInDB.service"
import routes from "routes"
import ProfileProvider from "contexts/Profile"
import ProfileView from "components/Views/Common/Profile"
import { UserDataType } from "interfaces/users/General"
import { dateFormated } from "helpers/dates/getToday"
import checkLastPayment from "helpers/dates/checkLastPayment"

function Profile() {
  const router = useRouter()

  const [isLogged, setIsLogged] = useState<boolean>(false)

  const checkPayment = async (userData: UserDataType) => {
    if (userData.type === "client") {
      const checkLastPaymentReq = await checkLastPayment(userData)
      if (checkLastPaymentReq === "expired") {
        router.replace(
          `${routes.profile.name}?${routes.profile.queries.makePayment}`,
        )
      }
    }
  }

  const executePaymentUpdate = async (userData: any) => {
    // eslint-disable-next-line no-console
    console.log("aca", router)

    if (router.query.collection_id !== undefined) {
      console.log("wii")
      const {
        payment_id,
        collection_id,
        collection_status,
        status,
        payment_type,
        merchant_order_id,
      } = router.query
      const paymentData: {
        itemId: string
        paymentExpireDate: string
        preferenceId: string
        pricePaid: number
      } = JSON.parse(localStorage.getItem("payment") as string)
      const profileUpdate = {
        plan: parseInt(paymentData.itemId, 10),
        paymentDate: dateFormated,
        paymentExpireDate: paymentData.paymentExpireDate,
      }

      const updateClientSubscription = await updateClientPaymentData(
        userData.id,
        profileUpdate,
      )

      console.log("updateClientSubscription", updateClientSubscription)

      const paymentCreate = {
        paymentId: payment_id as string,
        collectionId: collection_id as string,
        collectionStatus: collection_status as string,
        status: status as string,
        paymentType: payment_type as string,
        merchantOrderId: merchant_order_id as string,
        preferenceId: paymentData.preferenceId,
        pricePaid: paymentData.pricePaid,
        clientId: parseInt(
          JSON.parse(localStorage.getItem("userData") as string).id,
          10,
        ),
        paymentExpireDate: paymentData.paymentExpireDate,
        itemId: paymentData.itemId,
      }
      const updatePaymentData = await registerPaymentInDB(paymentCreate)
      console.log("updatePaymentData", updatePaymentData)
    }

    //
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) {
      router.replace(`${routes.login.name}?${routes.login.queries.client}`)
    } else if (userData?.logged) {
      setIsLogged(userData.logged)
      if (router.asPath.indexOf("payment_done=success") === -1) {
        checkPayment(userData)
      } else {
        executePaymentUpdate(userData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLogged && (
        <ProfileProvider>
          <ProfileView />
        </ProfileProvider>
      )}
    </div>
  )
}

export default Profile
