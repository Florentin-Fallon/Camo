import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function PartnerCarousel() {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/partenaires');
        if (!response.ok) {
          throw new Error('Réponse non valide de l\'API');
        }
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des partenaires', error);
      }
    };

    fetchPartners();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{mx: 4, mb: 15 }}>
      <Typography variant="h4" sx={{ mb: 10, textAlign: 'center' }}>
        Nos Partenaires
      </Typography>

      <Slider {...settings}>
        {partners.length > 0 ? (
          partners.map((partner) => (
            <Box key={partner._id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ width: 300, boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  alt={partner.name}
                  image={partner.imgSrc || "https://via.placeholder.com/150"}
                  sx={{ height: 180, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {partner.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {partner.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                  <Button variant='contained'><Link to={partner.link} style={{ textDecoration: 'none', color: 'inherit' }}>Voir +</Link></Button>
                </CardActions>
              </Card>
            </Box>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Aucun partenaire disponible pour le moment.
          </Typography>
        )}
      </Slider>
    </Box>
  );
}

export default PartnerCarousel;
