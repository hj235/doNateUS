import React, { useState } from 'react'
import './Login.css';
import logo from '../assets/logo.png';
import axios from 'axios';

export default function Login() {
  
  const [data, setData] = useState({
    name: '',
    password: ''
  })

  function loginUser(e) {
    e.preventDefault();
    axios.get('/');
  }
  
  return (
    <div className="page-container">
      <img src={logo} className="logo" alt="logo" />
      <div className="wrapper">
        <div className="form-box">
          <form method="get" onSubmit={loginUser}>
            <h1>Login</h1>
            
            <label htmlFor="username">Username: </label>
            <input id="username" className="username" type="text" 
              value ={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
            <br />

            <label htmlFor="password">Password: </label>
            <input id="password" className="password" type="password" 
              value ={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            <br />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
