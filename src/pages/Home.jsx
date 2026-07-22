import { useState } from 'react'
import { useBooks } from '../hooks/useBooks'
import BookCard from '../components/BookCard'

function Home() {
  const [query, setQuery] = useState('')
  const { books, loading, error, searchBooks } = useBooks()

  const handleSearch = (e) => {
    e.preventDefault()
    searchBooks(query)
  }

  return (
    <section>
      <h1>Discover Books</h1>
      <p>Search and explore books from Open Library.</p>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a book or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="status">No results yet. Try searching for a book.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <ul className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Home
