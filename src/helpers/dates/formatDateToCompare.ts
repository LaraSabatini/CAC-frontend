const formatDateToCompare = (date: Date, currentYear: number) => {
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

  return `${day}-${month}-${currentYear}`
}

export const stringToDate = (dateString: string): Date => {
  const parts = dateString.split("-")

  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1 // JavaScript months are zero-indexed
  const year = parseInt(parts[2], 10)

  const date = new Date(year, month, day)

  return date
}

export default formatDateToCompare
