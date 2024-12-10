import React from 'react';
import Header from './Components/NavBar/Header';
import { Box } from '@mui/material';
import Calendrier from './Components/Cards/Calendrier';

function Evenement() {
  return (
    <Box>
      <Header />
      <Calendrier />
    </Box>
  );
}

export default Evenement;
