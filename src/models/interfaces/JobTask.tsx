type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
export interface JobDetailsData {
    Jobname: string | null;
    status: string | null;
    Verified: boolean | null;
    Source: string | null;
    Source_Site: string | null;
    url: string | null;
    responsibilities: string | null;
    local: string | null;
    region: string | null;
    datePosted: string | null;
    educationalRequirement: string | null;
    email: string | null;
    employmentType: string | null;
    hourlySalary: string | null;
    language: string | null;
    workHours: string | null;
    qualification: string | null;
  }


  export   interface jdetails_interface {
    id: number;
    name: string |  null;
    appliedJobCount: number | null;
    jobCount: number | null;
    created_at: string | null;
    modified_at: string | null;
    generatedCoverLetter: string | null;
    status: string | null;
    job_header: number | null;
    job_id: number | null;
    jobs_masterlist: {
      created_at: string | null;
      details:  {
        jobTitle: string | null;
        Responsibilities: string | null;
        addressLocality: string | null;
        addressRegion: string | null;
        datePosted: string | null;
        educationRequirements: string | null;
        email: string | null;
        employmentType: string | null;
        hourlySalary: string | null;
        languages: string | null;
        workHours: string | null;
        xpQualification: string | null;
    };
      details_version: string | null;
      id: number;
      jobid: string | null;
      jobname: string | null;
      jobverified: boolean | null;
      source: string | null;
      source_site: string | null;
      tags: string | null;
      url: string | null;
      status: string | null;
    };
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
    };
  };



  export interface CLData {
    coverletter: string | null;
    created_at: string | null;
    id: number;
    modified_at: string | null;
    name: string | null;
    status: string | null;
    user_id: string | null;
  }


export interface RData {
    created_at: string | null;
    file: string | null;
    id: number;
    isdeleted: boolean | null;
    name: string | null;
    path: string | null;
    user_id: string | null;
};


export interface Jobs {
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
}