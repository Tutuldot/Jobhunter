'use client';
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
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

  interface JobDetailsData {
    Jobname: string;
    Verified: boolean;
    Source: string;
    Source_Site: string;
    url: string;
  }

  export default function JobTasksView  ({ params }: { params: { id: BigInteger } })  {
    const [clList, setCllist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState(null)
    const [jdetails, setJDetails] = useState(null)
    const [jdlines, setJDLines] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [countPerPage, setCountPerPage] = useState(0)
    const [open, setOpen] = useState(false)
    const [jobinfo, setJobInfo] = useState<JobDetailsData>({
        Jobname: '',
        Verified: false,
        Source: '',
        Source_Site: '',
        url: ''
      })
    const supabase = createClientComponentClient<Database>();
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const getJobTasks = useCallback(async () => {
        try {
          setLoading(true)
          const {
            data: { user },
          } = await supabase.auth.getUser()
          let { data, error, status } = await supabase
            .from('jobs')
            .select('*,jobdetails(id, created_at, modified_at, generatedCoverLetter, status, job_header, job_id, jobs_masterlist(source,source_site, url,details, jobid, jobname,jobverified,tags))')
            .eq('user_id', user?.id)
            .eq('id',params.id)

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

      // start of retrieval of job details
      const getJobTasksDetails = useCallback(async () => {
        try {
          setLoading(true)
          const {
            data: { user },
          } = await supabase.auth.getUser()

          let { data, error, status } = await supabase
            .from('jobs')
            .select('*,jobdetails(id, created_at, modified_at, generatedCoverLetter, status, job_header, job_id, jobs_masterlist(source,source_site, url,details, jobid, jobname,jobverified,tags))')
            .eq('user_id', user?.id)
            .eq('id',params.id)
           

          
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setJDetails(data)
            
            console.log('job details')
            console.log(data)
            data?.map((p) => {
                setJDLines(p.jobdetails)
                setupPaging(p.jobdetails.length)
                console.log(p.jobdetails.length)
            })

          
          }
        } catch (error) {
          console.log('Error loading user and job details data!')
        } finally {
          setLoading(false)
        }
      }, [supabase])
    
      useEffect(() => {
        getJobTasksDetails()
      }, [getJobTasksDetails])

      // end of job details

      async function setupPaging(rowCount:Number){

      }

      async function setupModal(jobname: String){
        setOpen(!open)
      }

      async function handleClose(){
        setOpen(!open)
      }

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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            </Box>
      </Modal>
       <DashboardCard title="Job Tasks">

     
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

                        
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </Box>
</DashboardCard>

<br/><br/>


<DashboardCard title="Job Items">

     
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
                 

                  {jdlines?.map((product) => (
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
                                          {product.jobs_masterlist.details.jobTitle} <br/>
                                          {product.jobs_masterlist.details.source} 
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
                                     0
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
                          <IconButton color="primary" aria-label="Download" 
                          onClick={() => setupModal( product.id.toString())}>
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


