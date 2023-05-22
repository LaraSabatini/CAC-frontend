/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import ProfileProvider from "contexts/Profile"
import ProfileView from "components/Views/Common/Profile"
import { UserDataType } from "interfaces/users/General"
import ModalStatus from "components/UI/ModalStatus"
import checkLastPayment from "helpers/dates/checkLastPayment"

function Profile() {
  const router = useRouter()

  const [isLogged, setIsLogged] = useState<boolean>(false)

  const [paymentStatus, setPaymentStatus] = useState<string>("")
  const [modalTexts, setModalTexts] = useState<
    | {
        title: string
        description: string
        status: "error" | "success" | "warning" | "notice"
      }
    | undefined
  >()

  const madePayment =
    router.asPath.indexOf("payment_done=success") !== -1 ||
    router.asPath.indexOf("payment_done=failure") !== -1 ||
    router.asPath.indexOf("payment_done=pending") !== -1

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) {
      router.replace(`${routes.login.name}?${routes.login.queries.client}`)
    } else if (userData?.logged) {
      setIsLogged(userData.logged)
      if (!madePayment) {
        checkPayment(userData)
      } else {
        const status = router.asPath.split("=")[1]
        setPaymentStatus(router.asPath.split("=")[1])
        if (status === "success") {
          setModalTexts({
            title: "Excelente",
            description: "Tu pago se proceso con exito",
            status,
          })
        } else if (status === "failure") {
          setModalTexts({
            title: "UPS",
            description:
              "Ocurrio un error al procesar el pago. Si ves acreditada la compra en tu cuenta de Mercado Pago, por favor contactate con soporte para habilitar tu subscripcion.",
            status: "error",
          })
        } else {
          setModalTexts({
            title: "Pago en proceso",
            description:
              "Tu pago esta en proceso, una vez que se acredite, se habilitara tu cuenta",
            status: "notice",
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLogged && (
        <ProfileProvider>
          {paymentStatus !== "" && modalTexts !== undefined && (
            <ModalStatus
              title={modalTexts.title}
              description={modalTexts.description}
              status={modalTexts.status}
              selfClose
              selfCloseAction={() => {
                router.push(
                  {
                    query: {},
                  },
                  undefined,
                  { shallow: true },
                )
                setPaymentStatus("")
                setModalTexts(undefined)
              }}
            />
          )}
          <ProfileView />
        </ProfileProvider>
      )}
    </div>
  )
}

export default Profile
