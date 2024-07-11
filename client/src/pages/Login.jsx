import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, FormControlLabel, Checkbox, Container, Box, Paper } from '@mui/material';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

export default function Login() {
  const navigate = useNavigate();
  const { user, dispatch } = useUserContext();
  useEffect(() => {
    if (user) navigate('/');
  }, [user]);
  
  const [data, setData] = useState({
    name: '',
    password: ''
  });

  const [keepSignedIn, setKeepSignedIn] = useState(false);

  async function loginUser(e) {
    e.preventDefault();
    const { name, password } = data;
    try {
      const loading = toast.loading('Attempting Login')
      const { data } = await axios.post('/login', { name, password });
      if (data.error) {
        toast.dismiss(loading);
        toast.error(data.error);
      } else {
        setData({ name: '', password: '' });
        if (keepSignedIn) {
          localStorage.setItem('user', JSON.stringify(data));
        }
        dispatch({ type: 'LOGIN', payload: data });
        toast.dismiss(loading);
        toast.success('Logged in succesfully')
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Error occurred during login.');
    }
  }

  document.title = "Login";

  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
      <Box component={Paper} p={10} boxShadow={3} width={400}>
        <Typography variant="h4" gutterBottom align="center"> Login </Typography>
        <form onSubmit={loginUser}>
          <TextField label="Username" variant="outlined" fullWidth margin="normal" required id="name" type="text"
            value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <TextField label="Password" variant="outlined" fullWidth margin="normal" required id="password" type="password"
            value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          <FormControlLabel
            control={<Checkbox checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />}
            label="Keep me signed in"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth> Continue </Button>
        </form>

        <Typography variant='body2' align='center' mt={2}>
          <Link to="/register" style={{ textDecoration: 'none', color: 'grey' }}>Don't have an account? Register here</Link>
        </Typography>
        
      </Box>
    </Container>
  );
}
