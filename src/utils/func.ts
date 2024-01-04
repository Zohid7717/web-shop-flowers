export const createId = () => {
  const timestamp = new Date().getTime()
  const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`
  return uniqueId
}