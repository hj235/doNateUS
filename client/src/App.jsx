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
import Test from './pages/Test';
import Listing from './pages/Listing'


// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// axios stuff to make life easier
console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL; // simplifies having to type out the server url multiple times
axios.defaults.withCredentials = true; // allows cookies on client side

function App() {

  return (
    <>
      <Navbar/>
      <Toaster/>
      <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/discover' element={<Discover/>} />
        <Route path='/test' element={<Test />} />
        <Route path='/listing/:id' element={<Listing/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
