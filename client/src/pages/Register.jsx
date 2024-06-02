import React from 'react';
import './LoginRegister.css';
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material'

export default function Register() {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''  
  })

  function registerUser(e) {
    e.preventDefault();
    console.log("Form submitted")
    // TODO
  }

  document.title = "Register";

  return (
    <div className="page-container">
      <div className="wrapper">
        <div className="form-box">
          <form method="get" onSubmit={registerUser}>
            <h1>Register</h1>
            <br />
            <TextField label="Username" variant="outlined" id="username" className="username" type="text" required
              value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Email" variant="outlined" id="email" className="email" type="text" required
              value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <TextField label="Password" variant="outlined" id="password" className="password" type="password" required
              value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} sx={{ background: 'white', userSelect: "none" }} />
            <br />
            <Typography type="submit" variant="text" sx={{ color: 'darkgray', '&:hover': { color: "black", userSelect: "none" } }}>Continue</Typography>
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
