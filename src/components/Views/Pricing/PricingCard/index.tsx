import React from "react"
import PricingInterface from "interfaces/content/Pricing"
import texts from "strings/pricing.json"
import numberWithCommas from "helpers/formatting/formatPrice"
import Button from "components/UI/Button"
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
    <Card>
      <div>
        <Title>{name}</Title>
        <Price>${numberWithCommas(price)}</Price>
      </div>
      <Detail>
        {texts.detail} ${numberWithCommas(price / time)}
      </Detail>
      <Description>{description}</Description>
      <Button action={selectPlan} content={texts.subscribe} cta />
    </Card>
  )
}

export default PricingCard
