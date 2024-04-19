'use client'

import Skeleton from '@/app/components/Skeleton'
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text
} from '@radix-ui/themes'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const Navbar = () => {
  return (
    <nav className='mb-5 h-14 border-b px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

  const links = [
    { lable: 'Dashboard', href: '/dashboard' },
    { lable: 'Issues', href: '/issues/list' }
  ]

  return (
    <ul className='flex space-x-6'>
      {links.map(({ href, lable }) => (
        <li key={href}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': currentPath === href
            })}
            href={href}
          >
            {lable}
          </Link>
        </li>
      ))}
      @
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton width={'3rem'} />

  if (status === 'unauthenticated')
    return (
      <Link className='nav-link' href='/api/auth/signin'>
        Log in
      </Link>
    )
  return (
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
    </Box>
  )
}

export default Navbar
