import React, { useState } from 'react';
import Header from './Components/NavBar/Header';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import emailjs from 'emailjs-com';

function Contact() {
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const userId = 'ptv8rxESM12kxW_w1';

  const handleSubmit = (event) => {
    event.preventDefault();

    // Configuration EmailJS
    const templateParams = {
      lastname: lastname,
      email: email,
      message: message,
    };

    emailjs
      .send('service_hd2z0f2', 'template_4cu0u1s', templateParams, userId)
      .then(
        (response) => {
          alert('Votre message a été envoyé avec succès !');
          setLastname('');
          setEmail('');
          setMessage('');
        },
        (err) => {
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'url("https://images.unsplash.com/photo-1731934916254-2680412f8881?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',backgroundSize: 'cover',backgroundPosition: 'center', }}>
      <Header />
      <Container maxWidth="xs" sx={{ paddingY: 5, bgcolor: 'white', borderRadius: 5, boxShadow: 2, my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{my: 2}} >
          Contactez-nous
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <AccountCircle sx={{ mr: 1, my: 0.5, color: '#728996' }} />
            <TextField
              type="text"
              color="success"
              label="Nom"
              variant="standard"
              size='small'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              sx={{backgroundColor: 'transparent'}}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <AlternateEmailIcon sx={{ mr: 1, my: 0.5, color: '#728996' }} />
            <TextField
              type="email"
              color="success"
              label="Votre Email"
              variant="standard"
              size='small'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{backgroundColor: 'transparent'}}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'top-end', justifyContent: 'center' }}>
            <Box sx={{ mr: 0.5, my: 0.5, color: '#728996' }}/>
            <TextField
              type="text"
              color="success"
              label="Message"
              variant="standard"
              size='small'
              multiline
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              sx={{backgroundColor: 'transparent'}}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            <Button variant="contained" sx={{ bgcolor: '#728996', '&:hover': { bgcolor: '#52626b' }, width: '200px' }} type="submit">
              Soumettre
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default Contact;
