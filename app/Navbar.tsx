'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

const Navbar = () => {
  const currentPath = usePathname()
  const { status, data: session, update } = useSession()

  const links = [
    { lable: 'Dashboard', href: '/dashboard' },
    { lable: 'Issues', href: '/issues/list' }
  ]

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
                'text-zinc-900': currentPath === href,
                'text-zinc-500': currentPath !== href,
                'transition-colors hover:text-zinc-800': true
              })}
              href={href}
            >
              {lable}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href='/api/auth/signout'>Log out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href='/api/auth/signin'>Log in</Link>
        )}
      </Box>
    </nav>
  )
}

export default Navbar
