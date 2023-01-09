import formatDate from "./DDMMYYYYFormat"

const addMonths = (months: number, date = new Date()): string => {
  date.setMonth(date.getMonth() + months)

  // const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  // const month =
  //   date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  // const year = date.getFullYear()

  // return `${day}-${month}-${year}`

  return formatDate(date)
}

export default addMonths
