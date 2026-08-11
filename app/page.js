import SearchForm from "../components/SearchForm";
import Chat from "../components/Chat";

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-6 font-heading text-2xl font-bold text-primary">
        Search Books
      </h1>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_360px] md:items-start">
        <div>
          <SearchForm />
        </div>

        <aside className="order-first md:order-none md:sticky md:top-6 md:self-start">
          <h2 className="mb-4 font-heading text-xl font-bold text-primary">
            AI Book Assistant
          </h2>

          <Chat />
        </aside>
      </div>
    </section>
  );
}