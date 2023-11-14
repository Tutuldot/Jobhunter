import React from 'react';
import { JobDetailsData } from '@/models/interfaces/JobTask';
import Link from "next/link";
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,Grid, CardContent,Button, IconButton, 
  } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Database } from '@/app/(DashboardLayout)/components/types/supabase';

interface ComponentProps {
  open: boolean;
  onClose: () => void;
  jobinfo: JobDetailsData;
  style: any;
}



const JobsModal: React.FC<ComponentProps> = ({ open, onClose, jobinfo, style }) => {
  return (
    <Modal
        open={open}
        onClose={onClose}
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
        <b>Link: </b> <Link href={jobinfo.Source_Site + (jobinfo.url !== null ? jobinfo.url.substring(1) : '') }  target="_blank">Click here to view on Job Bank</Link>
        <br/><br/>
        <b>Responsibilities:</b><br/>
        {jobinfo.responsibilities}
        </Typography>

    
        </Box>
    </Modal>
  );
};

export default JobsModal;