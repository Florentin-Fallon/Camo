import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import LocalPhone from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Button from '@mui/material/Button';
import { setUsers } from './Reducer/UserReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import PasswordIcon from '@mui/icons-material/Password';
import GppGoodIcon from '@mui/icons-material/GppGood';

function Signup() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [replica, setReplica] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const newUser = {
      name,
      number,
      email,
      replica,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/signup', newUser);
      if (response.status === 201) {
        const usersReponse = await axios.get('http://localhost:5000/users');
        dispatch(setUsers(usersReponse.data));

        setName('');
        setEmail('');
        setNumber('');
        setReplica('');
        setPassword('');
        setConfirmPassword('');

        alert(`Bienvenue dans le groupe ${name} !`);
        navigate('/');
      } else {
        throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Erreur:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundImage: 'url("https://cdn.pixabay.com/photo/2018/03/20/03/11/northern-lights-3242090_1280.jpg")' }}>
      <Card sx={{ minWidth: 300, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            <img style={{ width: '80px', height: '70px' }} src='https://cdn.pixabay.com/photo/2013/07/12/15/55/laurel-wreath-150577_1280.png' alt='Neversoft' />
          </Typography>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <AccountCircle sx={{ mr: 1, my: 0.5, color: '#4caf50' }} />
              <TextField
                type='text'
                color='success'
                label="Prénom - Nom"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', py: 1 }}>
              <LocalPhone sx={{ mr: 1, my: 0.5, color: '#4caf50' }} />
              <TextField
                type='tel'
                color='success'
                label="06."
                variant="standard"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <AlternateEmailIcon sx={{ mr: 1, my: 0.5, color: '#4caf50' }} />
              <TextField
                type='email'
                color='success'
                label="Votre Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', py: 1.5, justifyContent: 'center' }}>
              <ChecklistIcon sx={{ mr: 1, my: 0.5, color: '#4caf50' }} />
              <FormControl>
                <InputLabel color='success'>Votre réplique</InputLabel>
                <Select
                  sx={{ width: 190 }}
                  color='success'
                  variant='standard'
                  value={replica}
                  onChange={(e) => setReplica(e.target.value)}
                  required
                >
                  <MenuItem value="Aucune">Aucune</MenuItem>
                  <MenuItem value="Compacte">Compacte</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Distance">Distance</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', py: 1, justifyContent: 'center' }}>
              <PasswordIcon sx={{ mr: 1, my: 0.5, color: '#4caf50' }}/>
              <TextField
                type='password'
                color='success'
                label="Mot de passe"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', py: 1, justifyContent: 'center' }}>
              <GppGoodIcon sx={{ mr: 1, my: 0.5, color: '#4caf50' }}/>
              <TextField
                type='password'
                color='success'
                label="Confirmer le mot de passe"
                variant="standard"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2, gap: 1.5 }}>
              <Button variant='contained' color='success' type='submit'>
                Soumettre
              </Button>
              <Button variant='contained' color='success' href='/connexion'>
                Retour
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signup;
