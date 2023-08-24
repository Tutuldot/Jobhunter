'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { useState, useCallback, useEffect,  } from 'react';
import { Database } from '../../../../../types/supabase';
import { createClientComponentClient, Session  } from "@supabase/auth-helpers-nextjs";
import { UserDetails, Config, Values } from '@/models/interfaces/User';
export default function JobConfig ({ session }: { session: Session | null }) {

  const [cuser, setCUser] = useState(null)
  const [cuserinfo, setCuserinfo] = useState<UserDetails | null>(null)
  const [config, setConfig] = useState<Config | null>(null)

  const supabase = createClientComponentClient<Database>();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target;
      console.log(name + ' ' + value)

      switch (name) {
         case 'fullname':
            setCuserinfo({fullname: value})
         case 'email':
            setCuserinfo({email: value})
         default:
            console.log("")
       }

       console.log(cuserinfo)
   };

  const getUserDetails = useCallback(async () => {
      try {
      
         const {
            data: { user },
         } = await supabase.auth.getUser()
         let { data, error, status } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user?.id)
            .limit(1)
            .single()
        

         if (error && status !== 406) {
            throw error
         }
          console.log("to check")
      
         if (data) {
            setCuserinfo(data as UserDetails)
            setCUser(user)
           // console.log(data)
            //console.log("name: " + data.fullname)
            
         }

        
         var user_config = await supabase
         .from('config')
         .select('*')
         .eq('user_id', user?.id)
         .limit(1)
         .single()

         setConfig(user_config.data as Config)

         console.log(user_config.data)
        

      } catch (error) {
      alert('Error loading user and config data!')
      } finally {
         // remove loading page here
      }
   }, [supabase])

   useEffect(() => {
      getUserDetails()
   }, [getUserDetails])

  return (
    <PageContainer title="User Configuration" description="">
       <DashboardCard title="User Info">
        
        <form autoComplete="off" >
          
                <TextField 
                    label="Full name"
                    name="fullname"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="secondary"
                    type="Text"
                    sx={{mb: 3}}
                    fullWidth

                    value={cuserinfo?.fullname || ''}
                  
                   
                 />
              
                <TextField 
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={cuserinfo?.email || ''}
                   
                 />
                 <TextField 
                    label="User Code"
                    
                    required
                    variant="outlined"
                    color="secondary"
                    type="Text"
                  
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Save</Button>
             
        </form>
      </DashboardCard>
      <br/><br/><br/>
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

                 <TextField 
                    label="SSL Port"
              
                    required
                    variant="outlined"
                    color="secondary"
                  
                    sx={{mb: 3}}
                    fullWidth
                   
                 />

                  <TextField 
                    label="TTL Port"
              
                    required
                    variant="outlined"
                    color="secondary"
              
                    sx={{mb: 3}}
                    fullWidth
                   
                 />
               
                 <Button variant="outlined" color="secondary" type="submit">Save</Button>
             
        </form>
      </DashboardCard>
    
    </PageContainer>
  );
}


