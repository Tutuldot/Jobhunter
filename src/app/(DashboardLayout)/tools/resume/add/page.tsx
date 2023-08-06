'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button  } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { v4 } from 'uuid';
import {  useState } from 'react';
import { Database } from '../../../../../../types/supabase';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { isConstructorDeclaration } from 'typescript';
import { useRouter } from 'next/router';
const AddResume = () => {
  const [file, setFile] = useState<File[]>([])
  const [cname, setCName] = useState<string | null>(null)
  const supabase = createClientComponentClient<Database>()
  
  async function  handleSubmit() {

    const {data: { user }} = await supabase.auth.getUser()
    var fileid = v4()
    const folderloc = user?.id.toString()
    const fname = fileid + '_' + file[0].name
    const filename = folderloc + '/' + fname
    console.log(filename)
    const { data, error } = await supabase.storage
      .from("files")
      .upload(filename, file[0], {
        cacheControl: "3600",
        upsert: false,
      });
      console.log(data)
      console.log(error)

    if(!error){
      const { error } = await supabase
        .from('resume')
        .insert({ name: cname,  file: filename, user_id: user?.id, path: folderloc})
      if(!error){
        console.log("success save");
      }else{
        // delete file if error
        const { data, error } = await supabase.storage
        .from("files")
        .remove([filename]);
        console.log("created file deleted due to error on saving")
      }
    }
  
    // upload image
  }

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file assigned")
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setFile(_files);
    }
  };
  return (
    <PageContainer title="Create Resume" description="">
      <DashboardCard title="Create Resume">
      <form autoComplete="off" >
          
          <TextField 
              label="Name"
             
              required
              variant="outlined"
              color="secondary"
              onChange={ (e) => {setCName(e.target.value)} }
              sx={{mb: 3}}
              fullWidth
             
           />
            <h4>Upload File: (PDF/DOCX)</h4>
           <TextField 
              
              
              required
              
              type="file"
            
              fullWidth
              onChange={handleFileSelected}
              
           />
           <br></br> <br></br> <br></br>
           <Button variant="outlined" color="secondary" onClick={() => handleSubmit()}>Save</Button>
       
       </form>
      </DashboardCard>
    </PageContainer>
  );
};

export default AddResume;
