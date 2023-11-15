'use client';
import { saveAs } from 'file-saver';
import { DialogYesNo } from "@/app/(DashboardLayout)/components/shared/CLComponents";
import { SnackbarOrigin } from '@mui/material';
import { RData } from "@/models/interfaces/JobTask";
interface State extends SnackbarOrigin {

}
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { Database } from "../../../../../types/supabase";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,Grid, CardContent,Button, IconButton, Snackbar
} from '@mui/material';

import {
   IconCloudDownload, IconDownload, IconTrash
  } from "@tabler/icons-react";

 
  export default function  Resume() {
    const [clList, setCllist] = useState<RData[]>()
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState<User | null>()
    const supabase = createClientComponentClient<Database>();
    const [idToRemove, setIDToRemove] = useState(0)
    const [open, setOpen] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [state, setState] = useState<State>({

      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal } = state;

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
  

    const getResume = useCallback(async () => {
        try {
          setLoading(true)
          const {
            data: { user },
          } = await supabase.auth.getUser()
          let { data, error, status } = await supabase
            .from('resume')
            .select()
            .eq('user_id', user?.id)
            .is('isdeleted',null)
         

    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setCllist(data)
            setCUser(user)
          }
        } catch (error) {
          alert('Error loading user and resume data!')
        } finally {
          setLoading(false)
        }
      }, [supabase])
    
      useEffect(() => {
        getResume()
      }, [getResume])

      async function deleteResume(id:number) {
        try
        {
          setLoading(true)
          const { error } = await supabase
        .from('resume')
        .update({ isdeleted:true})
        .eq('id', id)
        .eq('user_id', cuser?.id)
        if(!error){
            //alert("resume Deleted.")
              // cover letter deleted
            setMessageText("Resume deleted.")
            setSnackOpen(true)
            getResume()
        }

        }catch (error) {
          alert('Error deleting coverletter data!')
        } finally {
          setLoading(false)
        }
      }

      async function downloadResume(file:string) {
        try
        {
          setLoading(true)
          const { data, error } = await supabase
          .storage
          .from('files')
          .download(file)
          console.log('file downloaded')
          //saveAs(data, file)
          console.log('prompt')
          
        }catch (error) {
          alert('Error downloading file')
        } finally {
          setLoading(false)
        }
      }

      const handleClose = () => {
        console.log("modal should close")
        setIDToRemove(0)
        setOpen(false);
  
        
      };
  
       const handleAgree = () => {
        if(idToRemove > 0){
          deleteResume(idToRemove)
        }
        
        setOpen(false);
      };


      async function deleteResumePrompt(id:number) {
        setIDToRemove(id)
        setOpen(true)
      }
      
   // const {
     //   data: { user },
     // } = await supabase.auth.getUser()

 
 //   const { data, error } = await supabase.from('coverletter').select().eq('user_id',user?.id)  
    
  return (
    <PageContainer title="Resume" description="List of resume">
      <DashboardCard title="Resume">
        <div>
        <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
            message={messageText}
           
            anchorOrigin={{ vertical, horizontal }}
          />
      <Button component={Link} variant="contained" disableElevation color="primary"  target={""}   href={"/tools/resume/add"}>
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
                               
                              
                                <TableCell align="right">
                                <IconButton color="primary" aria-label="Delete"
                                onClick={() => deleteResumePrompt( product.id)}
                                 >
                                     <IconTrash />
                                </IconButton>

                                <IconButton color="primary" aria-label="Download"
                                onClick={() => downloadResume( product.file == null ? "" : product.file.toString())}
                                 >
                                     <IconDownload />
                                </IconButton>
                                
                               
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <DialogYesNo open={open} handleClose={handleClose} 
            handleAgree={handleAgree} header="Delete Cover Letter" message="Are you sure you want to delete this resume?"  />

        </div>
      

      </DashboardCard>
    </PageContainer>
  );
};

