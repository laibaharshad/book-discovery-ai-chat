'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'book-discovery-favorites'

function getStoredFavorites() {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function FavoriteButton({ book }) {
  const [isStored, setIsStored] = useState(false)

  useEffect(() => {
    const favorites = getStoredFavorites()
    setIsStored(favorites.some((f) => f.id === book.id))
  }, [book.id])

  function toggle() {
    const favorites = getStoredFavorites()

    if (isStored) {
      const updated = favorites.filter((f) => f.id !== book.id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setIsStored(false)
    } else {
      favorites.push({
        id: book.id,
        title: book.title,
        authors: book.authors || [],
        year: book.firstPublishYear || book.firstPublishDate || null,
        coverUrl: book.coverUrl || null,
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
      setIsStored(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
        isStored
          ? 'border border-red-300 text-red-600 hover:bg-red-50'
          : 'bg-accent text-white hover:bg-cyan-600'
      }`}
    >
      {isStored ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  )
}
