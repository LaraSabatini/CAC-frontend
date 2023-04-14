const getCalendarMonth = (year: number, month: number): Date[] => {
  const firstOfMonth = new Date(year, month - 1, 1)
  const lastOfMonth = new Date(year, month, 0)
  const startDate = new Date(year, month - 1, 1 - firstOfMonth.getDay())
  const endDate = new Date(
    year,
    month - 1,
    lastOfMonth.getDate() + (6 - lastOfMonth.getDay()),
  )

  const dates = []

  while (startDate <= endDate) {
    dates.push(new Date(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }

  return dates
}

export default getCalendarMonth
