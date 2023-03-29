import React, { useEffect, useContext, useState } from "react"
import { PaymentContext } from "contexts/Payment"
import { ProfileContext } from "contexts/Profile"
import routes from "routes"
import texts from "strings/profile.json"
import ClientInterface from "interfaces/users/Client"
import getPlans from "services/pricing/getPlans.service"
import PricingInterface from "interfaces/content/Pricing"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import MercadoPagoForm from "@components/Views/Clients/Payment/MercadoPagoButton"
import defaultPaymet from "const/defaultValuesForPaymentContext"
import Modal from "components/UI/Modal"
import Button from "components/UI/Button"
import PricingCard from "../PricingCard"
import {
  ModalContainer,
  ButtonContainer,
  CardContainer,
  Title,
  UpdatePaymentButton,
} from "./styles"

function PlanModal({ close }: { close: (arg?: any) => void }) {
  const { setPayment, payment, pricingList, setPricingList } = useContext(
    PaymentContext,
  )

  const { profileData } = useContext(ProfileContext)
  const client = profileData as ClientInterface

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)
  const [renderMPButton, setRenderMPButton] = useState<boolean>(false)

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
    setPayment({
      item: payment.item,
      payer: {
        name: client.name,
        surname: client.lastName,
        email: client.email,
      },
    })

    const getPlansReq = await getPlans()
    if (getPlansReq.status === 200) {
      setPricingList(getPlansReq.data)
    } else {
      setServerErrorModal(true)
    }
  }

  useEffect(() => {
    getPricingPlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      <ModalContainer>
        <Title>Selecciona tu plan</Title>
        <CardContainer>
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
        </CardContainer>
        <ButtonContainer>
          <Button
            content="Cancelar"
            cta={false}
            action={() => {
              close()
              setPayment(defaultPaymet)
            }}
          />
          {!renderMPButton ? (
            <>
              {payment.item.id !== "" && (
                <UpdatePaymentButton onClick={() => setRenderMPButton(true)}>
                  Validar datos
                </UpdatePaymentButton>
              )}
            </>
          ) : (
            <MercadoPagoForm
              label={texts.paymentData.updatePayment}
              item={[
                {
                  id: payment.item.id,
                  title: payment.item.title,
                  quantity: 1,
                  unit_price: payment.item.unit_price,
                },
              ]}
              payer={{
                name: client.name,
                surname: client.lastName,
                email: client.email,
              }}
              type="update"
              redirectPreferenceError={`${routes.profile.name}?${routes.profile.queries.updatePaymentFailure}`}
            />
          )}
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  )
}

export default PlanModal
