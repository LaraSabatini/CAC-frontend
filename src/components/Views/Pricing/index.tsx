import React, { useEffect, useContext } from "react"
import getPlans from "services/pricing/getPlans.service"
import { PaymentContext } from "contexts/Payment"
import texts from "strings/pricing.json"
import PricingInterface from "interfaces/content/Pricing"
import { defaultPaymet } from "const/defaultValuesForPaymentContext"
import PricingCard from "./PricingCard"
import ClientDataForm from "../Payment/ClientDataForm"

import { Container, Title, CardsContainer, SubTitle } from "./styles"

function PricingView() {
  const { setPayment, payment, pricingList, setPricingList } = useContext(
    PaymentContext,
  )

  const fillData = async () => {
    const getPricingList = await getPlans()
    setPricingList(getPricingList.data)
  }

  const selectPlan = (item: PricingInterface) => {
    setPayment({
      item: {
        id: `${item.id}`,
        title: item.name,
        quantity: 1,
        unit_price: item.price,
      },
      payer: payment.payer,
    })
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <div>
        <Title>{texts.title}</Title>
        <SubTitle>{texts.description}</SubTitle>
      </div>
      <CardsContainer>
        {pricingList.length > 0 &&
          pricingList.map((item: PricingInterface) => (
            <PricingCard
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              id={item.id}
              time={item.time}
              selectPlan={() => selectPlan(item)}
            />
          ))}
      </CardsContainer>
      {payment.item.id !== "" && (
        <ClientDataForm closeModal={() => setPayment(defaultPaymet)} />
      )}
    </Container>
  )
}

export default PricingView
