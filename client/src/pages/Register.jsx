import React from 'react';
import './Login.css';
import logo from '../assets/logo.png';
import { useState } from 'react';

export default function Register() {
  
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  function registerUser(e) {
    e.preventDefault();
    // TODO
  }
  
  document.title = "Register";
  
  return (
    <div className="page-container">
      <img src={logo} className="logo" alt="logo" />
      <div className="wrapper">
        <div className="form-box">
          <form method="get" onSubmit={registerUser}>
            <h1>Register</h1>

            <label htmlFor="username">Username: </label>
            <input id="username" className="username" type="text" required 
              value ={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
            <br />

            <label htmlFor="email">Email: </label>
            <input id="email" className="email" type="text" required 
              value ={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            <br />

            <label htmlFor="password">Password: </label>
            <input id="password" className="password" type="password" required 
              value ={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            <br />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
