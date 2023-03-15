import { useEffect } from "react"
import type { AppProps } from "next/app"
import { GlobalStyle } from "theme/styles"
import { getFilters } from "services/articles/filters.service"

function MyApp({ Component, pageProps }: AppProps) {
  const chargeRegionsData = async () => {
    const getFiltersCall = await getFilters("regions")
    localStorage.removeItem("regions")
    localStorage.setItem("regions", JSON.stringify(getFiltersCall.data))
  }

  useEffect(() => {
    chargeRegionsData()
  }, [])

  return (
    <div>
      <GlobalStyle />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
