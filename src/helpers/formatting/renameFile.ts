const renameFile = (fileName: string): string => {
  return fileName.replaceAll(" ", "-")
}

export default renameFile
