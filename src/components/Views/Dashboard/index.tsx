import React, { useContext, useEffect } from "react"
import { DashboardContext } from "contexts/Dashboard"
import { getFilters } from "services/articles/filters.service"
import Header from "components/Views/Header"

function DashboardView() {
  const { setRegionFilters, setThemeFilters } = useContext(DashboardContext)

  const getFiltersData = async () => {
    const getFiltersRegion = await getFilters("regions")
    const getFiltersThemes = await getFilters("themes")

    setRegionFilters(getFiltersRegion.data)
    setThemeFilters(getFiltersThemes.data)
  }

  useEffect(() => {
    getFiltersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
    </>
  )
}

export default DashboardView
