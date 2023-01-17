interface InputValidation {
  name: boolean
  surname: boolean
  email: boolean
  phone: {
    area_code: boolean
    number: boolean
  }
  identification: {
    number: boolean
  }
}

export default InputValidation
