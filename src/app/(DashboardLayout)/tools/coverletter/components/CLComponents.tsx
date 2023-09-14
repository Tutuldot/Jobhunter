import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import Link from "next/link";
import {
    TextField,Button
  } from '@mui/material';
  
import { UserDetails, Values } from '@/models/interfaces/User';

// interfaces
interface ToastComponentProps {
    handleClose: (e:any) => void;
}

interface ConfigComponentPros {
  configValues: Values;
  handleChange: (e:any) => void;
  handleSubmit: (e:any) => void;
}


interface DialogYesNoComponentProps {
  handleClose: (e:any) => void;
  handleAgree: (e:any) => void;
  open: boolean;
  header: string;
  message: string;
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

// Dialog YesNo


export const DialogYesNo: React.FC<DialogYesNoComponentProps> = ({handleClose,handleAgree,open,header,message}) => {
  return (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {header}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
               {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleAgree} autoFocus>
              Yes
            </Button>
          </DialogActions>
      </Dialog>
  )
}

