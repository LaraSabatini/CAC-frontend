import React, { useContext, useEffect, useState } from "react"
import { ClientsContext } from "contexts/Clients"
import getPlans from "services/pricing/getPlans.service"
import { getProfileDataForTable } from "services/auth/getProfileData.service"
import ProductsInterface from "interfaces/content/Pricing"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import Header from "./Header"
import Table from "./Table"
import CommentSection from "./CommentSection"
import DetailsCard from "./DetailsCard"
import Container from "./styles"

function PartnersView() {
  const {
    currentPage,
    setTotalPages,
    setClients,
    clientSelected,
    setPlans,
    setClientSelected,
    triggerListUpdate,
  } = useContext(ClientsContext)
  const [serverError, setServerError] = useState<boolean>(false)

  const getDataForTable = async () => {
    const getProfileDataForTableCall = await getProfileDataForTable(currentPage)
    if (getProfileDataForTableCall.status === 200) {
      setClients(getProfileDataForTableCall.data)
      setTotalPages(
        getProfileDataForTableCall.meta.totalPages === 0
          ? 1
          : getProfileDataForTableCall.meta.totalPages,
      )
    } else {
      setServerError(true)
    }

    const getPlansCall = await getPlans()

    if (getPlansCall.status === 200) {
      const cleanedPlans: { id: number; name: string }[] = []

      getPlansCall.data.map((plan: ProductsInterface) =>
        cleanedPlans.push({
          id: plan.id,
          name: plan.name.replace(/plan/gi, "").trim(),
        }),
      )
      setPlans(cleanedPlans)

      setClientSelected(null)
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    getDataForTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, triggerListUpdate])

  return (
    <>
      <Header />
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />
      <Container>
        <Table />
        {clientSelected !== null && <DetailsCard />}
      </Container>
      <CommentSection clientId={clientSelected} />
    </>
  )
}

export default PartnersView
