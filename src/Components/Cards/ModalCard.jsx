import React, { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 3,
  borderRadius: 5,
};

function ReplicasBanner() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  const handleOpen = (type) => {
    let content;
    switch (type) {
      case "compacte":
        content = {
          title: "Réplique Compacte",
          description:
            "Les répliques compactes sont petites et légères, idéales pour les environnements urbains ou les combats rapprochés. Elles sont faciles à manier dans des espaces restreints, comme les bâtiments ou la végétation dense.",
        };
        break;
      case "standard":
        content = {
          title: "Réplique Standard",
          description:
            "Les répliques standard sont polyvalentes et conviennent à la plupart des situations. Elles offrent un bon équilibre entre portée, précision et maniabilité, ce qui les rend idéales pour les terrains variés et les joueurs débutants qui recherchent de la flexibilité.",
        };
        break;
      case "distance":
        content = {
          title: "Réplique Longue Distance",
          description:
            "Les répliques longue distance sont parfaites pour les engagements à grande portée, comme en forêt ou en terrain ouvert. Elles sont conçues pour une meilleure précision et une portée plus longue, idéales pour les joueurs qui préfèrent rester à distance et soutenir leur équipe.",
        };
        break;
      default:
        content = { title: "", description: "" };
    }
    setModalContent(content);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        textAlign: "center",
        boxShadow: 1,
        mb: 5,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Découvrez les Types de Répliques
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 3 }}>
        Choisissez une réplique adaptée à votre style de jeu !
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#f57c00" }}
          onClick={() => handleOpen("compacte")}
        >
          Compacte
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#f57c00" }}
          onClick={() => handleOpen("standard")}
        >
          Standard
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#f57c00" }}
          onClick={() => handleOpen("distance")}
        >
          Longue Distance
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon
              onClick={handleClose}
              sx={{ color: "#f44336", cursor: "pointer" }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {modalContent.title}
          </Typography>
          <Typography variant="body1">{modalContent.description}</Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default ReplicasBanner;
