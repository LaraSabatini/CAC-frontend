const renameFile = (fileName: string): string => {
  return fileName.split(".")[0].split(" ").join("-")
}

export default renameFile
