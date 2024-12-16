import React from "react";
import { Box, Typography } from "@mui/material";

function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1689251713606-fbbee3225ae6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 2,
          fontSize: { xs: "2rem", sm: "3rem", md: "3rem" },
        }}
      >
        Bienvenue chez Neversoft
      </Typography>
      <Typography
        variant="h6"
        sx={{
          maxWidth: { xs: "90%", sm: "80%", md: 600 },
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1rem" },
          lineHeight: 1.5,
        }}
      >
        Unis par la passion, guidés par l'adrénaline
      </Typography>
    </Box>
  );
}

export default LandingPage;
