import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import {
  People,
  FitnessCenter,
  Schedule,
  TrendingUp,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';

// Mock data
const statsData = [
  { title: 'Total Members', value: '1,234', icon: <People />, color: '#1976d2', change: '+12%' },
  { title: 'Active Classes', value: '45', icon: <Schedule />, color: '#388e3c', change: '+3%' },
  { title: 'Equipment Items', value: '156', icon: <FitnessCenter />, color: '#f57c00', change: '+8%' },
  { title: 'Monthly Revenue', value: '$45,678', icon: <TrendingUp />, color: '#d32f2f', change: '+15%' },
];

const recentActivities = [
  { id: 1, member: 'John Doe', action: 'Checked in', time: '2 minutes ago', avatar: '/avatars/john.jpg' },
  { id: 2, member: 'Sarah Smith', action: 'Booked Yoga Class', time: '5 minutes ago', avatar: '/avatars/sarah.jpg' },
  { id: 3, member: 'Mike Johnson', action: 'Renewed membership', time: '10 minutes ago', avatar: '/avatars/mike.jpg' },
  { id: 4, member: 'Emily Davis', action: 'Completed workout', time: '15 minutes ago', avatar: '/avatars/emily.jpg' },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
        <Typography sx={{ mt: 2, textAlign: 'center' }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Chip 
                      label={stat.change} 
                      color="success" 
                      size="small" 
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Recent Activity
            </Typography>
            <Button variant="outlined">
              View All
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                          {activity.member.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">{activity.member}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                        {activity.time}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        icon={<CheckCircle />}
                        label="Completed" 
                        color="success" 
                        size="small" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
