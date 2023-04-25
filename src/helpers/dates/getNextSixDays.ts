const getNextSevenDates = (startDate: Date): string[] => {
  const nextSixDatesFormatted = []
  const options = { day: "2-digit", month: "2-digit", year: "numeric" }
  for (let i = 1; i <= 7; i += 1) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const formattedDate = date.toLocaleDateString(
      "es-ES",
      options as { day: "2-digit"; month: "2-digit"; year: "numeric" },
    )

    nextSixDatesFormatted.push(formattedDate)
  }
  return nextSixDatesFormatted
}

export default getNextSevenDates
