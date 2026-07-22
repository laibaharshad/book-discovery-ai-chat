import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function Navbar() {
  const { favorites } = useFavorites()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Book Discovery</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ({favorites.length})</Link>
      </div>
    </nav>
  )
}

export default Navbar
