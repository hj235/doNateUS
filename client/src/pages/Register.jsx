import React from 'react';
import './Login.css';
import logo from '../assets/logo.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  async function registerUser(e) {
    e.preventDefault();
    // duplicate the data, not sure if I need to do this?
    const {name, email, password} = data;
    try {
      // data is the response provided by the server from the POST request
      const {data} = await axios.post('/register', {
        name, email, password
      });

      if (data.error) {
        // TODO: use toast for notifications
        alert(data.error);
      } else {
        setData({
          name: '',
          email: '',
          password: ''
        });
        //redirect('/login'); // TODO: redirect to '/' homepage and store session info as cookies somehow

        alert('Registration success. Welcome!');
        //navigate('/login');
      }

    // can have what error sia idk
    } catch (error) {
      console.log(error);
    }
  }
  
  document.title = "Register";
  
  return (
    <div className="page-container">
      <img src={logo} className="logo" alt="logo" />
      <div className="wrapper">
        <div className="form-box">
          <form method="post" onSubmit={registerUser}>
            <h1>Register</h1>

            <label htmlFor="username">Username: </label>
            <input id="username" className="username" type="text" required 
              value ={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
            <br />

            <label htmlFor="email">Email: </label>
            <input id="email" className="email" type="email" required 
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
