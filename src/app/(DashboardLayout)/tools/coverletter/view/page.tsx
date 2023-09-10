'use client';
import Link from "next/link";
import { useCallback, useEffect, useState, useMemo  } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
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
import DialogContentText from '@mui/material/DialogContentText';




export default function CoverLetter()  {

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
    const handleClickOpen = () => {
      setOpen(true);
    };
  
   
    const handleClose = () => {
      console.log("modal should close")
      setOpen(false);

      
    };
    const memoizedDialog = useMemo(() => {
      return          ;
    }, [open]);
   

    

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
        getCoverletter();
       
      }, [getCoverletter])
 
     

      async function deleteCoverLetter(id:BigInt) {

        
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
         
      }
      
   // const {
     //   data: { user },
     // } = await supabase.auth.getUser()

 
 //   const { data, error } = await supabase.from('coverletter').select().eq('user_id',user?.id)  
    
  return (
    <PageContainer title="Cover Letter" description="This page is ">
      <DashboardCard title="Cover Letter">
<div>
<Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
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
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
</div>
   
      </DashboardCard>
    </PageContainer>
  );
};


