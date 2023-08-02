'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button  } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';


export default function AddCoverLetter({ session }: { session: Session | null }) {
  const user = session?.user
  console.log(user)
  return (
    <PageContainer title="Create Cover Letter" description="">
      <DashboardCard title="Create Cover Letter">
  
        <form autoComplete="off" >
          
          <TextField 
              label="Name"
             
              required
              variant="outlined"
              color="secondary"
          
              sx={{mb: 3}}
              fullWidth
             
           />
            <h4>Letter</h4>
           <TextField 
              
              
              required
              
           
            
              fullWidth
              
           />
           <br></br> <br></br> <br></br>
           <Button variant="outlined" color="secondary" type="submit">Save</Button>
       
       </form>
      </DashboardCard>
    </PageContainer>
  );
}




