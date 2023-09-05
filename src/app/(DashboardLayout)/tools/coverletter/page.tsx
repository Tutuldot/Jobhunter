'use client';
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react';
import { redirect } from "next/navigation"; // added for handling router
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { Database } from "../../../../../types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,Grid, CardContent,Button, IconButton, 
} from '@mui/material';

import {
    IconTrash,  IconEdit
  } from "@tabler/icons-react";

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}



export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
 

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
   console.log("rendering")
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Remove Cover Letter</DialogTitle>
      <DialogContent dividers>
        <h1>Are you sure you want to delete this cover letter?</h1>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

const CoverLetter = async () => {

    const [clList, setCllist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState(null)
    // for toast
    const [showToast,setShowToast] = useState(false)
    const [toastMessage,setToastMessage] = useState("")
    const [toastMessageType, setToastMessageType] = useState("")
    //{ showToast: true, message: "New Cover letter Created!", message_type: "success" }
    // end of toast section
    const supabase = createClientComponentClient<Database>();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Dione');

    const handleClickListItem = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);

      
    };

    const getCoverletter = useCallback(async () => {
        try {
          setLoading(true)
          const {
            data: { user },
          } = await supabase.auth.getUser()
          let { data, error, status } = await supabase
            .from('coverletter')
            .select()
            .eq('user_id', user?.id)
            .eq('status','Active')

    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setCllist(data)
            setCUser(user)
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

    

      async function deleteCoverLetter(id:BigInt) {

        setOpen(true);
        /**
        try
        {
          setLoading(true)
          const { error } = await supabase
        .from('coverletter')
        .update({ status:"Deleted"})
        .eq('id', id)
        .eq('user_id', cuser?.id)
        if(!error){
            alert("Cover Letter Deleted.")
            getCoverletter()
        }

        }catch (error) {
          alert('Error deleting coverletter data!')
        } finally {
          setLoading(false)
        }
         */
      }
      
   // const {
     //   data: { user },
     // } = await supabase.auth.getUser()

 
 //   const { data, error } = await supabase.from('coverletter').select().eq('user_id',user?.id)  
    
  return (
    <PageContainer title="Cover Letter" description="This page is ">
      <DashboardCard title="Cover Letter">
<div>
<Button component={Link} variant="contained" disableElevation color="primary"  target={""}   href={"/tools/coverletter/add"}>
            Add New
          </Button>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                           
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                           
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       

                        {clList?.map((product) => (
                            <TableRow key={product.id}>
                               
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                           
                                        </Box>
                                    </Box>
                                </TableCell>
                               
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: "green",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.status}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                <IconButton color="primary" aria-label="Delete"
                                onClick={() => deleteCoverLetter( product.id.toString())}
                                 >
                                     <IconTrash />
                                </IconButton>
                                <IconButton color="primary" aria-label="Download" href={"/tools/coverletter/edit/"  + product.id.toString()} component={Link}>
                                     <IconEdit/>
                                </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Dialog
              sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
              maxWidth="xs"
             
              open={open}
              
            >
              <DialogTitle>Remove Cover Letter</DialogTitle>
              <DialogContent dividers>
                <h1>Are you sure you want to delete this cover letter?</h1>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleClose}>Ok</Button>
              </DialogActions>
            </Dialog>
</div>
   
      </DashboardCard>
    </PageContainer>
  );
};

export default CoverLetter;
