export const fetchClient = async ({ url, method = 'GET', body = null, headers = {} }) => {
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`)
  }
}
