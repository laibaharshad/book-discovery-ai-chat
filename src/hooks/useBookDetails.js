import { useState, useEffect, useCallback } from 'react'
import { getBookDetails as getBookDetailsApi } from '../api/books'

export function useBookDetails(id) {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async (bookId) => {
    if (!bookId) return
    setLoading(true)
    setError(null)
    setBook(null)
    try {
      const details = await getBookDetailsApi(bookId)
      setBook(details)
    } catch (err) {
      setError(err.message || 'Something went wrong loading this book.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(id)
  }, [id, load])

  return { book, loading, error }
}
