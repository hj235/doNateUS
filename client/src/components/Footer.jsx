import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import logo from '../assets/logo50.png'; // Import the logo image

function Footer() {
  return (
    <Box component="footer" className="footer-container">
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} className="footer-logo-container">
            <img src={logo} alt="Logo" className="footer-logo" />
          </Grid>
          <Grid item xs={12} sm={6} className="footer-text-container">
            <Typography variant="body1">
              &copy; 2024 doNateUS. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
