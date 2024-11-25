import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from './Components/NavBar/Header';
import Footer from './Components/NavBar/Footer';

function Boutique() {
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

  const categories = ['Répliques', 'Tenues', 'Consommables'];

  return (
    <div>
      <Header />
      <Box sx={{ backgroundColor: '#728996', p: 2, color: 'white' }}>
        <Typography sx={{ mb: 1 }}>Code promo : <strong>SWIFT17</strong></Typography>
        <Typography sx={{ fontSize: 22 }}> -20% chez nos partenaires</Typography>
      </Box>

      {categories.map((category) => {
        const categoryPartners = partners.filter(partner => partner.category === category);

        return (
          <div key={category}>
            <Typography variant='h5' sx={{ my: 4 }}>{category}</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
              {categoryPartners.length > 0 ? (
                categoryPartners.map((partner) => (
                  <Box key={partner._id} sx={{ my: 4 }}>
                    <Card sx={{ width: 300, '&:hover': { transform: 'scale(1.05)', boxShadow: 3 }, transition: 'all 0.3s ease' }}>
                      <CardMedia
                        sx={{ height: 180 }}
                        component="img"
                        alt={partner.name}
                        image={partner.imgSrc || "https://via.placeholder.com/150"}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{partner.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{partner.description}</Typography>
                      </CardContent>
                      <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                        <Button variant="contained" size="small">
                          <a href={partner.link} style={{ textDecoration: 'none', color: 'inherit' }}>Y aller</a>
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                ))
              ) : (
                <Typography variant="h6">Aucun partenaire dans cette catégorie pour le moment.</Typography>
              )}
            </Box>
          </div>
        );
      })}

      <Footer />
    </div>
  );
}

export default Boutique;
