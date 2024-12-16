import React, { useState } from "react";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import LocalPhone from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PasswordIcon from "@mui/icons-material/Password";
import GppGoodIcon from "@mui/icons-material/GppGood";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [replica, setReplica] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Les mots de passe ne correspondent pas.",
        severity: "error",
      });
      return;
    }

    const newUser = {
      firstname,
      lastname,
      number,
      email,
      replica,
      password,
    };

    try {
      const response = await axios.post(
        "https://neversoft-back.onrender.com/signup",
        newUser
      );
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: `Bienvenue ${firstname} ${lastname} !`,
          severity: "success",
        });
        setTimeout(() => navigate("/connexion"), 1500);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erreur lors de l'inscription.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1599397976795-4f638f02a5ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3")',
        backgroundSize: "cover",
        padding: 2,
        overflowX: "hidden",
      }}
    >
      <Card
        sx={{
          width: { xs: "80%", sm: "40%", md: "20%", lg: "20%" },
          padding: 1,
          boxShadow: 3,
          borderRadius: 5,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            <img
              style={{ width: "80px", height: "70px" }}
              src="https://cdn.pixabay.com/photo/2013/07/12/15/55/laurel-wreath-150577_1280.png"
              alt="Neversoft"
            />
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <AccountCircle sx={{ mr: 1, color: "#4caf50" }} />
              <TextField
                label="Prénom"
                variant="standard"
                color="success"
                fullWidth
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <AccountCircle sx={{ mr: 1, color: "#4caf50" }} />
              <TextField
                label="Nom"
                variant="standard"
                color="success"
                fullWidth
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <LocalPhone sx={{ mr: 1, color: "#4caf50" }} />
              <TextField
                label="Téléphone"
                variant="standard"
                color="success"
                fullWidth
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <AlternateEmailIcon sx={{ mr: 1, color: "#4caf50" }} />
              <TextField
                label="Email"
                variant="standard"
                color="success"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <ChecklistIcon sx={{ mr: 1, color: "#4caf50" }} />
              <FormControl fullWidth>
                <InputLabel color="success">Votre réplique</InputLabel>
                <Select
                  value={replica}
                  onChange={(e) => setReplica(e.target.value)}
                  color="success"
                  variant="standard"
                >
                  <MenuItem value="Aucune">Aucune</MenuItem>
                  <MenuItem value="Compacte">Compacte</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Distance">Distance</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <PasswordIcon sx={{ mr: 1, color: "#4caf50" }} />
              <TextField
                label="Mot de passe"
                type="password"
                variant="standard"
                color="success"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <GppGoodIcon sx={{ mr: 1, color: "#4caf50" }} />
              <TextField
                label="Confirmer mot de passe"
                type="password"
                variant="standard"
                color="success"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 2,
                gap: 1.5,
              }}
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#728996" }}
                type="submit"
              >
                Soumettre
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#728996" }}
                href="/connexion"
              >
                Retour
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Signup;
