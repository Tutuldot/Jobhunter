'use client';
import Link from "next/link";
type Json =
| string
| number
| boolean
| null
| { [key: string]: Json | undefined }
| Json[]
import { paginate } from "@/utils/helpers";
import { useCallback, useEffect, useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Pagination from '@mui/material/Pagination';
import { Database } from "@/app/(DashboardLayout)/components/types/supabase";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import JobHeader from "../../components/JobHeader";
import JobsModal from "../../components/JobsModal";
import JobDetails from "../../components/JobDetails";
import { JobDetailsData, Jobs } from "@/models/interfaces/JobTask";

interface jdetails_interface {
  id: number;
  created_at: string | null;
  modified_at: string | null;
  generatedCoverLetter: string | null;
  status: string | null;
  job_header: number | null;
  job_id: number | null;
  jobs_masterlist: {
    created_at: string | null;
    details: Json | null;
    details_version: string | null;
    id: number;
    jobid: string | null;
    jobname: string | null;
    jobverified: boolean | null;
    source: string | null;
    source_site: string | null;
    tags: string | null;
    url: string | null;
  }[] | null;
  jobs: {
    appliedJobCount: number | null;
    coverletter_id: number | null;
    created_at: string | null;
    email_sending_schedule: string | null;
    id: number;
    jobCount: number | null;
    keyword: string | null;
    modified_at: string | null;
    name: string;
    resume_id: number | null;
    search_texts: Json | null;
    send_asap: boolean | null;
    setup_id: number | null;
    status: string | null;
    user_id: string | null;
  } | null;
};

  export default function JobTasksView  ({ params }: { params: { id: BigInteger } })  {
    const [clList, setCllist] = useState<Jobs[]>()
    const [loading, setLoading] = useState(true)
    const [cuser, setCUser] = useState<User | null>()
    const [jdetails, setJDetails] = useState<jdetails_interface[]>()
    const [jdlines, setJDLines] = useState<jdetails_interface[]>()
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
            .returns<Jobs[]>()
          if (error && status !== 406) {
            throw error
          }
          console.log("to check");
          console.log(data);
          if (data) {
            setCllist(data)
            setCUser(user)
           
            data?.map((p) => {
                var itemCount = p.jobdetails == null ? 0 : p.jobdetails[0].count
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
            .returns<jdetails_interface[]>()
    
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

     

      const handleChange = (event: any, value:number) => {
        console.log(event)
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

      async function deactivateJobs(id:number) {
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
        <DashboardCard title="Job Tasks">
            <JobHeader clList={clList} deactivateJobs={deactivateJobs} />
        </DashboardCard>

<br/><br/>


    <DashboardCard title="Job Items">
        <div>
          <Pagination count={pageCount} defaultPage={1} siblingCount={0} boundaryCount={2} onChange={handleChange} />
          <JobDetails jdlines={jdlines} setupModal={setupModal} deactivateJobs={deactivateJobs} />
        </div>
       

    </DashboardCard>
      

    </PageContainer>
  );
};


