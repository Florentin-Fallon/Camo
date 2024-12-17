import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import itemData from "./Image.json";
import Header from "../NavBar/Header";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function EventDetail() {
  const { id } = useParams();
  const event = itemData.find((item) => item.id === parseInt(id));

  if (!event) {
    return (
      <Container sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4" color="error">
          Événement non trouvé
        </Typography>
      </Container>
    );
  }

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          sx={{ bgcolor: "transparent", color: "black", mt: 2, ml: 2 }}
          href="/souvenir"
        >
          <ArrowBackIosNewIcon fontSize="small" sx={{ pr: 1 }} />
          Retour
        </Button>
      </Box>
      <Container sx={{ marginTop: "30px" }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginBottom: 3,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.5rem" },
          }}
        >
          Photos de l'événement
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageList
            variant="masonry"
            cols={3}
            gap={8}
            sx={{
              width: { xs: 350, sm: 700, md: 950 },
              height: { xs: 500, sm: 900, md: 550 },
            }}
          >
            {event.photos.map((photo, index) => (
              <ImageListItem key={index}>
                <img
                  src={photo}
                  alt={`photo-${index}`}
                  loading="lazy"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </Box>
  );
}

export default EventDetail;
