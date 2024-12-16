import { Box, Typography, Divider, IconButton } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
        Neversoft
      </Typography>
      <Divider sx={{ width: { xs: "50%", sm: "6%" }, mb: 1 }} />
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        Simplifiez votre expérience d’airsoft
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <IconButton
          href="https://www.instagram.com/votre_compte/"
          target="_blank"
          sx={{ color: "#E1306C", fontSize: { xs: 24, sm: 28 } }}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </IconButton>
        <IconButton
          href="https://discord.com/invite/votre_invitation"
          target="_blank"
          sx={{ color: "#5865F2", fontSize: { xs: 24, sm: 28 } }}
        >
          <FontAwesomeIcon icon={faDiscord} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
