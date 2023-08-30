import React from 'react';
import Link from "next/link";
import {
    TextField,Button
  } from '@mui/material';
  
import { UserDetails } from '@/models/interfaces/User';
interface ComponentProps {
    usrform: UserDetails;
    handleChange: (e:any) => void;
    handleSubmit: (e:any) => void;
 
  }

export const ConfigUserInfoForm: React.FC<ComponentProps> = ({usrform, handleChange, handleSubmit}) => {
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
