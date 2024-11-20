import { Button, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { setUsers, deleteUser } from '../../Reducer/UserReducer';
import Box from '@mui/material/Box';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Popover from '@mui/material/Popover';

function UsersTab() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);

  const handlePopoverOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setHoveredUser(user)
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredUser(null)
  };

  const open = Boolean(anchorEl);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const normalizedUsers = response.data.map((user) => ({
        ...user,
        id: user._id,
      }));
      dispatch(setUsers(normalizedUsers));
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      setSnackbar({ open: true, message: 'Erreur lors de la récupération des utilisateurs.', severity: 'error' });
    }
  }, [dispatch]);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, fetchUsers, users.length]);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/delete/${id}`);
        if (response.status === 200) {
          dispatch(deleteUser(id));
          setSnackbar({ open: true, message: 'Utilisateur supprimé avec succès.', severity: 'success' });
        } else {
          throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        setSnackbar({ open: true, message: 'Erreur lors de la suppression de l\'utilisateur.', severity: 'error' });
      }
    }
  };

  const blurNumber = (number) => {
    const blurredNumber = number.replace(/\d(?=\d{4})/g, '*');
    return blurredNumber;
  };

  return (
    <TableContainer sx={{ my: 5, boxShadow: 3 }} component={Paper}>
      <Typography variant="h5">Les Membres</Typography>
      <Box sx={{ my: 3 }}></Box>
      <Table>
        <TableHead sx={{ backgroundColor: '#81c784' }}>
          <TableRow>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Prénom</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Nom</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Téléphone</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Réplique</TableCell>
            <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">Aucun utilisateur trouvé.</TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                  <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={(event) => handlePopoverOpen(event, user)}
                    onMouseLeave={handlePopoverClose}
                  >
                    {user.firstname}
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    sx={{ pointerEvents: 'none'}}
                    open={open && hoveredUser?._id === user._id}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{backgroundColor: user.role === 'Admin' ? "#ff5252" : "#ffa726", color: "#fff", padding: "2px 8px", borderRadius: "12px", fontSize: "0.8rem" }}>{user.role}</Typography>
                  </Popover>
                </TableCell>
                <TableCell align="center">{user.lastname}</TableCell>
                <TableCell align="center">{blurNumber(user.number)}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.replica}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDelete(user._id)}>
                    <DeleteIcon color='error' />
                  </Button>
                </TableCell>
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
