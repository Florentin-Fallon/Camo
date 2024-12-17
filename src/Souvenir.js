import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "./Components/NavBar/Header";
import StandardImageList from "./Components/Carousel/StandardImageList";

function Souvenir() {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          textAlign: "center",
          pt: 4,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1.2rem", sm: "2rem", md: "2rem" },
            fontWeight: "bold",
            color: "#333",
            mb: 1,
          }}
        >
          Vivez l'action avec nous !
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: { xs: "0.8rem", sm: "1.2rem" }, color: "#666" }}
        >
          Retrouvez nos photos de tous nos moments inoubliables.
        </Typography>
      </Box>
      <Box>
        <StandardImageList />
      </Box>
    </Box>
  );
}

export default Souvenir;
