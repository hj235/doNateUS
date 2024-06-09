// dependencies
import './App.css';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'

// pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Create from './pages/CreateListing';
import Discover from './pages/Discover';


// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// axios stuff to make life easier
axios.defaults.baseURL = 'http://localhost:8000'; // simplifies having to type out the server url multiple times
axios.defaults.withCredentials = true; // allows cookies on client side

function App() {

  return (
    <>
      <Navbar/>
      <Toaster/>
      <div page-container>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/discover' element={<Discover/>} />
      </Routes>
      </div>
    </>
  )
}

export default App
