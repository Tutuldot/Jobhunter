'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState, useCallback, useEffect,  } from 'react';
import { Database } from '../../../../../types/supabase';
import { createClientComponentClient, Session  } from "@supabase/auth-helpers-nextjs";
import { UserDetails, Config, Values } from '@/models/interfaces/User';
export default function JobConfig ({ session }: { session: Session | null }) {

  const [cuser, setCUser] = useState(null)
  const [cuserinfo, setCuserinfo] = useState<UserDetails | null>(null)
  const [configValues, setConfigValues] = useState<Values>({
   SMTP_SERVER: "",
   SMTP_USERNAME: "",
   SMTP_PASSWORD: "",
   SMTP_PORT_TLS: "",
   SMTP_PORT_SSL: ""

  })
  const [config, setConfig] = useState<Config>({
    id: 0,
    user_id: "",
    values: {
      SMTP_SERVER: "",
      SMTP_USERNAME: "",
      SMTP_PASSWORD: "",
      SMTP_PORT_TLS: "",
      SMTP_PORT_SSL: ""
    },
    modified_at: "",

  })

  const [usrform, setUsrform] = useState<UserDetails>({
   active: false, 
   code:  '',
   created_at:  '',
   email:  '',
   fullname:  '',
   id:  0,
   last_login:  "",
   status:  "",
   subscription:  "",
   user_id:  ""

})

  const supabase = createClientComponentClient<Database>();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target;
      console.log(name + ' ' + value)

      switch (name) {
         case 'fullname':
            setUsrform({
               fullname: value 
            })
            break;
         case 'email':
            setUsrform({
               email: value 
            })
            break;
         case 'code':
            setUsrform(
               {code: value}
            )
            break;
         case "smtp_server":
            setConfigValues({SMTP_SERVER: value})
            break;
         case "smtp_username":
            setConfigValues({SMTP_USERNAME: value})
            break;
         case "smtp_password":
               setConfigValues({SMTP_PASSWORD: value})
               break;
         case "smtp_ssl_port":
            setConfigValues({SMTP_PORT_SSL: value})
            break;   
         case "smtp_tls_port":
            setConfigValues({SMTP_PORT_TLS: value})
            break;   
         default:
            console.log("na")
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
            setUsrform({
               active: data.active || false, 
               code: data.code || '',
               created_at: data.created_at || '',
               email: data.email || '',
               fullname: data.fullname || '',
               id: data.id || 0,
               last_login: data.last_login || "",
               status: data.status || "",
               subscription: data.subscription || "",
               user_id: data.user_id || ""

            })
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
         setConfigValues(user_config.data?.values as Values)
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

                    value={usrform?.fullname}
                  
                   
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
                    value={usrform?.email}
                   
                 />
                 <TextField 
                    label="User Code"
                    name="code"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="secondary"
                    type="Text"
                  
                    fullWidth
                    sx={{mb: 3}}

                    value={usrform?.code}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Save</Button>
             
        </form>
      </DashboardCard>
      <br/><br/><br/>
      <DashboardCard title="SMTP Setup">
        
        <form autoComplete="off" >
           
                <TextField 
                    label="SMTP Server"
                    name="smtp_server"
                    required
                    onChange={handleChange}
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value = {configValues?.SMTP_SERVER }
          
                   
                 />
 { /**
               <TextField 
                    label="Email"
                    onChange={handleChange}
                    name="smtp_username"
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value = {configValues?.SMTP_USERNAME}
                   
                 />
                 <TextField 
                    label="Password"
                    name="smtp_password"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value = {configValues?.SMTP_PASSWORD}
                    fullWidth
                    sx={{mb: 3}}
                 />

                 <TextField 
                    label="SSL Port"
                    name="smtp_ssl_port"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="secondary"
                    value = {configValues?.SMTP_PORT_SSL}
                    sx={{mb: 3}}
                    fullWidth
                   
                 />

                  <TextField 
                    label="TLS Port"
                    name="smtp_tls_port"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="secondary"
                    value = {configValues?.SMTP_PORT_TLS}
                    sx={{mb: 3}}
                    fullWidth
                   
                 />
               */}
                 <Button variant="outlined" color="secondary" type="submit">Save</Button>
             
        </form>
      </DashboardCard>
    
    </PageContainer>
  );
}


