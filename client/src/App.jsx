import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Create from './pages/CreateListing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'

// axios stuff to make life easier
axios.defaults.baseURL = 'http://localhost:8000'; // simplifies having to type out the server url multiple times
axios.defaults.withCredentials = true; // allows cookies on client side

function App() {

  return (
    <>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
