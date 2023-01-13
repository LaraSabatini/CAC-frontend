import React from "react"
import { DataSetStyled, RowContent } from "./styles"

interface DataSetInterface {
  icon: JSX.Element | JSX.Element[]
  title: string[] | string
  value: string[] | string
}

function DataSet({ icon, title, value }: DataSetInterface) {
  return (
    <DataSetStyled>
      {icon}
      {Array.isArray(title) ? (
        <RowContent>
          {title.map((text, i) => (
            <p key={text}>
              <span>{text}</span>
              {value[i]}
            </p>
          ))}
        </RowContent>
      ) : (
        <p>
          <span>{title}</span>
          {value}
        </p>
      )}
    </DataSetStyled>
  )
}

export default DataSet
