const compareDates = (date: string): boolean => {
  const today = new Date()

  const thisDay = today.getDate()
  const thisMonth = today.getMonth() + 1
  const thisYear = today.getFullYear()

  const day = date?.slice(0, 2)
  const month = date?.slice(3, 5)
  const year = date?.slice(6, 10)

  const formatDate = new Date(`${month}/${day}/${year}`)
  const formatTodayDate = new Date(`${thisMonth}/${thisDay}/${thisYear}`)

  return formatDate >= formatTodayDate
}

export default compareDates
