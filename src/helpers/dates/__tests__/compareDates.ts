import compareDates from "../compareDates"

describe("compare dates", () => {
  it("returns true when the date passed is bigger than today", () => {
    const date = "10-01-2024"

    const functionSet = compareDates(date)

    expect(functionSet).toEqual(true)
  })

  it("returns false when the date passed is bigger than today", () => {
    const date = "10-01-2022"

    const functionSet = compareDates(date)

    expect(functionSet).toEqual(false)
  })
})
