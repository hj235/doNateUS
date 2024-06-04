import React from 'react';
import { Container, Typography, Grid, Paper, Box, Avatar } from '@mui/material';
import './Home.css';

export default function Home() {
  // Change the document title
  React.useEffect(() => {
    document.title = "Home";
  }, []);

  // Sample data for the grid items
  const items = [
    { id: 1, name: 'NUS Hall shirts', avatar: '/static/images/avatar/1.jpg' },
    { id: 2, name: 'Item 2', avatar: '/static/images/avatar/2.jpg' },
    { id: 3, name: 'Item 3', avatar: '/static/images/avatar/3.jpg' },
    { id: 4, name: 'Item 4', avatar: '/static/images/avatar/4.jpg' },
    { id: 5, name: 'Item 5', avatar: '/static/images/avatar/5.jpg' },
    { id: 6, name: 'Item 6', avatar: '/static/images/avatar/6.jpg' },
  ];

  return (
    <Container className="container">
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={2} key={item.id}>
            <Paper elevation={3} className="grid-item">
              <Box className="grid-item-content">
                <Avatar src={item.avatar} alt={item.name} className="avatar" />
                <Typography variant="h6">{item.name}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
