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
import { Button, Modal } from "antd"
import PricingCard from "../PricingCard"
import { ButtonContainer, CardContainer } from "./styles"

function PlanModal() {
  const { setPayment, payment, pricingList, setPricingList } = useContext(
    PaymentContext,
  )

  const { profileData } = useContext(ProfileContext)
  const client = profileData as ClientInterface

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

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

  const [showPlans, setShowPlans] = useState<boolean>(false)

  return (
    <>
      <Button type="primary" onClick={() => setShowPlans(true)}>
        Actualizar pago
      </Button>
      <Modal
        open={showPlans}
        title="Selecciona tu plan"
        width="fit-content"
        cancelText="Cancelar"
        onCancel={() => {
          setPayment(defaultPaymet)
          setShowPlans(false)
        }}
        footer={[
          <Button
            onClick={() => {
              setPayment(defaultPaymet)
              setShowPlans(false)
            }}
          >
            Cancelar
          </Button>,

          !renderMPButton ? (
            <>
              {payment.item.id !== "" && (
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    setLoading(true)
                    setTimeout(() => {
                      setRenderMPButton(true)
                      setLoading(false)
                    }, 1000)
                  }}
                >
                  Validar datos
                </Button>
              )}
            </>
          ) : (
            <ButtonContainer>
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
            </ButtonContainer>
          ),
        ]}
      >
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
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
      </Modal>
    </>
  )
}

export default PlanModal
