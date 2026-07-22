import SearchForm from '../components/SearchForm'

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-6 font-heading text-2xl font-bold text-primary">
        Search Books
      </h1>
      <SearchForm />
    </section>
  )
}