import numberWithCommas from "../formatPrice"

describe("formatPrice", () => {
  it("adds points every 3 numbers", () => {
    const functionSet = numberWithCommas(100293)

    expect(functionSet).toBe("100.293")
  })
})
