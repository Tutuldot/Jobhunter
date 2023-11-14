'use client';
import { TextField, Button, Snackbar,Chip } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../types/supabase';
import Editor from 'react-simple-wysiwyg';
import { ToastFragment } from '../../components/CLComponents';
import { useRouter,redirect } from "next/navigation";
import { useCallback, useEffect, useState } from 'react'

export default function AddCoverLetter({ params }: { params: { id: BigInteger } }) {
  const [html, setHtml] = useState('')
  const [cname, setCName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [state, setState] = useState<State>({

    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
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

  const handleAddCompanyPlaceHolder = () => {
    setHtml(html + "[COMPANY_NAME]");
    console.log("add compant placeholder");
  };

  const handleAddJobTitle = () => {
    setHtml(html + "[JOB_TITLE]");
    console.log("add job title");
  };

  const handleAddJobSource = () => {
    setHtml(html + "[JOB_SOURCE]");
    console.log("add job source")
  };

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
    <ToastFragment handleClose={handleClose} />
    
  );



  return (
    <PageContainer title="Create Cover Letter" description="">
      <DashboardCard title="Create Cover Letter">
      <div>
     
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Cover Letter Updated."
        action={action}
        anchorOrigin={{ vertical, horizontal }}
      />
  
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
            <Chip sx={{px: "4px",backgroundColor: "Green",color: "#fff",}}
                  size="small"
                  label="Company Name" clickable color="primary" onClick={handleAddCompanyPlaceHolder}></Chip>
            &nbsp;
            <Chip sx={{px: "4px",backgroundColor: "Green",color: "#fff",}}
                  size="small"
                  label="Job Source" clickable color="primary" onClick={handleAddJobSource}></Chip>
            &nbsp;
            <Chip sx={{px: "4px",backgroundColor: "Green",color: "#fff",}}
                  size="small"
                  label="Position" clickable color="primary" onClick={handleAddJobTitle}></Chip><br/><br/>
            <Editor value={html} onChange={ (e) => { setHtml(e.target.value) }} />
          
           <br></br> <br></br> <br></br>
           <Button variant="outlined" color="secondary" 
           onClick={() => saveCL()}
           >Save</Button>
       
       </form>
      </div>
    
      </DashboardCard>
    </PageContainer>
  );
}




