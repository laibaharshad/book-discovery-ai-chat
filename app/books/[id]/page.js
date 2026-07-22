import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBookDetails } from '../../../lib/books'
import FavoriteButton from '../../../components/FavoriteButton'

export default async function BookDetailsPage({ params }) {
  const { id } = await params

  let book
  try {
    book = await getBookDetails(id)
  } catch {
    notFound()
  }

  return (
    <section>
      <Link
        href="/"
        className="inline-block text-sm font-medium text-accent transition-colors hover:text-cyan-600"
      >
        &larr; Back to Search
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[300px_1fr]">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full rounded-lg shadow-md"
          />
        ) : (
          <div className="flex h-96 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400">
            No Cover Available
          </div>
        )}

        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-primary">
                {book.title}
              </h1>

              {book.authors.length > 0 && (
                <p className="mt-2 text-lg text-secondary">
                  by {book.authors.join(', ')}
                </p>
              )}

              {book.firstPublishDate && (
                <p className="mt-1 text-sm text-slate-400">
                  First published: {book.firstPublishDate}
                </p>
              )}
            </div>

            <FavoriteButton book={book} />
          </div>

          {book.description && (
            <div className="mt-6 leading-relaxed text-secondary">
              {book.description}
            </div>
          )}

          {book.subjects.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-lg font-semibold text-primary">
                Subjects
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {book.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-secondary"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}