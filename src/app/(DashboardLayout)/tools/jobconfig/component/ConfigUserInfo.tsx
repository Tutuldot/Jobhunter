import React from 'react';
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
  
  import {
      IconTrash, IconEye, IconEdit
    } from "@tabler/icons-react";
interface ComponentProps {
    clList: any;
    deactivateJobs?: (e:number) => void;
 
  }

const ConfigUserInfoForm: React.FC<ComponentProps> = ({clList, deactivateJobs}) => {
    return (
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
                          onClick={() => deactivateJobs?.( product.id)}
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
    )
}

export default ConfigUserInfoForm