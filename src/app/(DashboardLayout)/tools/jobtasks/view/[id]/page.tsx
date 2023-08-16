'use client';
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
    status: string;
    Verified: boolean;
    Source: string;
    Source_Site: string;
    url: string;
    responsibilities: string;
    local: string;
    region: string;
    datePosted: string;
    educationalRequirement: string;
    email: string;
    employmentType: string;
    hourlySalary: string;
    language: string;
    workHours: string;
    qualification: string;
  }

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
          /** 
          let { data, error, status } = await supabase
            .from('jobs')
            .select('*,jobdetails(id, created_at, modified_at, generatedCoverLetter, status, job_header, job_id, jobs_masterlist(source,source_site, url,details, jobid, jobname,jobverified,tags))')
            .eq('user_id', user?.id)
            .eq('id',params.id)
            .eq('jobdetails.id',1)
        */
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

            //console.log(data)

           
           

          
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            
            setJDetails(data)
            setJDLines(data)
            setDataCount(data.length)
            /**
            data?.map((p) => {
                setJDLines(p.jobdetails)
                setupPaging(p.jobdetails.length)
               
            })
             */
          
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
    
        console.log("event: " + value + " set: " + currentPage)
    };

      async function setupModal(jobname: JobDetailsData){
        setOpen(!open)
        setJobInfo(jobname)
        console.log(jobname.status)
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
     function paginate(
        totalItems: number,
        currentPage: number = 1,
        pageSize: number = 10,
        maxPages: number = 10
    ) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
    
        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
    
        let startPage: number, endPage: number;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
    
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    
        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
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
                {jobinfo.Jobname}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Application Status: </b> {jobinfo.status} <br/>
              <b>  Hourly Rate:</b> {jobinfo.hourlySalary} <br/> <b>Location:</b> {jobinfo.local}, {jobinfo.region}<br/> <b>Date Posted:</b> {jobinfo.datePosted}
              <br/>
              <b>Education Requirement: </b> {jobinfo.educationalRequirement}<br/>
              <b>Employment Type: </b> {jobinfo.employmentType}
              <br/>
              <b>Language: </b> {jobinfo.language}
              <br/>
              <b>Work Hours: </b> {jobinfo.workHours}
              <br/>
              <b>Work Experience: </b> {jobinfo.qualification}
              <br/>
              <b>Source: </b> {jobinfo.Source} <br/>
              <b>Link: </b> <Link href={jobinfo.Source_Site + jobinfo.url.substring(1)}  target="_blank">Click here to view on Job Bank</Link>
              <br/><br/>
              <b>Responsibilities:</b><br/>
              {jobinfo.responsibilities}
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


