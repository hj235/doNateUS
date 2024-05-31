import './App.css';
import {Routes, Route} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// axios stuff to make life easier
import axios from 'axios';
// simplifies having to type out the server url multiple times
axios.defaults.baseURL = 'http://localhost:8000';
// allows cookies on client side
axios.defaults.withCredentials = true; 

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
