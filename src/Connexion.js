import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://neversoft-back.onrender.com/connexion",
        { email, password }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setSnackbar({
          open: true,
          message: "Connexion réussie",
          severity: "success",
        });
        navigate("/");
      } else {
        throw new Error("Erreur de connexion");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Erreur lors de la connexion",
        severity: "error",
      });
      console.error("Erreur:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundSize: "cover",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1666873584465-7639d1c9e1f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <Card
        sx={{
          maxWidth: { xs: 250, sm: 300 },
          minWidth: { xs: 250, sm: 300 },
          padding: 3,
          boxShadow: 3,
          borderRadius: 5,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "regular", fontFamily: "Roboto" }}
            gutterBottom
          >
            Connexion
          </Typography>
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                mb: 2,
                py: 1.5,
                width: "100%",
              }}
            >
              <AlternateEmailIcon sx={{ mr: 1, my: 0.5, color: "#4caf50" }} />
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
                alignItems: "flex-end",
                justifyContent: "center",
                mb: 2,
                width: "100%",
              }}
            >
              <PasswordIcon sx={{ mr: 1, my: 0.5, color: "#4caf50" }} />
              <TextField
                label="Mot de passe"
                variant="standard"
                type="password"
                color="success"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ my: 2, width: "100%" }}>
              <Button
                sx={{
                  mb: 2,
                  bgcolor: "#728996",
                  "&:hover": { bgcolor: "#607080" },
                  width: "100%",
                }}
                variant="contained"
                type="submit"
              >
                Se connecter
              </Button>
              <Button
                sx={{
                  bgcolor: "#4caf50",
                  "&:hover": { bgcolor: "#388e3c" },
                  width: "100%",
                }}
                variant="contained"
                href="/signup"
              >
                S'inscrire
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Connexion;
