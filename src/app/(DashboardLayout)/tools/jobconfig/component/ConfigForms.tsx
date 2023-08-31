import React from 'react';
import Link from "next/link";
import {
    TextField,Button
  } from '@mui/material';
  
import { UserDetails, Values } from '@/models/interfaces/User';
interface UserComponentProps {
    usrform: UserDetails;
    handleChange: (e:any) => void;
    handleSubmit: (e:any) => void;
 
}

interface ConfigComponentPros {
  configValues: Values;
  handleChange: (e:any) => void;
  handleSubmit: (e:any) => void;
}

export const ConfigUserInfoForm: React.FC<UserComponentProps> = ({usrform, handleChange, handleSubmit}) => {
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
          
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
    )
}


export const ConfigForm: React.FC<ConfigComponentPros> = ({configValues, handleChange, handleSubmit}) => {
  return (
    <form autoComplete="off" onSubmit={handleSubmit} >
            
          <TextField 
              label="SMTP Server"
              name="SMTP_SERVER"
              required
              onChange={handleChange}
              variant="outlined"
              color="secondary"
        
              sx={{mb: 3}}
              fullWidth
              value = {configValues.SMTP_SERVER }
  
          />

        <TextField 
              label="Email"
              onChange={handleChange}
              name="SMTP_USERNAME"
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{mb: 3}}
              fullWidth
              value = {configValues.SMTP_USERNAME}
            
          />
          
          <TextField 
              label="Password"
              name="SMTP_PASSWORD"
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
              name="SMTP_PORT_SSL"
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
              name="SMTP_PORT_TLS"
              onChange={handleChange}
              required
              variant="outlined"
              color="secondary"
              value = {configValues?.SMTP_PORT_TLS}
              sx={{mb: 3}}
              fullWidth
            
          />
        
          <Button variant="outlined" color="secondary" type="submit">Save</Button>
      
      </form>
  )
}
