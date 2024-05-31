import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-6 py-2 lg:px-8">
      <Link href="/">
        <span className="font-bold text-2xl">NextCRUD</span>
      </Link>
      <ul className="flex gap-x-6">
        <li className="text-sm font-semibold leading-6">
          <Link href="/">Tasks</Link>
        </li>
        <li className="text-sm font-semibold leading-6">
          <Link href="/tasks/new">New</Link>
        </li>
        <li className="text-sm font-semibold leading-6">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}
