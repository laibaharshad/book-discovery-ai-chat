export default async function HealthPage() {
  const response = await fetch('https://openlibrary.org/search.json?q=harry+potter&limit=1', {
    cache: 'no-store',
  })

  const data = await response.json()

  return (
    <section>
      <h1 className="mb-6 font-heading text-2xl font-bold text-primary">Health Check</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm text-secondary">Open Library API</p>
          <p className={`mt-1 font-heading text-lg font-semibold ${response.ok ? 'text-green-600' : 'text-red-600'}`}>
            {response.ok ? 'Connected' : 'Unavailable'}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm text-secondary">Total Books Indexed</p>
          <p className="mt-1 font-heading text-lg font-semibold text-primary">
            {data.numFound?.toLocaleString() ?? 'Unknown'}
          </p>
        </div>
      </div>
    </section>
  )
}