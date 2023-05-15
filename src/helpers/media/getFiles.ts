const getFiles = (fileName: string, fileExtension: string): string => {
  return `https://camarafederal.com.ar/plataforma/api/files/${fileName}.${fileExtension}`
}

export default getFiles
