import ProductsInterface from "interfaces/content/Pricing"
import defaultPost from "../defaultPost"
import apiURL from "./route"

const createPricing = async (body: ProductsInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export default createPricing
