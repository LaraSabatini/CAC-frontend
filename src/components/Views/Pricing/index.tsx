import React, { useEffect, useState } from "react"
import { getPricing } from "services/pricing/pricing.service"
import texts from "strings/pricing.json"
import PricingInterface from "interfaces/content/Pricing"
import PricingCard from "./PricingCard"
import { Container, Title, CardsContainer, SubTitle } from "./styles"

function PricingView() {
  const [pricingList, setPricingList] = useState<PricingInterface[]>([])

  const subscribe = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
  }

  const fillData = async () => {
    const getPricingList = await getPricing()
    setPricingList(getPricingList.data)
  }

  useEffect(() => {
    fillData()
  }, [])

  return (
    <Container>
      <div>
        <Title>{texts.title}</Title>
        <SubTitle>{texts.description}</SubTitle>
      </div>
      <CardsContainer>
        {pricingList.length &&
          pricingList.map((item: PricingInterface) => (
            <PricingCard
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              id={item.id}
              time={item.time}
              selectPlan={() => subscribe(item.id)}
            />
          ))}
      </CardsContainer>
    </Container>
  )
}

export default PricingView
