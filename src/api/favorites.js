export const getFavorites = async () => {
  let response = await fetch('http://localhost:8080/repo/')

  if (!response.ok) throw new Error('Data could not be retrieved.')

  return response.json()
}
