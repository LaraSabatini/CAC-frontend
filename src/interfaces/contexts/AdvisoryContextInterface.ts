import {
  AdvisoryInterface,
  PublicEventsInterface,
} from "interfaces/content/Advisories"

interface AdvisoryContextInterface {
  advisoryList: AdvisoryInterface[] | []
  setAdvisoryList(advisoryList: AdvisoryInterface[] | []): void
  publicEventList: PublicEventsInterface[] | []
  setPublicEventList(publicEventList: PublicEventsInterface[] | []): void
}
export default AdvisoryContextInterface
