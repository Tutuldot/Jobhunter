import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { user },} = await supabase.auth.getUser()

  //console.log(user)

  // if user is signed in and the current path is / redirect the user to /account
  if (user) {
    if(req.nextUrl.pathname === '/')
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user) {
    return NextResponse.redirect(new URL('/authentication/signin', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/account'],
}