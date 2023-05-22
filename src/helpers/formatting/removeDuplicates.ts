const removeDuplicates = (array: any[]): any[] => {
  return [
    ...new Set(array.map((object: any) => JSON.stringify(object))),
  ].map((object: string) => JSON.parse(object))
}

export default removeDuplicates
