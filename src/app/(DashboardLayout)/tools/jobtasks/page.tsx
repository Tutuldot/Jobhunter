'use client';
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
    IconTrash, IconEye, IconEdit
  } from "@tabler/icons-react";


const JobTasks = async () => {
    const [clList, setCllist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState(null)
    const supabase = createClientComponentClient<Database>();

    const getJobTasks = useCallback(async () => {
        try {
          setLoading(true)
          const {
            data: { user },
          } = await supabase.auth.getUser()
          let { data, error, status } = await supabase
            .from('jobs')
            .select()
            .eq('user_id', user?.id)
         

    
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
        getJobTasks()
      }, [getJobTasks])

      async function deactivateJobs(id:BigInt) {
        try
        {
          setLoading(true)
          const { error } = await supabase
        .from('jobs')
        .update({ status:"Deactivated"})
        .eq('id', id)
        .eq('user_id', cuser?.id)
        if(!error){
            alert("Job Deactivated")
            getJobTasks()
        }

        }catch (error) {
          alert('Error deactivating record!')
        } finally {
          setLoading(false)
        }
      }
      
   // const {
     //   data: { user },
     // } = await supabase.auth.getUser()

 
 //   const { data, error } = await supabase.from('coverletter').select().eq('user_id',user?.id)  
    
  return (
    <PageContainer title="Job Tasks" description="This page is ">
      <DashboardCard title="Job Tasks">

      <Button component={Link} variant="contained" disableElevation color="primary"  target={""}   href={"/tools/jobtasks/add"}>
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
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Job Metrics
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
                                            backgroundColor: (product.status == "Active") ? "green" : "Red",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.status}
                                    ></Chip>
                                </TableCell>


                                <TableCell>
                                    <Box
                                        sx={{ display: "flex", alignItems: "center",}}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                            {product.appliedJobCount || 0}  / {product.jobCount || 0} ({(((product.appliedJobCount || 0) / (product.jobCount || 1)) * 100).toFixed(0)} %)
                                            </Typography>
                                           
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell align="right">
                                <IconButton color="primary" aria-label="Delete"
                                onClick={() => deactivateJobs( product.id.toString())}
                                 >
                                     <IconTrash />
                                </IconButton>
                                <IconButton color="primary" aria-label="Download" href={"/tools/jobtasks/edit/"  + product.id.toString()} component={Link}>
                                     <IconEdit />
                                </IconButton>

                                <IconButton color="primary" aria-label="Download" href={"/tools/jobtasks/view/"  + product.id.toString()} component={Link}>
                                     <IconEye />
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

export default JobTasks;
