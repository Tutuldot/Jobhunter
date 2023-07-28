'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button  } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';


const AddResume = () => {
  return (
    <PageContainer title="Create Resume" description="">
      <DashboardCard title="Create Resume">
      <form autoComplete="off" >
          
          <TextField 
              label="Name"
             
              required
              variant="outlined"
              color="secondary"
          
              sx={{mb: 3}}
              fullWidth
             
           />
            <h4>Upload File: (PDF/DOCX)</h4>
           <TextField 
              
              
              required
              
              type="file"
            
              fullWidth
              
           />
           <br></br> <br></br> <br></br>
           <Button variant="outlined" color="secondary" type="submit">Save</Button>
       
  </form>
      </DashboardCard>
    </PageContainer>
  );
};

export default AddResume;
