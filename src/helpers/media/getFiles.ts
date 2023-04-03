const getFiles = (fileName: string, fileExtension: string): string => {
  const apiURL = "http://camarafederal.com.ar/software/api/fileManagement"

  return `${apiURL}/file_name=${fileName}&file_extension=${fileExtension}`
}

export default getFiles
