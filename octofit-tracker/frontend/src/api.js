export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchItems(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return responseItems(await response.json())
}