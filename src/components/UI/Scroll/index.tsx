import React from "react"
import ScrollView from "./styles"

interface ScrollInterface {
  height: number
  horizontal?: boolean
  children: JSX.Element | JSX.Element[]
  id?: string
}

function Scroll({ height, horizontal, children, id }: ScrollInterface) {
  return (
    <ScrollView height={height} horizontal={horizontal} id={id}>
      {children}
    </ScrollView>
  )
}

export default Scroll
