import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUsers } from './Reducer/UserReducer';
import Header from './Components/NavBar/Header';

function Profil() {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    number: '',
    email: '',
    replica: 'Aucune',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des informations utilisateur');
          }
          return response.json();
        })
        .then((data) => {
          setUserData({
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            number: data.number || '',
            email: data.email || '',
            replica: data.replica || 'Aucune',
          });
          dispatch(setUsers(data));
        })
        .catch((error) => {
          console.error('Erreur:', error);
          setSnackbar({ open: true, message: 'Erreur lors de la récupération des informations.', severity: 'error' });
        });
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/user/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la sauvegarde des données');
          }
          return response.json();
        })
        .then((data) => {
          dispatch(setUsers(data));
          setSnackbar({ open: true, message: 'Données sauvegardées avec succès !', severity: 'success' });
        })
        .catch((error) => {
          console.error('Erreur:', error);
          setSnackbar({ open: true, message: 'Une erreur est survenue lors de la sauvegarde des données.', severity: 'error' });
        });
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Header />
      <Typography sx={{ mt: 4, mb: 1, textAlign: 'center' }} variant="h4" color="primary">
        Bienvenue {userData.firstname && userData.lastname ? `${userData.firstname} ${userData.lastname}` : 'Chargement...'} !
      </Typography>
      <Typography sx={{ textAlign: 'center', color: '#555', mb: 2}} variant="body2">
        Tu retrouveras ici tes informations personnelles.
      </Typography>
      <Box
        sx={{
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 3,
          my: 4,
          p: 5,
          borderRadius: 5,
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <TextField
            fullWidth
            type="text"
            label="Prénom"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="text"
            label="Nom"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <TextField
            fullWidth
            type="tel"
            label="Numéro"
            name="number"
            value={userData.number}
            onChange={handleChange}
            sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}
          />
        </Box>
        <FormControl fullWidth sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}>
          <InputLabel>Votre réplique</InputLabel>
          <Select
            name="replica"
            label="Votre réplique"
            value={userData.replica}
            onChange={handleChange}
            sx={{ padding: 1 }}
          >
            <MenuItem value="Aucune">Aucune</MenuItem>
            <MenuItem value="Compacte">Compacte</MenuItem>
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Distance">Distance</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            my: 2,
            bgcolor: '#728996',
            color: '#fff',
            '&:hover': {
              bgcolor: '#5f6d7d',
            },
          }}
          onClick={handleSave}
        >
          Sauvegarder
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Profil;
