import compareObjects from "./compareObjects"

const compareArrays = (a1: any, a2: any) =>
  a1.length === a2.length &&
  a1.every((o: any, idx: number) => compareObjects(o, a2[idx]))

export default compareArrays
