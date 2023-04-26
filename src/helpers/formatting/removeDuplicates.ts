const removeDuplicates = (arr: any) => {
  return arr.filter((item: any, index: any) => arr.indexOf(item) === index)
}
export default removeDuplicates
