'use client';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';

import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,Grid, CardContent,Button
} from '@mui/material';

const products = [
  {
      id: "1",
      name: "DB Administrator Hunt",
      keyword: "Database Administrator",
      date_created: "7/25/2023 06:00:00AM",
      status: "In-Progress",
      pbg: "primary.main",
      current_count: "30",
      applied_count: "13",
  },
  {
    id: "2",
    name: "SQL Dev Hun",
    keyword: "SQL",
    date_created: "7/25/2023 06:00:00AM",
    status: "In-Progress",
    pbg: "primary.main",
    current_count: "30",
    applied_count: "13"
},
{
    id: "3",
    name: "Web Dev Hunt",
    keyword: "Web Developer",
    date_created: "7/25/2023 06:00:00AM",
    status: "In-Progress",
    pbg: "primary.main",
    current_count: "30",
    applied_count: "13",
},
{
    id: "4",
    name: "Programmer",
    keyword: "Programmer",
    date_created: "7/25/2023 06:00:00AM",
    status: "In-Progress",
    pbg: "primary.main",
    current_count: "30",
    applied_count: "13",
},
 
];


const JobTasks = () => {
  return (
    <PageContainer title="Job Tasks" description="This page is ">
      <DashboardCard title="Job Tasks">

      <Button variant="contained" disableElevation color="primary"  target="_blank" href="https://adminmart.com/product/modernize-next-js-admin-dashboard">
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
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date Created
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Completion Rate
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
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
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.keyword}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.date_created}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.status}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6"> {product.applied_count} / {product.current_count}</Typography>
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
