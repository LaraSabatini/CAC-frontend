import React, { useContext, useEffect } from "react"
import { ClientsContext } from "contexts/Clients"
import getPlans from "services/pricing/getPlans.service"
import { getProfileDataForTable } from "services/auth/getProfileData.service"
import ProductsInterface from "interfaces/content/Pricing"
import Header from "components/Views/Common/Header"
import Table from "./Table"
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
  } = useContext(ClientsContext)

  const getDataForTable = async () => {
    const getProfileDataForTableCall = await getProfileDataForTable(currentPage)
    setClients(getProfileDataForTableCall.data.data)
    setTotalPages(
      getProfileDataForTableCall.data.meta.totalPages === 0
        ? 1
        : getProfileDataForTableCall.data.meta.totalPages,
    )

    const getPlansCall = await getPlans()

    const cleanedPlans: { id: number; name: string }[] = []

    getPlansCall.data.map((plan: ProductsInterface) =>
      cleanedPlans.push({
        id: plan.id,
        name: plan.name.replace(/plan/gi, "").trim(),
      }),
    )
    setPlans(cleanedPlans)

    setClientSelected(null)
  }

  useEffect(() => {
    getDataForTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <>
      <Header />
      <Container>
        <Table />
        {clientSelected !== null && <DetailsCard />}
      </Container>
    </>
  )
}

export default PartnersView
