import React, { useContext } from "react"
import { ClientsContext } from "contexts/Clients"
import Pagination from "components/UI/Pagination"
import {
  TableContainer,
  TableStyled,
  TableHead,
  TableContent,
  Client,
} from "./styles"

function Table() {
  const regions: { id: number; value: string }[] = JSON.parse(
    localStorage.getItem("regions") as string,
  )

  const {
    totalPages,
    currentPage,
    setClientSelected,
    clientSelected,
    setCurrentPage,
    clients,
    plans,
  } = useContext(ClientsContext)

  const selectClient = (id: number) => {
    if (clientSelected === id) {
      setClientSelected(null)
    } else {
      setClientSelected(id)
    }
  }

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(totalPages)
    }
  }

  const goNext = () => {
    if (totalPages >= currentPage + 1) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(1)
    }
  }

  return (
    <TableContainer>
      <TableStyled>
        <TableHead>
          <p className="name-tag">Nombre</p>
          <p className="id-tag">N° de socio</p>
          <p className="plan-tag">Plan</p>
          <p className="identification-tag">Documento</p>
          <p className="region-tag">Region</p>
          <p className="partner-tag">Socio desde</p>
        </TableHead>
        <TableContent>
          {clients.length > 0 &&
            clients.map(client => (
              <Client
                key={client.id}
                selected={clientSelected === client.id}
                onClick={() => selectClient(client.id as number)}
              >
                <p className="name-tag">
                  {client.name} {client.lastName}
                </p>
                <p className="id-tag">{client.id}</p>
                <p className="plan-tag">
                  {plans?.filter(plan => client.plan === plan.id)[0]?.name}
                </p>
                <p className="identification-tag">
                  {client.identificationNumber}
                </p>
                <p className="region-tag">
                  {
                    regions?.filter(region => client.region === region.id)[0]
                      ?.value
                  }
                </p>
                <p className="partner-tag">
                  {client.dateCreated.replace(/-/g, "/")}
                </p>
              </Client>
            ))}
        </TableContent>
      </TableStyled>
      <Pagination
        totalPages={totalPages}
        setPage={currentPage}
        onClickBack={goPrev}
        onClickNext={goNext}
      />
    </TableContainer>
  )
}

export default Table
