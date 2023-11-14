import React from 'react';
import Link from "next/link";
type Json =
| string
| number
| boolean
| null
| { [key: string]: Json | undefined }
| Json[]
import { JobDetailsData, jdetails_interface } from '@/models/interfaces/JobTask';
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
interface ComponentProps {
    jdlines: any;
    deactivateJobs?: (e:number) => void;
    setupModal?: (jobname: JobDetailsData) => void;
  }


  const JobDetails: React.FC<ComponentProps> = ({jdlines,deactivateJobs,setupModal}) => {
    return(
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
                 

                  {jdlines?.map((product:jdetails_interface) => (
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

                                            onClick={() => setupModal?.({
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
                          onClick={() => deactivateJobs?.( product.id)}
                           >
                               <IconTrash />
                          </IconButton>
                          

                        
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </Box>
    )
  }

  export default JobDetails