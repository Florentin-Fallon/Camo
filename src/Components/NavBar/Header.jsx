import { Box, Typography, IconButton, Menu, MenuItem, Divider, Snackbar, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { jwtDecode } from 'jwt-decode'; 

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsAuthenticated(true);
        const decodedToken = jwtDecode(token);
        const fullName = `${decodedToken.firstname} ${decodedToken.lastname}`;
        setUserName(fullName);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose()
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setSnackbar({ open: true, message: 'Déconnexion réussie', severity: 'success' });
    setTimeout(() => navigate('/connexion'), 1500);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, backgroundColor: '#fff', justifyContent: isAuthenticated ? 'space-between' : 'flex-end', boxShadow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: 3 }}>
        <Typography color='primary' sx={{ '&:hover': { color: '#728996' } }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Accueil</Link>
        </Typography>
        <Typography color='primary' sx={{ '&:hover': { color: '#728996' } }}>
          <Link to="/membres" style={{ textDecoration: 'none', color: 'inherit' }}>Membres</Link>
        </Typography>
        <Typography color='primary' sx={{ '&:hover': { color: '#728996' } }}>
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
        </Typography>
      </Box>
      {isAuthenticated ? (
        <IconButton color="primary" onClick={handleMenuOpen} size="large" sx={{ marginLeft: 'auto' }}>
          <AccountCircleIcon fontSize='large' sx={{ '&:hover': { color: '#728996' } }} />
        </IconButton>
      ) : (
        <Box sx={{ width: 56, height: 56, marginLeft: 'auto' }}/>
      )
    
    }
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl && isAuthenticated)} onClose={handleMenuClose} sx={{ '& .MuiPaper-root': { marginRight: '20px', borderRadius: 5, minWidth: 200 } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5, color: '#212121' }}>
          <img src='https://cdn.pixabay.com/photo/2013/07/12/15/55/laurel-wreath-150577_1280.png' alt='Neversoft' style={{ width: 50, height: 45 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginTop: 1, textDecoration: 'none', color: 'inherit' }}>
            {userName ? userName : 'Chargement...'}
          </Typography>
        </MenuItem>
        <Divider sx={{ marginY: 1 }} />
        <MenuItem component={Link} to="/contact" 
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <QuestionMarkIcon fontSize="small" sx={{ color: '#4caf50' }} />
          <Typography variant="body2" color="textPrimary">Aide</Typography>
        </MenuItem>
        <Divider sx={{ marginY: 1 }} />
        <MenuItem onClick={handleLogout}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <LogoutIcon fontSize="small" sx={{ color: '#d50000' }} />
          <Typography variant="body2" color="textPrimary">Déconnexion</Typography>
        </MenuItem>
      </Menu>
      <Snackbar open={snackbar.open} autoHideDuration={1000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }} >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Header;
