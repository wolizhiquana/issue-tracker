import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const Navbar = () => {
  const links = [
    { lable: 'Dashboard', href: 'dashboard' },
    { lable: 'Issues', href: 'issues' }
  ]

  return (
    <nav className='mb-5 flex h-14 items-center space-x-6 border-b px-5'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map(({ href, lable }) => (
          <li>
            <Link
              className='text-zinc-500 transition-colors hover:text-zinc-800'
              href={href}
            >
              {lable}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
