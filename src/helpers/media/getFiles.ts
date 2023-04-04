const getFiles = (fileName: string, fileExtension: string): string => {
  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/fileManagement`

  return `${apiURL}/file_name=${fileName}&file_extension=${fileExtension}`
}

export default getFiles
