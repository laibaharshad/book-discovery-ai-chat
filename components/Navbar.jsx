import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl font-semibold text-accent">
          Book Discovery
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/favorites" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
            Favorites
          </Link>
          <Link
            href="/health"
            className="text-sm font-medium text-secondary transition-colors hover:text-primary"
          >
            Health
          </Link>
        </div>
      </div>
    </nav>
  )
}