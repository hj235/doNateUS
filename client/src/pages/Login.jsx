import React, { useState } from 'react'
import './LoginRegister.css';
import axios from 'axios';
import { Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    password: ''
  })

  //havent implement, this is wrong
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  async function loginUser(e) {
    e.preventDefault();
    const {name, password} = data
    try {
      const {data} = await axios.post('/login', {
        name,
        password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: '',
          password: ''
        });
        navigate('/discover');
      }
    } catch (error) {

    }
  }

  document.title = "Login";

  return (
    <div className="page-container">
      <div className="wrapper">
        <div className="form-box">
          <form method="get" onSubmit={loginUser}>
            <h1>Login</h1>
            <br />
            <TextField label="Username" variant="outlined" id="name" className="username" type="text" required
              value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Password" variant="outlined" id="password" className="password" type="password" required
              value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <FormControlLabel control={<Checkbox checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)}
              sx={{ color: 'gray', '&.Mui-checked': { color: 'gray' } }} />} label={<Typography sx={{ color: 'black' }}>Keep me signed in</Typography>} />
            <Button type="submit" variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}> Continue</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
