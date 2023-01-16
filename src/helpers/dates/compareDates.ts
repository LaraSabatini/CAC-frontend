const compareDates = (date: string, today = new Date()): boolean => {
  const day = date.slice(0, 2)
  const month = date.slice(3, 5)
  const year = date.slice(6, 10)

  const formatDate = new Date(`${month}/${day}/${year}`)

  return formatDate > today
}

export default compareDates
