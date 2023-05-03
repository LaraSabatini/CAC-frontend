const frontValidation = (
  name: string,
  lastName: string,
  email: string,
  phoneAreaCode: string,
  phoneNumber: string,
  identificationNumber: string,
): boolean => {
  if (
    name === "" ||
    lastName === "" ||
    email === "" ||
    phoneAreaCode === "" ||
    phoneNumber === "" ||
    identificationNumber === ""
  ) {
    return false
  }
  return true
}

export default frontValidation
