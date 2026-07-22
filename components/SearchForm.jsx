'use client'

import { useState } from 'react'
import { searchBooks } from '../lib/books'
import BookCard from './BookCard'

export default function SearchForm() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const books = await searchBooks(query.trim())
      setResults(books)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-primary placeholder-slate-400 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-6 py-2 font-medium text-white transition-colors hover:bg-cyan-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-secondary">Searching&hellip;</p>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      {!loading && !error && searched && results.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-secondary">
            No books found for &ldquo;{query}&rdquo;.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </>
  )
}
