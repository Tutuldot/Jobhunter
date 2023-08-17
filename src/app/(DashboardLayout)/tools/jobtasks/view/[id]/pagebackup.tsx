'use client';
import Link from "next/link";
import JobsModal from "../../components/JobsModal";
import { paginate } from "@/utils/helpers";
import { useCallback, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Database } from "../../../../../types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import JobHeader from "../../components/JobHeader";
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

import { JobDetailsData } from "@/models/interfaces/JobTask";

  export default function JobTasksView  ({ params }: { params: { id: BigInteger } })  {
    const [clList, setCllist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState(null)
    const [jdetails, setJDetails] = useState(null)
    const [jdlines, setJDLines] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [dataCount, setDataCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setitemsPerPage] = useState(5)
    const [open, setOpen] = useState(false)
    const [jobinfo, setJobInfo] = useState<JobDetailsData>({
        Jobname: '',
        status: '',
        Verified: false,
        Source: '',
        Source_Site: '',
        url: '',
        responsibilities:'',
        local: '',
        region: '',
        datePosted: '',
        educationalRequirement: '',
        email: '',
        employmentType: '',
        hourlySalary: '',
        language: '',
        workHours: '',
        qualification: '',
      })
    const supabase = createClientComponentClient<Database>();
    // for removal
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
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
            .select('*,jobdetails(count)')
            .eq('user_id', user?.id)
            .eq('id',params.id)

          if (error && status !== 406) {
            throw error
          }
          console.log("to check")
         
          if (data) {
            setCllist(data)
            setCUser(user)
           
            data?.map((p) => {
                var itemCount = p.jobdetails[0].count
                var res = paginate(itemCount,1, itemsPerPage,10)

                setPageCount(res.totalPages)
                console.log("total pages: " + res.totalPages)
                
               
            })
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
      const getJobTasksDetails = useCallback(async (evt=1) => {
        try {
          setLoading(true)
          const {
            data: { user },
          } = await supabase.auth.getUser()
        
            console.log("Current Page is: " + evt)
            let startPage = (evt - 1) * itemsPerPage
            let endPage = startPage + (itemsPerPage - 1)
            console.log("start pages: " + startPage + " End Page: " + endPage)
            let { data, error, status } = await supabase
            .from('jobdetails')
            .select('id, created_at, modified_at, generatedCoverLetter, status, job_header, job_id, jobs_masterlist(source,source_site, url,details, jobid, jobname,jobverified,tags),jobs(id,user_id)')
            .eq('jobs.user_id', user?.id)
            .eq('jobs.id',params.id)
            .range(startPage,endPage)

    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            
            setJDetails(data)
            setJDLines(data)
            setDataCount(data.length)
           
          
          }
        } catch (error) {
          console.log('Error loading user and job details data! ' +  error)
        } finally {
          setLoading(false)
        }
      }, [supabase])
    
      useEffect(() => {
        getJobTasksDetails()
      }, [getJobTasksDetails])

      // end of job details

     

      const handleChange = (event, value) => {
        setCurrentPage(value)
        getJobTasksDetails(value)
      };

      async function setupModal(jobname: JobDetailsData){
        setOpen(!open)
        setJobInfo(jobname)
        console.log(jobname.status)
      }

      async function handleClose(){
        setOpen(!open)
      }

      async function deactivateJobs(id?:BigInt) {
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
      
 
   
 
 //   const { data, error } = await supabase.from('coverletter').select().eq('user_id',user?.id)  
    
  return (
    <PageContainer title="Job Tasks" description="This page is ">
        <JobsModal  open={open} onClose={handleClose} style = {style} jobinfo={jobinfo} />
        
      -  <DashboardCard title="Job Tasks">
<JobHeader clList={clList} deactivateJobs={deactivateJobs} />
     
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

<Pagination count={pageCount} defaultPage={1} siblingCount={0} boundaryCount={2} onChange={handleChange} />
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
                              Salary
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                              Location
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
                                     
                                      <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: (product.jobs_masterlist.status == null || product.jobs_masterlist.status == undefined) ? "gray" : "Green",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={product.id + ' ' +  product.jobs_masterlist.details.jobTitle}

                                            onClick={() => setupModal({
                                                Jobname: product.jobs_masterlist.details.jobTitle,
                                                status: (product.jobs_masterlist.status == null || product.jobs_masterlist.status == undefined) ? 'Not yet Applied' : product.jobs_masterlist.status,
                                                Verified: product.jobs_masterlist.jobverified,
                                                Source: product.jobs_masterlist.source,
                                                Source_Site: product.jobs_masterlist.source_site,
                                                url: product.jobs_masterlist.url,
                                                responsibilities:product.jobs_masterlist.details.Responsibilities,
                                                local: product.jobs_masterlist.details.addressLocality,
                                                region: product.jobs_masterlist.details.addressRegion,
                                                datePosted: product.jobs_masterlist.details.datePosted,
                                                educationalRequirement: product.jobs_masterlist.details.educationRequirements,
                                                email: product.jobs_masterlist.details.email,
                                                employmentType: product.jobs_masterlist.details.employmentType,
                                                hourlySalary: product.jobs_masterlist.details.hourlySalary,
                                                language: product.jobs_masterlist.details.languages,
                                                workHours: product.jobs_masterlist.details.workHours,
                                                qualification: product.jobs_masterlist.details.xpQualification,
                                              })}
                                        ></Chip>

                                        
                                  </Box>
                              </Box>
                          </TableCell>
                          <TableCell>
                              <Box
                                  sx={{
                                      display: "flex",
                                      alignItems: "center",
                                  }}
                              >
                                  <Box>
                                      <Typography variant="subtitle2" fontWeight={600}>
                                          {product.jobs_masterlist.details.hourlySalary} 
                                      </Typography>
                                     
                                  </Box>
                              </Box>
                          </TableCell>
                          <TableCell>
                              <Box
                                  sx={{
                                      display: "flex",
                                      alignItems: "center",
                                  }}
                              >
                                  <Box>
                                      <Typography variant="subtitle2" fontWeight={600}>
                                          {product.jobs_masterlist.details.addressLocality}, {product.jobs_masterlist.details.addressRegion}
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


