import { Box, Typography, Grid, Card, CardContent, CardMedia, Modal} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '80%', sm: '80%', md: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 3, md: 5 },
  borderRadius: 5
};

function GamesCard() {
  const [open, setOpen] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState(null);
  const [games, setGames] = useState([]);

  const handleOpen = (game) => {
    setSelectedGame(game);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedGame(null);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://neversoft-back.onrender.com/gamesmode');
        if (!response.ok) {
          throw new Error('Réponse non valide de l\'API');
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des mode de jeux', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <Box>
      <Grid container spacing={4} justifyContent="center">
        {games.length > 0 ? (
          games.map((game) => (
          <Grid item key={game.id} xs={12} md={4}>
            <Card
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s", cursor: 'pointer',borderRadius: 5,
                "&:hover": { transform: "scale(1.03)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)" }
              }}
              onClick={() => handleOpen(game)}
            >
              <CardMedia
                component="img"
                height="200"
                image={game.img || "https://via.placeholder.com/150"}
                alt={game.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, textAlign: "center" }}>
                  {game.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 2 }}>
            Aucun mode de jeux disponible pour le moment.
          </Typography>
      )}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="game-modal-title"
        aria-describedby="game-modal-description"
      >
        <Box sx={style}>
        <FontAwesomeIcon icon={faSkull} size='2x' style={{cursor: 'pointer', }} onMouseEnter={(e) => e.target.style.color = 'red'} onClick={handleClose}/>
          <Typography id="game-modal-title" variant="h5" component="h2" sx={{fontWeight: 700, textTransform: 'capitalize',fontFamily: 'Protest Revolution', letterSpacing: 2,fontSize: { xs: '1rem', sm: '1.5rem', md: '1.5rem' }, pt: 2}}>
            {selectedGame?.name}
          </Typography>
          <Typography id="game-modal-description" sx={{ my: 3, textAlign: 'center', letterSpacing: 1,fontSize: { xs: '0.8rem', sm: '1rem', md: '1rem' } }} variant='body1' color='text.secondary'>
            {selectedGame?.description}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default GamesCard;
