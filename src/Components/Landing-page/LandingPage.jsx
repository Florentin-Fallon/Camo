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
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2023/10/14/09/20/mountains-8314422_1280.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        color: 'black',
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
