import { useFavorites } from '../context/FavoritesContext'
import BookCard from '../components/BookCard'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <section>
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p className="status">You have no saved books yet.</p>
      ) : (
        <ul className="book-grid">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Favorites
