'use client';
import Link from "next/link";
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
   IconCloudDownload, IconTrash
  } from "@tabler/icons-react";


const products = [
  {
      id: "1",
      name: "Database Administrator",
      filelink: "resume.pdf",
      status: "Active",
  },
  {
      id: "2",
      name: "Data Analyst",
      filelink: "resume.pdf",
      status: "Active",
  },
  {
      id: "3",
      name: "SQL Developer",
      filelink: "resume.pdf",
      status: "Active",
  },
  {
      id: "4",
      name: "Java Developer",
      filelink: "resume.pdf",
      status: "Active",
  },
];


const CoverLetter = async () => {
   
    const supabase = createClientComponentClient<Database>();
    const {
        data: { user },
      } = await supabase.auth.getUser()

 
      const { data, error } = await supabase.from('coverletter').select()  
    
      console.log(data?.length)
  return (
    <PageContainer title="Cover Letter" description="This page is ">
      <DashboardCard title="Cover Letter">

      <Button component={Link} variant="contained" disableElevation color="primary"  target={""}   href={"/tools/coverletter/add"}>
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
                           
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       

                        {data?.map((product) => (
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
                                            backgroundColor: "green",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.status}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                <IconButton color="primary" aria-label="Delete">
                                     <IconTrash />
                                </IconButton>
                                <IconButton color="primary" aria-label="Download">
                                     <IconCloudDownload />
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

export default CoverLetter;
