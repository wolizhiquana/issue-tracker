'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text
} from '@radix-ui/themes'

const Navbar = () => {
  const currentPath = usePathname()
  const { status, data: session, update } = useSession()

  const links = [
    { lable: 'Dashboard', href: '/dashboard' },
    { lable: 'Issues', href: '/issues/list' }
  ]

  return (
    <nav className='mb-5 h-14 border-b px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
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
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback='?'
                    size={'2'}
                    radius='full'
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size={'2'}>{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default Navbar
