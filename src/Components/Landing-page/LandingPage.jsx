import React from 'react'
import { Box, Typography } from '@mui/material'

function LandingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2019/11/27/04/59/nature-4656054_1280.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant='h3' sx={{ mb: 2 }}>
        Bienvenue chez Neversoft
      </Typography>
      <Typography variant='h6' sx={{ maxWidth: 600 }}>
        Unis par la passion, guidés par l'adrénaline
      </Typography>
    </Box>
  )
}

export default LandingPage
