'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'

const Navbar = () => {
  const links = [
    { lable: 'Dashboard', href: '/dashboard' },
    { lable: 'Issues', href: '/issues' }
  ]

  const pathname = usePathname()

  console.log(pathname)

  return (
    <nav className='mb-5 flex h-14 items-center space-x-6 border-b px-5'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map(({ href, lable }) => (
          <li key={href}>
            <Link
              className={classnames({
                'text-zinc-900': pathname === href,
                'text-zinc-500': pathname !== href,
                'transition-colors hover:text-zinc-800': true
              })}
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
