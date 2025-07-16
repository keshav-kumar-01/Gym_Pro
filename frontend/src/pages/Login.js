import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  FitnessCenter,
  Facebook,
  Google,
  Apple,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would authenticate with the backend
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      localStorage.setItem('authToken', 'sample-auth-token');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left side - Branding */}
        <Box
          sx={{
            flex: '1',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'primary.dark',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'white',
              mb: 2,
            }}
          >
            <FitnessCenter color="primary" sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            GymFlow Pro
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Streamline your gym operations with our comprehensive management system
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Grid container spacing={2} sx={{ textAlign: 'left' }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', mr: 1 }} />
                  <Typography variant="body2">Member management & attendance tracking</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', mr: 1 }} />
                  <Typography variant="body2">Class scheduling & instructor assignment</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', mr: 1 }} />
                  <Typography variant="body2">Equipment inventory & maintenance</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', mr: 1 }} />
                  <Typography variant="body2">Customizable branding & reports</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Right side - Login form */}
        <Box
          sx={{
            flex: '1',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Log in to access your gym management dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={credentials.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={credentials.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Remember Me"
              />
              <Link href="#" variant="body2">
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ py: 1.5, borderRadius: 3, mb: 2 }}
            >
              Log In
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                or continue with
              </Typography>
            </Divider>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                  startIcon={<Google />}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                  startIcon={<Facebook />}
                >
                  Facebook
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                  startIcon={<Apple />}
                >
                  Apple
                </Button>
              </Grid>
            </Grid>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="#" variant="body2" fontWeight="bold">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="body2" color="white" sx={{ mt: 3, opacity: 0.8 }}>
        © 2024 GymFlow Pro. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Login;
