'use client';
import Link from "next/link";
import { useCallback, useEffect, useState, useMemo  } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Database } from "../../../../../types/supabase";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
    IconTrash,  IconEdit
  } from "@tabler/icons-react";

  import { useRouter,redirect } from "next/navigation";
import { DialogYesNo } from "./components/CLComponents";
import { SnackbarOrigin } from '@mui/material';

interface State extends SnackbarOrigin {

}

interface CLData {
  coverletter: string | null;
  created_at: string | null;
  id: number;
  modified_at: string | null;
  name: string | null;
  status: string | null;
  user_id: string | null;
}


interface user_interface {
  email: string | null;
  id: number;
  role: string | null;
}

export default function CoverLetter()  {

    const [clList, setCllist] = useState< CLData[]>()
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState<User>()
    const [idToRemove, setIDToRemove] = useState(0)
    const supabase = createClientComponentClient<Database>();
    const [messageText, setMessageText] = useState("")
    const [state, setState] = useState<State>({

      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
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
  
   
    const handleClose = () => {
      console.log("modal should close")
      setIDToRemove(0)
      setOpen(false);

      
    };

     const handleAgree = () => {
      if(idToRemove > 0){
        deleteCoverLetter(idToRemove)
      }
      
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
            setCUser(user as User)
            console.log(user)
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
 
      async function deleteCoverLetterPrompt(id:number) {
        setIDToRemove(id)
        setOpen(true)
      }

      async function deleteCoverLetter(id:number) {

        
        try
        {
          setLoading(true)
          const { error } = await supabase
        .from('coverletter')
        .update({ status:"Deleted"})
        .eq('id', id)
        .eq('user_id', cuser?.id)
        if(!error){
           // cover letter deleted
           setMessageText("Cover letter deleted.")
           setSnackOpen(true)
            getCoverletter()
            
        }

        }catch (error) {
          //alert('Error deleting coverletter data!')
          setMessageText("Error on loading data. Please try again later.")
          setSnackOpen(true)
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
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
            message={messageText}
           
            anchorOrigin={{ vertical, horizontal }}
          />
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
                                onClick={() => deleteCoverLetterPrompt( product.id)}
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
            <DialogYesNo open={open} handleClose={handleClose} 
            handleAgree={handleAgree} header="Delete Cover Letter" message="Are you sure you want to delete this cover letter?"  />
            
</div>
   
      </DashboardCard>
    </PageContainer>
  );
};


