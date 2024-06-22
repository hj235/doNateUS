import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserContextProvider } from '../context/UserContext';
import { FirebaseContextProvider } from '../context/FirebaseContext';
import CssBaseline from '@mui/material/CssBaseline';

// Create a MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#003D7C', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FirebaseContextProvider>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </UserContextProvider>
    </FirebaseContextProvider>
  </React.StrictMode>,
);
