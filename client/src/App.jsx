import './App.css';
import {Routes, Route} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
