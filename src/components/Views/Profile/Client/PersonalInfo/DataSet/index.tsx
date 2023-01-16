import React from "react"
import DataSetInterface from "interfaces/components/DataSetInterface"
import { DataSetStyled, RowContent } from "./styles"

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
