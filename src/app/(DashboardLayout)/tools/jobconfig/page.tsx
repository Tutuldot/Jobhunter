'use client';
import { Typography, Grid, CardContent,TextField, FormControl, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { SnackbarOrigin, Snackbar } from '@mui/material';
interface State extends SnackbarOrigin {

}
import { useState, useCallback, useEffect,  } from 'react';
import { Database } from '@/app/(DashboardLayout)/components/types/supabase';
import { createClientComponentClient, Session, User  } from "@supabase/auth-helpers-nextjs";
import { UserDetails, Config, Values } from '@/models/interfaces/User';
import { ConfigUserInfoForm, ConfigForm } from './component/ConfigForms';
export default function JobConfig () {
  const [state, setState] = useState<State>({

    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  const payload = {
   SMTP_SERVER: "Enter Server Name",
   SMTP_USERNAME: "Enter Username",
   SMTP_PASSWORD: "Enter password",
   SMTP_PORT_TLS: "Enter TLS Server",
   SMTP_PORT_SSL: "Enter SSL Server "

  }
  const [snackOpen, setSnackOpen] = useState(false);
  const [cuser, setCUser] = useState<User | null>(null)
  const [cuserinfo, setCuserinfo] = useState<UserDetails | null>(null)
  const [configValues, setConfigValues] = useState<Values>(payload)
  const [messageText, setMessageText] = useState("")
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


   const handleChangeUserInfo = (e:any) => {
      const { name, value } = e.target;
      console.log(name + " : " + value);
      setUsrform((prevConfig) => ({
        ...prevConfig,
        [name]: value,
      }));
    };

   const handleChangeConfig = (e:any) => {
      const { name, value } = e.target;
      console.log(name + " : " + value);
      setConfigValues((prevConfig) => ({
        ...prevConfig,
        [name]: value,
      }));
    };

    async function handleSubmitUser (e:any)  {
      e.preventDefault();
      // You can do something with the config data here, like sending it to the server
      console.log("user");
      console.log(usrform);
     
      const { error } = await supabase
        .from('users')
        .update(usrform)
        .eq('user_id', cuser?.id)
      if(!error){
        setMessageText("User Details Updated!")
        setSnackOpen(true)
      }
      console.log(error);
      
    };

    async function handleSubmitSMTP (e:any) {
      e.preventDefault();
      // You can do something with the config data here, like sending it to the server
      console.log("smtp");
      console.log(configValues);
      const { error } = await supabase
        .from('config')
        .update({values:{
          SMTP_SERVER: configValues.SMTP_SERVER,
          SMTP_USERNAME: configValues.SMTP_USERNAME,
          SMTP_PASSWORD: configValues.SMTP_PASSWORD,
          SMTP_PORT_TLS: configValues.SMTP_PORT_TLS,
          SMTP_PORT_SSL: configValues.SMTP_PORT_SSL
       
         } })
        .eq('user_id', cuser?.id)
      if(!error){
        setMessageText("Email Configuration Updated.")
        setSnackOpen(true)
      }
      console.log(error);
    };

    const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {

      console.log("reason: " + reason);
      /**
      if (reason === 'clickaway') {
        setSnackOpen(false);
        return;
      }else{
        router.replace("/tools/coverletter");
      }
      */
      setSnackOpen(false);
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
        setMessageText("Error on loading data. Please try again later.")
        setSnackOpen(true)
      } finally {
         // remove loading page here
      }
   }, [supabase])

   useEffect(() => {
      getUserDetails()
   }, [getUserDetails])

  return (
    <PageContainer title="User Configuration" description="">
      <div>
        <Snackbar
              open={snackOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
              message={messageText}
            
              anchorOrigin={{ vertical, horizontal }}
            />
        <DashboardCard title="User Info">
          
          <ConfigUserInfoForm handleChange={handleChangeUserInfo} usrform={usrform} handleSubmit={handleSubmitUser} />
        
        </DashboardCard>
        <br/><br/><br/>
        <DashboardCard title="SMTP Setup">
          
          <ConfigForm  handleChange={handleChangeConfig} configValues={configValues} handleSubmit={handleSubmitSMTP}/>
        </DashboardCard>
      </div>
    
    </PageContainer>
  );
}


