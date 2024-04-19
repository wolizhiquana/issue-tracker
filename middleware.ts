import { MiddlewareConfig } from 'next/server'

export { auth as middleware } from '@/auth'

export const config: MiddlewareConfig = {
  matcher: ['/issues/new', '/issues/edit/:id+']
}
