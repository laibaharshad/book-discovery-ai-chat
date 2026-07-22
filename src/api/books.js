const SEARCH_URL = 'https://openlibrary.org/search.json'
const COVER_BASE = 'https://covers.openlibrary.org/b/id'

function buildCoverUrl(coverId, size = 'M') {
  if (!coverId) return null
  return `${COVER_BASE}/${coverId}-${size}.jpg`
}

function simplifyBook(doc) {
  const key = doc.key || ''
  const id = key.startsWith('/works/') ? key.replace('/works/', '') : key

  return {
    id,
    title: doc.title || 'Untitled',
    authors: doc.author_name || [],
    firstPublishYear: doc.first_publish_year || null,
    coverId: doc.cover_i || null,
    coverUrl: buildCoverUrl(doc.cover_i),
  }
}

export async function searchBooks(query) {
  const trimmed = query.trim()
  if (!trimmed) return []

  const url = `${SEARCH_URL}?q=${encodeURIComponent(trimmed)}&limit=20`

  let response
  try {
    response = await fetch(url)
  } catch (err) {
    throw new Error('Network error while searching books. Check your connection.')
  }

  if (!response.ok) {
    throw new Error(`Search failed with status ${response.status}`)
  }

  let data
  try {
    data = await response.json()
  } catch (err) {
    throw new Error('Failed to parse search results.')
  }

  const docs = Array.isArray(data.docs) ? data.docs : []
  return docs.map(simplifyBook)
}

export function getCoverUrl(coverId, size = 'M') {
  return buildCoverUrl(coverId, size)
}

const WORK_URL = 'https://openlibrary.org/works'
const AUTHOR_URL = 'https://openlibrary.org/authors'

function normalizeDescription(description) {
  if (!description) return null
  if (typeof description === 'string') return description
  if (typeof description === 'object' && description.value) return description.value
  return null
}

async function fetchAuthorName(authorKey) {
  const id = authorKey.replace('/authors/', '')
  try {
    const res = await fetch(`${AUTHOR_URL}/${id}.json`)
    if (!res.ok) return null
    const data = await res.json()
    return data.name || null
  } catch {
    return null
  }
}

export async function getBookDetails(id) {
  if (!id) throw new Error('Book ID is required.')

  let response
  try {
    response = await fetch(`${WORK_URL}/${encodeURIComponent(id)}.json`)
  } catch (err) {
    throw new Error('Network error while loading book details. Check your connection.')
  }

  if (!response.ok) {
    throw new Error(`Could not load book details (status ${response.status}).`)
  }

  let data
  try {
    data = await response.json()
  } catch (err) {
    throw new Error('Failed to parse book details.')
  }

  if (!data || !data.title) {
    throw new Error('Book details are unavailable.')
  }

  const authorEntries = Array.isArray(data.authors) ? data.authors : []
  const authorKeys = authorEntries
    .map((entry) => entry.author?.key || entry.key)
    .filter(Boolean)
  const authors = (await Promise.all(authorKeys.map(fetchAuthorName))).filter(Boolean)

  const coverId = Array.isArray(data.covers) && data.covers.length > 0 ? data.covers[0] : null

  return {
    id,
    title: data.title,
    description: normalizeDescription(data.description),
    authors,
    subjects: Array.isArray(data.subjects) ? data.subjects : [],
    firstPublishYear: data.first_publish_year || null,
    firstPublishDate: data.first_publish_date || null,
    coverId,
    coverUrl: buildCoverUrl(coverId, 'L'),
  }
}
