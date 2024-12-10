import { Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { setUsers} from '../../Reducer/UserReducer';
import Box from '@mui/material/Box';
import axios from 'axios';

function UsersTab() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      if (Array.isArray(response.data)) {
        const normalizedUsers = response.data.map((user) => ({
          ...user,
          id: user._id,
        }));
        dispatch(setUsers(normalizedUsers));
      } else {
        console.error('La réponse de l\'API n\'est pas un tableau:', response.data);
        setSnackbar({ open: true, message: 'Erreur: la réponse API n\'est pas un tableau.', severity: 'error' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      setSnackbar({ open: true, message: 'Erreur lors de la récupération des utilisateurs.', severity: 'error' });
    }
  }, [dispatch]);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, fetchUsers, users.length, users]);

  const blurNumber = (number) => {
    const blurredNumber = number.slice(0,4) + '*'.repeat(number.length-4);
    return blurredNumber;
  };
  return (
    <TableContainer sx={{ boxShadow: 3 }} component={Paper}>
      <Typography variant="h5">Nos Membres</Typography>
      <Box sx={{ my: 3 }}></Box>
      <Table>
        <TableHead sx={{ backgroundColor: '#728996' }}>
          <TableRow>
          <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold',letterSpacing: 0.5 }}>Rôle</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold',letterSpacing: 0.5 }}>Prénom</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold',letterSpacing: 0.5 }}>Nom</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold',letterSpacing: 0.5 }}>Téléphone</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold',letterSpacing: 0.5 }}>Email</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold',letterSpacing: 0.5 }}>Réplique</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {Array.isArray(users) && users.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5} align="center">Aucun utilisateur trouvé.</TableCell>
    </TableRow>
  ) : (
    Array.isArray(users) && users.map((user) => (
      <TableRow key={user._id}>
        <TableCell align="center"><span style={{backgroundColor: user.role === "Admin" ? "#e53935" : user.role === "Swifteur" ? "#ffa726" : user.role === "Vice-Président" ? "#0d47a1" : user.role === "Trésoriere" ? "#f06292" : "#e0e0e0",color: 'white', padding: 4, borderRadius: 5, fontSize: "0.6rem",}}>{user.role}</span></TableCell>
        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          <Typography aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={(event) => handlePopoverOpen(event, user)} onMouseLeave={handlePopoverClose}>
            {user.firstname}
          </Typography>
        </TableCell>
        <TableCell align="center">{user.lastname}</TableCell>
        <TableCell align="center">{blurNumber(user.number)}</TableCell>
        <TableCell align="center">{blurNumber(user.email)}</TableCell>
        <TableCell align="center">{user.replica}</TableCell>
      </TableRow>
    ))
  )}
</TableBody>
      </Table>
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
    </TableContainer>
  );
}

export default UsersTab;
