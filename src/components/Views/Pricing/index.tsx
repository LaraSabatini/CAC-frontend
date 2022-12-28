import React from "react"
import texts from "strings/pricing.json"
import PricingCard from "./PricingCard"
import { Container, Title, CardsContainer, SubTitle } from "./styles"

function PricingView() {
  const subscribe = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
  }

  return (
    <Container>
      <div>
        <Title>{texts.title}</Title>
        <SubTitle>{texts.description}</SubTitle>
      </div>
      <CardsContainer>
        <PricingCard
          name="Plan mensual"
          price={1000}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          id={1}
          time={1}
          selectPlan={() => subscribe(1)}
        />
      </CardsContainer>
    </Container>
  )
}

export default PricingView
