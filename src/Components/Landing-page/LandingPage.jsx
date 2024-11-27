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
        backgroundImage: 'url("https://images.unsplash.com/photo-1689251713606-fbbee3225ae6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
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
