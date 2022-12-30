const cleanPartnerData = (data: string) => {
  const input = data.toLowerCase()
  const finalData = input.charAt(0).toUpperCase() + input.slice(1)

  return finalData
}

export default cleanPartnerData
