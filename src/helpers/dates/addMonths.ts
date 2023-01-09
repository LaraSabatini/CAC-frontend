import formatDate from "./DDMMYYYYFormat"

const addMonths = (months: number, date = new Date()): string => {
  date.setMonth(date.getMonth() + months)

  return formatDate(date)
}

export default addMonths
