import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function BookCard({ book }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(book.id)

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFavorite(book.id)
    } else {
      addFavorite(book)
    }
  }

  return (
    <li className="book-item">
      <Link to={`/book/${book.id}`} className="book-link">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="book-cover" />
        ) : (
          <div className="book-cover placeholder">No cover</div>
        )}
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">
          {book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
        </p>
        {book.firstPublishYear && (
          <p className="book-year">{book.firstPublishYear}</p>
        )}
      </Link>

      <button
        type="button"
        className="favorite-button"
        onClick={handleFavorite}
      >
        {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </li>
  )
}

export default BookCard
