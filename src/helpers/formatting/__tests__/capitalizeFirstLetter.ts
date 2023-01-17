import capitalizeFirstLetter from "../capitalizeFirstLetter"

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of the word passed", () => {
    const functionSet = capitalizeFirstLetter("word")

    expect(functionSet).toEqual("Word")
  })

  it("capitalizes the first letter of the word passed when all uppercase", () => {
    const functionSet = capitalizeFirstLetter("WORD")

    expect(functionSet).toEqual("Word")
  })

  it("capitalizes the first letter of the word passed when random case", () => {
    const functionSet = capitalizeFirstLetter("wOrD")

    expect(functionSet).toEqual("Word")
  })
})
