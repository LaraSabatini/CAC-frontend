const getVideoURL = (url: string): string => {
  const videoIdentifier = url.split("watch?v=")[1].split("&")[0]

  return `https://www.youtube.com/embed/${videoIdentifier}`
}

export default getVideoURL
