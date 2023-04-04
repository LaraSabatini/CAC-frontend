import React from "react"
import texts from "strings/pricing.json"
import PricingInterface from "interfaces/content/Pricing"
import numberWithCommas from "helpers/formatting/formatPrice"
import Button from "components/UI/Button"
import Card from "./styles"

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
      <p className="title">{name}</p>
      <p className="price">$ {numberWithCommas(price)}</p>
      <p className="detail">
        {texts.detail} ${numberWithCommas(price / time)}
      </p>
      <p className="description">{description}</p>

      <Button content="Seleccionar" cta action={selectPlan} />
    </Card>
  )
}

export default PricingCard
