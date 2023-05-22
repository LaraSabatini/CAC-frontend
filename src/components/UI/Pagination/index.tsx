import React, { useEffect, useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import {
  NumberPage,
  PagesContainer,
  PaginationContainer,
  ArrowsContainer,
  ArrowItemContainer,
} from "./styles"

interface IPagination {
  totalPages: number
  setPage?: number
  onClickNext?: (page: number) => void
  onClickBack?: (page: number) => void
}

function Pagination({
  totalPages,
  setPage,
  onClickBack,
  onClickNext,
}: IPagination) {
  const [page, setPageState] = useState<number>(1)

  useEffect(() => {
    setPageState(setPage || 1)
  }, [setPage])

  const changePage = (type: "next" | "back") => {
    switch (type) {
      case "next":
        setPageState(page + 1 <= totalPages ? page + 1 : page)
        if (onClickNext) onClickNext(page + 1 <= totalPages ? page + 1 : page)
        break
      case "back":
        setPageState(page - 1 > 0 ? page - 1 : page)
        if (onClickBack) onClickBack(page - 1 > 0 ? page - 1 : page)
        break
      default:
        break
    }
  }

  return (
    <PaginationContainer>
      <PagesContainer>
        <NumberPage bold>{page}</NumberPage>-
        <NumberPage>{totalPages}</NumberPage>
      </PagesContainer>
      <ArrowsContainer>
        <ArrowItemContainer onClick={() => changePage("back")}>
          <FiChevronLeft />
        </ArrowItemContainer>
        <ArrowItemContainer onClick={() => changePage("next")}>
          <FiChevronRight />
        </ArrowItemContainer>
      </ArrowsContainer>
    </PaginationContainer>
  )
}

export default Pagination
