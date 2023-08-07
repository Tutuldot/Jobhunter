'use client';
import { saveAs } from 'file-saver';
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react'
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
   IconCloudDownload, IconDownload, IconTrash
  } from "@tabler/icons-react";


const Resume = async () => {
    const [clList, setCllist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState(null)
    const supabase = createClientComponentClient<Database>();

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

      async function deleteResume(id:BigInt) {
        try
        {
          setLoading(true)
          const { error } = await supabase
        .from('resume')
        .update({ isdeleted:true})
        .eq('id', id)
        .eq('user_id', cuser?.id)
        if(!error){
            alert("resume Deleted.")
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
          saveAs(data, file)
          console.log('prompt')
          
        }catch (error) {
          alert('Error downloading file')
        } finally {
          setLoading(false)
        }
      }
      
   // const {
     //   data: { user },
     // } = await supabase.auth.getUser()

 
 //   const { data, error } = await supabase.from('coverletter').select().eq('user_id',user?.id)  
    
  return (
    <PageContainer title="Resume" description="List of resume">
      <DashboardCard title="Resume">

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
                                onClick={() => deleteResume( product.id.toString())}
                                 >
                                     <IconTrash />
                                </IconButton>

                                <IconButton color="primary" aria-label="Download"
                                onClick={() => downloadResume( product.file.toString())}
                                 >
                                     <IconDownload />
                                </IconButton>
                                
                               
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Resume;
