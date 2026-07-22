export async function searchBooks(query) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }

  const data = await response.json()

  return data.docs.map(simplifySearchResult)
}

function simplifySearchResult(doc) {
  const key = doc.key || ''
  const id = key.replace('/works/', '')

  return {
    id,
    title: doc.title || 'Unknown Title',
    authors: doc.author_name || [],
    firstPublishYear: doc.first_publish_year || null,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
  }
}

export async function getBookDetails(id) {
  const response = await fetch(
    `https://openlibrary.org/works/${id}.json`
  )

  if (!response.ok) {
    throw new Error('Book not found')
  }

  const data = await response.json()

  let authors = []
  if (data.authors && data.authors.length > 0) {
    const authorKeys = data.authors.map((a) => a.author.key)
    const results = await Promise.allSettled(
      authorKeys.map((key) =>
        fetch(`https://openlibrary.org${key}.json`).then((r) => r.json())
      )
    )
    authors = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value.name)
      .filter(Boolean)
  }

  let description = null
  if (typeof data.description === 'string') {
    description = data.description
  } else if (data.description?.value) {
    description = data.description.value
  }

  const coverId =
    data.covers && data.covers.length > 0 ? data.covers[0] : null

  return {
    id,
    title: data.title || 'Unknown Title',
    description,
    authors,
    subjects: data.subjects || [],
    firstPublishDate: data.first_publish_date || null,
    coverUrl: coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : null,
    coverId,
  }
}
