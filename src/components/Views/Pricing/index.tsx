import React, { useEffect, useContext } from "react"
import getPlans from "services/pricing/getPlans.service"
import { PaymentContext } from "contexts/Payment"
import texts from "strings/pricing.json"
import PricingInterface from "interfaces/content/Pricing"
import defaultPaymet from "const/defaultValuesForPaymentContext"
import PricingCard from "./PricingCard"
import ClientDataForm from "../Payment/ClientDataForm"
import { Container, Title, CardsContainer, SubTitle } from "./styles"

function PricingView() {
  const { setPayment, payment, pricingList, setPricingList } = useContext(
    PaymentContext,
  )

  const selectPlan = (pricingPlan: PricingInterface) => {
    setPayment({
      item: {
        id: `${pricingPlan.id}`,
        title: pricingPlan.name,
        quantity: 1,
        unit_price: pricingPlan.price,
        time: pricingPlan.time,
      },
      payer: payment.payer,
    })
  }

  const getPricingPlans = async () => {
    const getPlansReq = await getPlans()
    setPricingList(getPlansReq.data)
  }

  useEffect(() => {
    getPricingPlans()
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
          pricingList.map((pricingPlan: PricingInterface) => (
            <PricingCard
              key={pricingPlan.id}
              name={pricingPlan.name}
              price={pricingPlan.price}
              description={pricingPlan.description}
              id={pricingPlan.id}
              time={pricingPlan.time}
              selectPlan={() => selectPlan(pricingPlan)}
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
