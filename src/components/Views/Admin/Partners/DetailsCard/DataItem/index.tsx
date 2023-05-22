import React from "react"
import Item from "./styles"

interface DataItemInterface {
  value: string
  content: string
}

function DataItem({ value, content }: DataItemInterface) {
  return (
    <Item>
      <p className="value">{value}</p>
      <p className="content">{content}</p>
    </Item>
  )
}

export default DataItem
