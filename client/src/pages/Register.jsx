import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';

export default function Register() {
  const navigate = useNavigate();
  const { user, dispatch } = useUserContext();
  if (user) navigate('/');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  async function registerUser(e) {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const loading = toast.loading('Attempting Registration')
      const { data } = await axios.post('/register', { name, email, password });
      if (data.error) {
        toast.dismiss(loading)
        toast.error(data.error);
      } else {
        setData({ name: '', email: '', password: '' });
        dispatch({ type: 'LOGIN', payload: data });
        toast.dismiss(loading)
        toast.success('Registration success. Welcome!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.dismiss(loading)
      toast.error('Error occurred during registration.');
    }
  }

  document.title = "Register";

  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
      <Box component={Paper} padding={7} mt={4} mb={4} boxShadow={3} width={400}>
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <form onSubmit={registerUser}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="username"
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Typography variant='body2' align='center' mt={2}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Already have an account? Login here</Link>
          </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Continue
          </Button>
        </form>
        <Typography variant='body2' align='center' mt={2} fontSize={10}>
          By joining, you agree to the doNateUS Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
        </Typography>
      </Box>
    </Container>
  );
}
