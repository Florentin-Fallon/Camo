import { Typography, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import React from 'react';

function InfosCard({
    imgsrc,
    title,
    paragraph,
    link
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
      <Card
        sx={{
          maxWidth: 900,
          boxShadow: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 5,
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
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 2,
            textAlign: 'center',
          }}
        >
          <Typography gutterBottom variant="h5" sx={{ paddingBottom: 3 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'left', paddingBottom: 3 }}>
            {paragraph}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button sx={{ mt: 2, width: 200, bgcolor: '#728996' }} variant="contained" href={link}>
              Rejoignez-nous !
            </Button>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            width: 400,
            height: 400,
          }}
          image={imgsrc}
        />
      </Card>
    </Box>
  );
}

export default InfosCard;
