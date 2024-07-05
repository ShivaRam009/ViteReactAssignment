// src/pages/FirstPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const FirstPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/second');
    } else {
      alert('Please fill in all details');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          User Details
        </Typography>
        <TextField 
          label="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          variant="outlined" 
          fullWidth 
          required
        />
        <TextField 
          label="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          variant="outlined" 
          fullWidth 
          required
        />
        <TextField 
          label="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          variant="outlined" 
          fullWidth 
          required
        />
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          sx={{ 
            py: 1.5, 
            mt: 2 
          }}
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default FirstPage;
