
import type { NextRequest } from 'next/server'


import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export  function middleware(req:NextRequest) {
 // console.log("middleware working")
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const a = supabase.auth.getSession()
 
  //const { error } = await supabase.auth.signOut()
  //const { data: { user } } = await supabase.auth.getUser()

  //const { data: { session } } = await supabase.auth.getSession();

 // request: NextRequest
  //if (request.nextUrl.pathname.startsWith('/about')) {
   // return NextResponse.rewrite(new URL('/tools/coverletter', request.url))
  //}
 
  ////if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //  return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  //}

  return res
}