const frontValidation = (
  name: string,
  lastName: string,
  email: string,
  phoneAreaCode: string,
  phoneNumber: string,
  identificationNumber: string,
  realEstateRegistration: string,
): boolean => {
  if (
    name === "" ||
    lastName === "" ||
    email === "" ||
    phoneAreaCode === "" ||
    phoneNumber === "" ||
    identificationNumber === "" ||
    realEstateRegistration === ""
  ) {
    return false
  }
  return true
}

export default frontValidation
