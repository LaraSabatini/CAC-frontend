interface PartnersContextInterface {
  clientSelected: number | null
  setClientSelected(clientSelected: number | null): void
  currentPage: number
  setCurrentPage(currentPage: number): void
  totalPages: number
  setTotalPages(totalPages: number): void
}
export default PartnersContextInterface
