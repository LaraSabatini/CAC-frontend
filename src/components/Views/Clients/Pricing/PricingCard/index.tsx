import React from "react"
import PricingInterface from "interfaces/content/Pricing"
import texts from "strings/pricing.json"
import numberWithCommas from "helpers/formatting/formatPrice"
import { Button } from "antd"
import { Card, Title, Price, Detail, Description } from "./styles"

interface PricingCardInterface extends PricingInterface {
  selectPlan: (arg?: any) => void
}

function PricingCard({
  name,
  price,
  description,
  time,
  selectPlan,
}: PricingCardInterface) {
  return (
    <Card onClick={selectPlan}>
      <div>
        <Title>{name}</Title>
        <Price>${numberWithCommas(price)}</Price>
      </div>
      <Detail>
        <b>{texts.detail}</b> ${numberWithCommas(price / time)} ARS
      </Detail>
      <Description>{description}</Description>
      <Button type="primary" size="large" onClick={selectPlan}>
        {texts.subscribe}
      </Button>
    </Card>
  )
}

export default PricingCard
