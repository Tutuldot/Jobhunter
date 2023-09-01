'use client';
import * as React from 'react';
import { Typography, Grid, CardContent,TextField,
   FormControl, Button , Chip, Snackbar, IconButton } from '@mui/material';
   import {
    IconTrash, IconCross
  } from "@tabler/icons-react";
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../types/supabase';
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react'
import { useRouter,redirect } from "next/navigation";


export default function AddCoverLetter({ session }: { session: Session | null }) {
  const [html, setHtml] = useState('my <b>HTML</b>')
  const [cname, setCName] = useState<string | null>(null)
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [state, setState] = useState<State>({

    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {

    console.log("reason: " + reason);
    if (reason === 'clickaway') {
      setOpen(false);
      return;
    }else{
      router.replace("/tools/coverletter");
    }
   
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Return to List
      </Button>
     
    </React.Fragment>
  );

  async function saveCL(){
    console.log("save records")

    const supabase = createClientComponentClient<Database>();

    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    const { error } = await supabase
    .from('coverletter')
    .insert({ name: cname,  coverletter: html, user_id: user?.id })
   
    if(!error){
      setOpen(true)
       //router.replace("/tools/coverletter") // this is the original
     
    }
    console.log(error);
  }



  return (
    <PageContainer title="Create Cover Letter" description="">
      <DashboardCard title="Create Cover Letter">
      <div>
      <Button onClick={handleClick}>Snack Bar Sample</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="New Cover Letter Created."
        action={action}
        anchorOrigin={{ vertical, horizontal }}
      />
    </div>
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
            <h2>Placeholder</h2>
            <Chip sx={{px: "4px",backgroundColor: "Green",color: "#fff",}}
                  size="small"
                  label="Company Name"></Chip>
            &nbsp;
            <Chip sx={{px: "4px",backgroundColor: "Green",color: "#fff",}}
                  size="small"
                  label="Job Source"></Chip>
            &nbsp;
            <Chip sx={{px: "4px",backgroundColor: "Green",color: "#fff",}}
                  size="small"
                  label="Position"></Chip><br/><br/>
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




