'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BookCard from '../../components/BookCard'

const STORAGE_KEY = 'book-discovery-favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(loadFavorites())
  }, [])

  function handleRemove(id) {
    const updated = favorites.filter((f) => f.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setFavorites(updated)
  }

  return (
    <section>
      <h1 className="mb-6 font-heading text-2xl font-bold text-primary">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-secondary">You haven&rsquo;t saved any favorites yet.</p>
          <Link
            href="/"
            className="mt-3 inline-block text-sm font-medium text-accent hover:text-cyan-600"
          >
            Browse books to add some
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} onRemoveFavorite={handleRemove} />
          ))}
        </div>
      )}
    </section>
  )
}