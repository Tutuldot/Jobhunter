'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button  } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../types/supabase';

import { useCallback, useEffect, useState } from 'react'
async function getUser(){

}

export default function AddCoverLetter({ session }: { session: Session | null }) {
  
  const [cname, setCName] = useState<string | null>(null)
  const [cletter, setCoverletter] = useState<string | null>(null)
  
  async function saveCL(){
    console.log("save records")
    

    const supabase = createClientComponentClient<Database>();

    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    const { error } = await supabase
      .from('coverletter')
      .insert({ name: cname,  coverletter: cletter, user_id: user?.id })

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
           <TextField 
              
              value={cletter || ''}
              onChange={ (e) => { setCoverletter(e.target.value) }}
              required
              
           
            
              fullWidth
              
           />
           <br></br> <br></br> <br></br>
           <Button variant="outlined" color="secondary" 
           onClick={() => saveCL()}
           >Save</Button>
       
       </form>
      </DashboardCard>
    </PageContainer>
  );
}




