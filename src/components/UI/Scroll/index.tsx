import React from "react"
import ScrollInterface from "interfaces/components/ScrollInterface"
import ScrollView from "./styles"

function Scroll({ height, horizontal, children, id }: ScrollInterface) {
  return (
    <ScrollView height={height} horizontal={horizontal} id={id}>
      {children}
    </ScrollView>
  )
}

export default Scroll
