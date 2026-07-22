import { useState, useCallback } from 'react'
import { searchBooks as searchBooksApi } from '../api/books'

export function useBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (query) => {
    setLoading(true)
    setError(null)
    try {
      const results = await searchBooksApi(query)
      setBooks(results)
    } catch (err) {
      setBooks([])
      setError(err.message || 'Something went wrong while searching.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { books, loading, error, searchBooks: search }
}
