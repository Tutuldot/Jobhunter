'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button  } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../types/supabase';
import Editor from 'react-simple-wysiwyg';

import { useRouter,redirect } from "next/navigation";
import { useCallback, useEffect, useState } from 'react'

export default function AddCoverLetter({ params }: { params: { id: BigInteger } }) {
  const [html, setHtml] = useState('')
  const [cname, setCName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  
  const getCoverletter = useCallback(async () => {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      let { data, error, status } = await supabase
        .from('coverletter')
        .select()
        .eq('id', params.id)
        .eq('user_id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setHtml(data.coverletter)
        setCName(data.name)
   
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    getCoverletter()
  }, [getCoverletter])
  
  async function saveCL(){
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    const { error } = await supabase
      .from('coverletter')
      .update({ name: cname,  coverletter: html, user_id: user?.id })
      .eq('id', params.id)
      .eq('user_id', user?.id)
    if(!error){
      router.replace("/tools/coverletter")
    }
    console.log(error);
  }



  return (
    <PageContainer title="Create Cover Letter" description="">
      <DashboardCard title="Create Cover Letter">
  
        <form autoComplete="off" >
          
          <TextField 
              label="Name"
              value={cname || ''}
              onChange={ (e) => {setCName(e.target.value)} }
              required
              variant="outlined"
              color="secondary"
              
              sx={{mb: 3}}
              fullWidth
             
           />
            <h4>Letter</h4>
            <Editor value={html} onChange={ (e) => { setHtml(e.target.value) }} />
          
           <br></br> <br></br> <br></br>
           <Button variant="outlined" color="secondary" 
           onClick={() => saveCL()}
           >Save</Button>
       
       </form>
      </DashboardCard>
    </PageContainer>
  );
}




