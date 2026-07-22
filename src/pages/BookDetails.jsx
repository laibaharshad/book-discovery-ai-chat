import { useParams, Link } from 'react-router-dom'
import { useBookDetails } from '../hooks/useBookDetails'
import { useFavorites } from '../context/FavoritesContext'

function BookDetails() {
  const { id } = useParams()
  const { book, loading, error } = useBookDetails(id)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const favorite = book ? isFavorite(book.id) : false

  const handleFavorite = () => {
    if (!book) return
    if (favorite) {
      removeFavorite(book.id)
    } else {
      addFavorite(book)
    }
  }

  return (
    <section className="book-details">
      <Link to="/" className="back-link">&larr; Back to search</Link>

      {loading && <p className="status">Loading book details...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && book && (
        <article className="details-card">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="details-cover" />
          ) : (
            <div className="details-cover placeholder">No cover</div>
          )}

          <div className="details-info">
            <h1>{book.title}</h1>

            <p className="details-authors">
              {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
            </p>

            {(book.firstPublishDate || book.firstPublishYear) && (
              <p className="details-pub">
                First published: {book.firstPublishDate || book.firstPublishYear}
              </p>
            )}

            <button
              type="button"
              className="favorite-button"
              onClick={handleFavorite}
            >
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            {book.description && (
              <div className="details-description">
                <h2>Description</h2>
                <p>{book.description}</p>
              </div>
            )}

            {book.subjects.length > 0 && (
              <div className="details-subjects">
                <h2>Subjects</h2>
                <ul>
                  {book.subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      )}
    </section>
  )
}

export default BookDetails
