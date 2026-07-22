import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'book-discovery:favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function pickBookFields(book) {
  return {
    id: book.id,
    title: book.title,
    authors: book.authors || [],
    firstPublishYear: book.firstPublishYear || null,
    coverId: book.coverId || null,
    coverUrl: book.coverUrl || null,
  }
}

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Ignore storage write failures (e.g. private mode / quota).
    }
  }, [favorites])

  const addFavorite = (book) => {
    const simplified = pickBookFields(book)
    setFavorites((prev) => {
      if (prev.some((b) => b.id === simplified.id)) return prev
      return [...prev, simplified]
    })
  }

  const removeFavorite = (bookId) => {
    setFavorites((prev) => prev.filter((b) => b.id !== bookId))
  }

  const isFavorite = (bookId) => {
    return favorites.some((b) => b.id === bookId)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
