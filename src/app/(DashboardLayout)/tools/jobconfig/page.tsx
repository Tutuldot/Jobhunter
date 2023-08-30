'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState, useCallback, useEffect,  } from 'react';
import { Database } from '../../../../../types/supabase';
import { createClientComponentClient, Session  } from "@supabase/auth-helpers-nextjs";
import { UserDetails, Config, Values } from '@/models/interfaces/User';
import ConfigUserInfoForm from './component/ConfigUserInfo';
export default function JobConfig ({ session }: { session: Session | null }) {
  const payload = {
   SMTP_SERVER: "Enter Server Name",
   SMTP_USERNAME: "Enter Username",
   SMTP_PASSWORD: "Enter password",
   SMTP_PORT_TLS: "Enter TLS Server",
   SMTP_PORT_SSL: "Enter SSL Server "

  }
  const [cuser, setCUser] = useState(null)
  const [cuserinfo, setCuserinfo] = useState<UserDetails | null>(null)
  const [configValues, setConfigValues] = useState<Values>(payload)
  const [config, setConfig] = useState<Config>({
    id: 0,
    user_id: "",
    values: payload,
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

  const handleChangeUserForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
         default:
            console.log("na")
       }

       console.log(cuserinfo)
   };

   const handleChangev2 = (e:any) => {
      const { name, value } = e.target;
      console.log(name + " : " + value);
      setConfigValues((prevConfig) => ({
        ...prevConfig,
        [name]: value,
      }));
    };

   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target;
      console.log(name + ' ' + value)
     
      switch (name) {
       
         case "smtp_server":
            setConfigValues({SMTP_SERVER: value })
            break;
            
      
         default:
            console.log("na")
       }
       console.log("values: " + configValues.SMTP_SERVER)
    
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
         var configData = (user_config.data?.values as Values) || payload
         setConfigValues(configData)
         console.log("values: " + configData + " ---- " + (user_config.data?.values as Values))
         

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
        <ConfigUserInfoForm handleChange={handleChangeUserForm} usrform={usrform} />
       
      </DashboardCard>
      <br/><br/><br/>
      <DashboardCard title="SMTP Setup">
        
        <form autoComplete="off" >
       
                <TextField 
                    label="SMTP Server"
                    name="SMTP_SERVER"
                    required
                    onChange={handleChangev2}
                    variant="outlined"
                    color="secondary"
               
                    sx={{mb: 3}}
                    fullWidth
                    value = {configValues.SMTP_SERVER }
          
                   
                 />

               <TextField 
                    label="Email"
                    onChange={handleChangev2}
                    name="SMTP_USERNAME"
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value = {configValues.SMTP_USERNAME}
                   
                 />
                  { /**
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


