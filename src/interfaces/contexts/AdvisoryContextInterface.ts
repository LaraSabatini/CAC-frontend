import {
  AdvisoryInterface,
  PublicEventsInterface,
} from "interfaces/content/Advisories"

interface AdvisoryContextInterface {
  advisoryList: AdvisoryInterface[] | []
  setAdvisoryList(advisoryList: AdvisoryInterface[] | []): void
  publicEventList: PublicEventsInterface[] | []
  setPublicEventList(publicEventList: PublicEventsInterface[] | []): void
  serverError: boolean
  setServerError(serverError: boolean): void
}
export default AdvisoryContextInterface
