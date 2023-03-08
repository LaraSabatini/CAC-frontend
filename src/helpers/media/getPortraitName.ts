import renameFile from "helpers/formatting/renameFile"

const getPortraitName = (files: FileList) => {
  const imageFileName = [...files].filter(s => s.type.includes("image"))[0].name

  const imageFileExtesion = [...files].filter(s => s.type.includes("image"))[0]
    .type

  return `${renameFile(imageFileName)}.${imageFileExtesion.split("/")[1]}`
}

export default getPortraitName
