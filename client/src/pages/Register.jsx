import React from 'react';
import './LoginRegister.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material'
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
    // duplicate the data, not sure if I need to do this?
    const { name, email, password } = data;
    try {
      // data is the response provided by the server from the POST request
      const { data } = await axios.post('/register', {
        name, email, password
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: '',
          email: '',
          password: ''
        });
        //redirect doesn't work? idk why
        //redirect('/login'); // TODO: redirect to '/' homepage and store session info as cookies somehow

        // // save user data to local storage
        // localStorage.setItem('user', JSON.stringify(data));

        // update the user context
        dispatch({type: 'LOGIN', payload: data});

        toast.success('Registration success. Welcome!');
        navigate('/');
      }

      // can have what error sia idk
    } catch (error) {
      console.log(error);
    }
  }

  document.title = "Register";

  return (
    <div className="page-container-box">
      <div className="wrapper">
        <div className="form-box">
          <form method="post" onSubmit={registerUser}>
            <h1>Register</h1>
            <br />
            <TextField label="Username" variant="outlined" id="username" className="username" type="text" required
              value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Email" variant="outlined" id="email" className="email" type="email" required
              value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Password" variant="outlined" id="password" className="password" type="password" required
              value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <Link to="/login" fontSize={13} variant="inherit" sx={{userSelect: "none" }}> Already have an account?</Link>
            <Button type="submit" variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}> Continue</Button>
          </form>
          <br />
          <Typography variant='h6' fontSize={10}>
            By joining, you agree to the doNateUS Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
          </Typography>
        </div>
      </div>
    </div>
  )
}
