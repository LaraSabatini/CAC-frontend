import formatDate from "../DDMMYYYYFormat"

describe("formatDate", () => {
  it("formats the date passed as dd-mm-yyyy when day and month are minor to 10", () => {
    const date = new Date("Mon Jan 09 2023 10:39:31 GMT-0300")

    const functionSet = formatDate(date)

    expect(functionSet).toEqual("09-01-2023")
  })

  it("formats the date passed as dd-mm-yyyy when day is minor to 10", () => {
    const date = new Date("Thu Dec 01 2022 10:39:31 GMT-0300")

    const functionSet = formatDate(date)

    expect(functionSet).toEqual("01-12-2022")
  })

  it("formats the date passed as dd-mm-yyyy when month is minor to 10", () => {
    const date = new Date("Wed Jan 12 2023 10:39:31 GMT-0300")

    const functionSet = formatDate(date)

    expect(functionSet).toEqual("12-01-2023")
  })
})
