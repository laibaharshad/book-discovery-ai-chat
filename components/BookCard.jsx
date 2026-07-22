'use client'

import Link from 'next/link'

export default function BookCard({ book, onRemoveFavorite }) {
  function handleRemove(e) {
    e.stopPropagation()
    e.preventDefault()
    onRemoveFavorite(book.id)
  }

  return (
    <div className="relative rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/books/${book.id}`} className="block p-4">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="mb-3 h-48 w-full rounded object-cover"
          />
        ) : (
          <div className="mb-3 flex h-48 items-center justify-center rounded bg-slate-100 text-sm text-slate-400">
            No Cover
          </div>
        )}

        <h2 className="font-heading text-lg font-semibold text-primary">
          {book.title}
        </h2>

        {book.authors.length > 0 && (
          <p className="mt-1 text-sm text-secondary">
            {book.authors.join(', ')}
          </p>
        )}

        {(book.firstPublishYear || book.year) && (
          <p className="mt-1 text-xs text-slate-400">
            First published: {book.firstPublishYear || book.year}
          </p>
        )}
      </Link>

      {onRemoveFavorite && (
        <div className="border-t border-slate-100 px-4 py-3">
          <button
            onClick={handleRemove}
            className="w-full rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            Remove from Favorites
          </button>
        </div>
      )}
    </div>
  )
}
