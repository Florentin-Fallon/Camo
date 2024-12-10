import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

function Calendrier() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [name, setName] = useState('');
  const [timeD, setTimeD] = useState('');
  const [timeF, setTimeF] = useState('');
  const [events, setEvents] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://neversoft-back.onrender.com/event');
        setEvents(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newEvent = { name, date, timeD, timeF };
      const response = await axios.post('https://neversoft-back.onrender.com/event', newEvent);
      setEvents([...events, response.data])
      setName('');
      setTimeD('');
      setTimeF('');
      setSnackbar({open: true, message: `Nouveau événement '${name}' !`, severity: 'success'})

      const updatedEvents = await axios.get('https://neversoft-back.onrender.com/event')
      setEvents(updatedEvents.data)
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.message || 'Erreur lors de l\'ajout de l\'événement', 
        severity: 'error' 
      })
      console.error('Erreur lors de l\'ajout de l\'événement :', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'Date invalide';
    }
    const options = {weekday: 'short', day: 'numeric', month: 'short'}
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', options).format(date)
  }

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://neversoft-back.onrender.com/event/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      setSnackbar({
        open: true,
        message: 'Événement supprimé avec succès',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Erreur lors de la suppression de l\'événement',
        severity: 'error',
      });
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  };

  return (
    <Box sx={{background: 'url("https://images.unsplash.com/photo-1501244686579-97d04b498199?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover', backgroundColor: '#f0f0f0', minHeight: '89.2vh'}}>
      <Typography variant="h5" sx={{ pt: 4,color: 'white' }}>
        Vous retrouverez ici nos événements !
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          my: 5,
          boxShadow: 5,
          borderRadius: 5,
          mx: 35,
          py: 2,
          bgcolor:'white'
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', my: 5, gap: 2, flexDirection: 'column' }}>
            <TextField
              type="date"
              variant="outlined"
              color="success"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <FormControl>
              <InputLabel color='success'>Type</InputLabel>
              <Select variant='outlined' color="success" value={name} onChange={(e) => setName(e.target.value)}>
                <MenuItem value="Aucune">Aucune</MenuItem>
                <MenuItem value="Entrainement">Entrainement</MenuItem>
                <MenuItem value="Match">Match</MenuItem>
                <MenuItem value="Tournoi">Tournoi</MenuItem>
                <MenuItem value="Réunion">Réunion</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="time"
              variant="outlined"
              color="success"
              value={timeD}
              onChange={(e) => setTimeD(e.target.value)}
            />
            <TextField
              type="time"
              variant="outlined"
              color="success"
              value={timeF}
              onChange={(e) => setTimeF(e.target.value)}
            />
            <Button sx={{mt: 1}} type="submit">
              Ajouter
            </Button>
          </Box>
        </form>
        <Divider orientation="vertical" flexItem />
        <Box sx={{mt: 2, p: 2, gap: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center', maxHeight: '400px', overflowY: 'auto',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#728996',
          },
        }}>
          <Typography variant="h6" sx={{ mb: 0.5, gridColumn: 'span 2' }}>
            Événements
          </Typography>
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event, index) => (
              <Card key={index} sx={{ p: 2, bgcolor: '#b0bec5', color: 'white' }}>
                <CardContent>
                  <Typography sx={{ color: 'text.secondary', fontSize: 12 }} variant="body2">
                  {formatDate(event.date || new Date().toISOString().split('T')[0])}
                  </Typography>
                  <Typography gutterBottom variant="h6" >
                    {event.name}
                  </Typography>
                  <Typography variant="body2" >
                    {event.timeD} - {event.timeF}
                  </Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Button sx={{bgcolor: '#b0bec5'}} onClick={() => handleDelete(event._id)}><DeleteIcon sx={{'&:hover': {color: '#ff1744'}}}/></Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Box>
              <Typography >Aucun événement pour le moment.</Typography>
            </Box>
          )}
        </Box>
        <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
        </Box>
    </Box>
  );
}

export default Calendrier;
