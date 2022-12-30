import React, { useEffect, useState, useContext } from "react"
import { getPricing } from "services/pricing/pricing.service"
import { PaymentContext } from "contexts/Payment"
import texts from "strings/pricing.json"
import PricingInterface from "interfaces/content/Pricing"
import PricingCard from "./PricingCard"
import ClientDataForm from "../Payment/ClientDataForm"
import { Container, Title, CardsContainer, SubTitle } from "./styles"

function PricingView() {
  const { setPlanSelected, planSelected } = useContext(PaymentContext)

  const [pricingList, setPricingList] = useState<PricingInterface[]>([])

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
              selectPlan={() => setPlanSelected(item)}
            />
          ))}
      </CardsContainer>
      {planSelected !== null && (
        <ClientDataForm closeModal={() => setPlanSelected(null)} />
      )}
    </Container>
  )
}

export default PricingView
