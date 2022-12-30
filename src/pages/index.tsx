import React from "react"
import ClientDataForm from "components/Views/Payment/ClientDataForm"

function Home() {
  // eslint-disable-next-line no-console
  return <ClientDataForm closeModal={() => console.log(0)} />
}

export default Home
