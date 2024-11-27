import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

function ReseauxCard() {
  return (
    <Box sx={{my: 4}}>
      <Typography>Retrouver nous sur Instagram !</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
      <Card
        sx={{
            boxShadow: 3,
            backgroundColor: '#f5f5f5',
            borderRadius: 5,
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"
            }
        }}
      >
          <CardMedia component="img" sx={{width: 400,height: 400,}} image="https://images.unsplash.com/photo-1666873584465-7639d1c9e1f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 5,
            textAlign: 'center',
          }}
        >
          <Typography gutterBottom variant="h5" sx={{ paddingBottom: 3, fontWeight: 700 }}>
            Neversoft
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'center', paddingBottom: 3 }}>
          Retrouver nous sur Instagram !
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button sx={{ mt: 2, width: 200, bgcolor: '#728996' }} variant="contained" href="https://mui.com/material-ui/material-icons/?query=insta&selected=Instagram">
              Rejoignez-nous !
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </Box>
  )
}

export default ReseauxCard
