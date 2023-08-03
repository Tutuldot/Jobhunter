import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST({ params }: { params: { id: BigInteger } }) {
  const supabase = createRouteHandlerClient({ cookies })
  console.log("trigger delete")
  // Check if we have a session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase
  .from('coverletter')
  .delete()
  .eq('id', params.id)
  .eq('user_id',user?.id)

  return true
}