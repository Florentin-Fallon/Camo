import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

function ReseauxCard({ title, description, image, link, bgColor }) {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Card
          sx={{
            Width: 500,
            display: 'flex',
            flexDirection: 'row',
            boxShadow: 4,
            backgroundColor: bgColor || '#1e1e2f',
            borderRadius: 3,
            overflow: 'hidden',
            transition: 'transform 0.4s, box-shadow 0.4s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              p: 4,
              color: '#fff',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: '#fff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: '#ff4081',
                ':hover': { bgcolor: '#e63670' },
                px: 4,
                py: 1,
                boxShadow: '0 4px 12px rgba(255, 64, 129, 0.5)',
                transition: 'all 0.3s ease',
              }}
              href={link}
              target="_blank"
            >
              Suivez nous !
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: 400,
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(0.2) contrast(1.2)',
              transition: 'filter 0.4s',
              '&:hover': {
                filter: 'grayscale(0) contrast(1.4)',
              },
            }}
          />
        </Card>
      </Box>
    </Box>
  );
}

export default ReseauxCard;
