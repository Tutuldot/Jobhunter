import React from 'react';
import Link from "next/link";
import {
    TextField,Button
  } from '@mui/material';
  
import { UserDetails, Values } from '@/models/interfaces/User';
interface ToastComponentProps {

    handleClose: (e:any) => void;
   
 
}

interface ConfigComponentPros {
  configValues: Values;
  handleChange: (e:any) => void;
  handleSubmit: (e:any) => void;
}

export const ToastFragment: React.FC<ToastComponentProps> = ({handleClose}) => {
    return (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          Return to List
        </Button>
     
    </React.Fragment>
    )
}

