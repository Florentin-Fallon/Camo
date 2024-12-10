import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUsers} from './Reducer/UserReducer';
import Header from './Components/NavBar/Header';

function Profil() {
  const dispatch = useDispatch()
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
    <Box sx={{backgroundImage: 'url("https://images.unsplash.com/photo-1602673221577-0b56d7ce446b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',backgroundSize: 'cover',minHeight: '100vh' }}>
      <Header />
      <Typography sx={{ mt: 5, mb: 1, textAlign: 'center',color: 'white' }} variant="h4" color="primary">
        Bienvenue {userData.firstname && userData.lastname ? `${userData.firstname} ${userData.lastname}` : 'Chargement...'} !
      </Typography>
      <Typography sx={{ textAlign: 'center', color: 'white', mb: 2}} variant="body2">
        Tu retrouveras ici tes informations personnelles.
      </Typography>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          sx={{
            boxShadow: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            my: 4,
            p: 5,
            borderRadius: 5,
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
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
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',gap: 2}}>
          <Button
            variant="contained"
            sx={{my: 2, bgcolor: '#728996',color: '#fff',
              '&:hover': {
                bgcolor: '#5f6d7d',
              },
            }}
            onClick={handleSave}
          >
            Sauvegarder
          </Button>
        </Box>
      </Box>
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
