import renameFile from "helpers/formatting/renameFile"

const getPortraitName = (files: FileList) => {
  const imageFileName = [...files].filter(s => s.type.includes("image"))[0].name

  return `${renameFile(imageFileName)}`
}

export default getPortraitName
