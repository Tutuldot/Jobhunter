'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';


const JobConfig = () => {

  

  return (
    <PageContainer title="Job Configuration" description="">
      <DashboardCard title="SMTP Setup">
        
        <form autoComplete="off" >
          
                <TextField 
                    label="SMTP Server"
                   
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                   
                 />
                 <TextField 
                    label="Port"
                   
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                   
                 />
                <TextField 
                    label="Email"
                   
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                   
                 />
                 <TextField 
                    label="Password"
                    
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                  
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Save</Button>
             
        </form>
      </DashboardCard>
    
    </PageContainer>
  );
};

export default JobConfig;
