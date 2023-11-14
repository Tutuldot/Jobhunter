'use client';
import { Checkbox,TextField, MenuItem, Button, InputLabel, Select  } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createClientComponentClient, Session, User } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../types/supabase';

import { useState, useCallback, useEffect } from 'react'
import { useRouter,redirect } from "next/navigation";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers';

type ComboForm = {
  id: Number;
  name: string;
}
interface CLData {
  coverletter: string | null;
  created_at: string | null;
  id: number;
  modified_at: string | null;
  name: string | null;
  status: string | null;
  user_id: string | null;
}
export default function AddJobTask() {
  const [loading, setLoading] = useState(true)
  const [cname, setCName] = useState<string | null>(null)
  const [resume, setResume] = useState<number>(0)
  const [cuser, setCUser] = useState<User>()
  const [sendAsap, setSendAsap] = useState(false)
  const [cl, setCl] = useState<number>(0)
  const [clList, setCllist] = useState<ComboForm[]>()
  const [searchStr, setSearchStr] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<string | null>("2023-01-01 08:00:00")
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [rList, setRlist] = useState<ComboForm[]>()
  const getCoverletter = useCallback(async () => {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      let { data, error, status } = await supabase
        .from('coverletter')
        .select('id,name')
        .eq('user_id', user?.id)
        .eq('status','Active')
        .returns<ComboForm>()


      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setCllist(data)
        setCUser(user as User)
        console.log("cover letter")
        console.log(data)
      }
    } catch (error) {
      alert('Error loading user and coverletter data!')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    getCoverletter()
  }, [getCoverletter])


  // get resume list

  const getResume = useCallback(async () => {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      let { data, error, status } = await supabase
        .from('resume')
        .select('id, name')
        .eq('user_id', user?.id)
        .is('isdeleted',null)
        .returns<ComboForm>()


      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setRlist(data)
        setCUser(user as User)
        console.log("resume")
        console.log(data)
      }
    } catch (error) {
      alert('Error loading user and resume data!')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    getResume()
  }, [getResume])

  
  async function saveJob(){
    console.log("saving records")


    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    const { error } = await supabase
      .from('jobs')
      .insert({ name: cname || '', user_id: user?.id, resume_id: resume, coverletter_id: cl, keyword: searchStr, email_sending_schedule: startTime, status: "Active", send_asap: sendAsap })
    if(!error){
      router.replace("/tools/jobtasks")
    }
    console.log(error);
  }



  return (
    <PageContainer title="Create Job Task" description="">
      <DashboardCard title="Create Job Task">
  
        <form autoComplete="off" >
        <InputLabel >Job Name</InputLabel>
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
               {rList?.map((resumeList) => (
                  <MenuItem key={resumeList.id} value={resumeList.id}>{resumeList.name}</MenuItem>
                ))}
            </Select>
            <br></br> <br></br>
             
          <InputLabel >Use AI Cover Letter</InputLabel>
          <Checkbox disabled /> (Coming Soon)
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
               {clList?.map((covLetter) => (
                  <MenuItem key={covLetter.id} value={covLetter.id}>{covLetter.name}</MenuItem>
                ))}
            
            </Select>
           
           <br></br><br></br>
           <InputLabel id="sstring-label">Search String</InputLabel>
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
          <br></br><br></br>
          <InputLabel >Send via email ASAP</InputLabel>
          <Checkbox checked={sendAsap}
              onChange={() => {setSendAsap(!sendAsap)}}
          />
          <br></br><br></br>
          <InputLabel >Sending Schedule</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
          <TimePicker defaultValue={startTime}  onChange={(value) => {setStartTime(value)}} />
          </LocalizationProvider>
        
           <br></br> <br></br> <br></br>
           <Button variant="outlined" color="secondary" 
           onClick={() => saveJob()}>Save</Button>
       
       </form>
      </DashboardCard>
    </PageContainer>
  );
}




