import addMonths from "../addMonths"
import formatDate from "../DDMMYYYYFormat"

describe("add months", () => {
  it("adds the amount of months passed", () => {
    const functionSet = addMonths(1)

    const date = new Date()
    const addEqualMonths = new Date(date.setMonth(date.getMonth() + 1))

    expect(functionSet).toEqual(formatDate(addEqualMonths))
  })
})
