'use client';
import { Typography, Grid, CardContent,TextField, MenuItem, Button, InputLabel, Select  } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../types/supabase';

import { useState } from 'react'
import { useRouter,redirect } from "next/navigation";


export default function AddJobTask({ session }: { session: Session | null }) {
 
  const [cname, setCName] = useState<string | null>(null)
  const [resume, setResume] = useState<number>(0)
  const [cl, setCl] = useState<number>(0)
  const [searchStr, setSearchStr] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const router = useRouter();
  
  async function saveCL(){
    console.log("save records")

    const supabase = createClientComponentClient<Database>();

    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    const { error } = await supabase
      .from('resume')
      .insert({ name: cname, user_id: user?.id })
    if(!error){
      router.replace("/tools/jobtasks")
    }
    console.log(error);
  }



  return (
    <PageContainer title="Create Job Task" description="">
      <DashboardCard title="Create Job Task">
  
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
            <InputLabel id="resume-label">Resume</InputLabel>
            <Select
              labelId="resume-label"
              id="resume-select"
              value={resume}
              label="Resume"
              onChange={(e) =>  {setResume(parseInt(e.target.value.toString(),10))} }
            >
               <MenuItem value={0}>Select Resume</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <br></br> <br></br>
            <InputLabel id="cl-label">Cover Letter</InputLabel>
            <Select
              labelId="cl-label"
              id="cl-select"
              value={cl}
              label="Cover Letter"
              onChange={(e) =>  {setCl(parseInt(e.target.value.toString(),10))} }
            >
               <MenuItem value={0}>Select Cover Letter</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
           
           <br></br><br></br>

           <TextField 
              label="Search String"
              value={searchStr || ''}
              onChange={ (e) => {setSearchStr(e.target.value)} }
              required
              variant="outlined"
              color="secondary"
              
              sx={{mb: 3}}
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




