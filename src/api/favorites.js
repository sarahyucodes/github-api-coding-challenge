export const getFavorites = async () => {
  let response = await fetch('http://localhost:8080/repo/')

  if (!response.ok) throw new Error('Data could not be retrieved.')

  return response.json()
}

export const postFavorite = async (repo) => {
  let response = await fetch('http://localhost:8080/repo/', {
    method: 'POST',
    body: repo
  })

  return response.json()
}

export const deleteFavorite = async (id) => {
  let response = await fetch(`http://localhost:8080/repo/${id}`, {
    method: 'DELETE'
  })

  return response.ok
}
