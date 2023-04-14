import { createContext, useMemo } from "react"

export const ConsultanciesContext = createContext({})

function ConsultanciesProvider({ children }: any) {
  const value: any = useMemo(() => ({}), [])

  return (
    <ConsultanciesContext.Provider value={value}>
      {children}
    </ConsultanciesContext.Provider>
  )
}

export default ConsultanciesProvider
