import React, { useContext, useEffect } from "react"
import { DashboardContext } from "contexts/Dashboard"
import { getFilters } from "services/articles/filters.service"
import Header from "components/Views/Header"
import ArticleBody from "../Articles/ArticleBody"

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
      <ArticleBody
        article={{
          id: 0,
          title: "Se reglamentó el Registro Público de Administradores",
          description: "",
          createdBy: { id: 0, email: "" },
          changesHistory: [],
          portrait: "",
          subtitle: "Cómo funciona y hasta qué fecha te podés registrar",
          regionFilters: [{ id: 1, value: "Prov. de Buenos Aires" }],
          themeFilters: [],
          article:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut eu sem integer vitae justo eget magna fermentum. Amet justo donec enim diam. Sed turpis tincidunt id aliquet risus feugiat in ante metus.\nUllamcorper morbi tincidunt ornare massa eget egestas purus viverra. In egestas erat imperdiet sed euismod nisi porta lorem. Aliquet eget sit amet tellus cras adipiscing enim eu. Mattis pellentesque id nibh tortor id aliquet. Felis eget nunc lobortis mattis aliquam faucibus purus.\nAliquet nec ullamcorper sit amet risus. Neque vitae tempus quam pellen-tesque nec nam aliquam sem. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Augue mauris augue neque gravida in fermentum. Justo eget magna fermentum iaculis. Vel pretium lectus quam id leo in. Posuere morbi leo urna molestie at elementum eu facilisis.",
          attachments: [],
          author: "Flor Voglino",
        }}
      />
    </>
  )
}

export default DashboardView
