import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

function Calendrier() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [timeD, setTimeD] = useState("");
  const [timeF, setTimeF] = useState("");
  const [events, setEvents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://neversoft-back.onrender.com/event"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newEvent = { name, date, timeD, timeF };
      await axios.post("https://neversoft-back.onrender.com/event", newEvent);
      setName("");
      setTimeD("");
      setTimeF("");
      setSnackbar({
        open: true,
        message: `Nouveau événement '${name}' !`,
        severity: "success",
      });

      const updatedEvents = await axios.get(
        "https://neversoft-back.onrender.com/event"
      );
      setEvents(updatedEvents.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Erreur lors de l'ajout de l'événement",
        severity: "error",
      });
      console.error("Erreur lors de l'ajout de l'événement :", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return "Date invalide";
    }
    const options = { weekday: "short", day: "numeric", month: "short" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", options).format(date);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://neversoft-back.onrender.com/event/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      setSnackbar({
        open: true,
        message: "Événement supprimé avec succès",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Erreur lors de la suppression de l'événement",
        severity: "error",
      });
      console.error("Erreur lors de la suppression de l'événement :", error);
    }
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const eventColors = {
    Entrainement: "#4caf50",
    Match: "#ff9800",
    Tournoi: "#9c27b0",
    Réunion: "#f21832",
    Aucune: "#b0bec5",
  };

  return (
    <Box
      sx={{
        background:
          'url("https://images.unsplash.com/photo-1501244686579-97d04b498199?q=80&w=2070&auto=format&fit=crop") no-repeat center center/cover',
        backgroundColor: "#f0f0f0",
        minHeight: "92vh",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, md: 10 },
          my: 5,
          boxShadow: 5,
          borderRadius: 5,
          mx: { md: 10 },
          bgcolor: "white",
          py: { xs: 4, md: 5 },
          p: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: "black",
              textAlign: "center",
              fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.5rem" },
            }}
          >
            Vous retrouverez ici nos événements !
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                type="date"
                variant="outlined"
                color="success"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <FormControl>
                <InputLabel color="success">Type</InputLabel>
                <Select
                  variant="outlined"
                  color="success"
                  label="Type"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <MenuItem
                    value="Aucune"
                    sx={{ borderLeft: `4px solid ${"#b0bec5"}` }}
                  >
                    Aucune
                  </MenuItem>
                  <MenuItem
                    value="Entrainement"
                    sx={{ borderLeft: `4px solid #4caf50` }}
                  >
                    Entrainement
                  </MenuItem>
                  <MenuItem
                    value="Match"
                    sx={{ borderLeft: `4px solid #ff9800` }}
                  >
                    Match
                  </MenuItem>
                  <MenuItem
                    value="Tournoi"
                    sx={{ borderLeft: `4px solid #9c27b0` }}
                  >
                    Tournoi
                  </MenuItem>
                  <MenuItem
                    value="Réunion"
                    sx={{ borderLeft: `4px solid #f21832` }}
                  >
                    Réunion
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="time"
                variant="outlined"
                color="success"
                value={timeD}
                onChange={(e) => setTimeD(e.target.value)}
              />
              <TextField
                type="time"
                variant="outlined"
                color="success"
                value={timeF}
                onChange={(e) => setTimeF(e.target.value)}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button sx={{ mt: 1, px: 5 }} type="submit">
                  Ajouter
                </Button>
              </Box>
            </Box>
          </form>
        </Box>

        <Divider
          orientation={"vertical"}
          flexItem
          sx={{ display: { md: "block" } }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.5rem" },
              mb: 2,
            }}
          >
            Nos événements
          </Typography>
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr" },
              maxHeight: "400px",
              gap: { xs: 2, sm: 2, md: 2 },
              mt: 2,
              p: 2,
              overflowY: "auto",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#728996",
              },
            }}
          >
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event, index) => (
                <Card
                  key={index}
                  sx={{
                    width: { xs: 200, sm: 200, md: 200 },
                    bgcolor: "#fff",
                    color: "text.primary",
                    borderLeft: `4px solid ${eventColors[event.name] || "#b0bec5"}`,
                    borderRadius: 2,
                    boxShadow: 4,
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                    },
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ color: "text.secondary", fontSize: 12 }}
                      variant="body2"
                    >
                      {formatDate(
                        event.date || new Date().toISOString().split("T")[0]
                      )}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: eventColors[event.name] || "white",
                      }}
                    >
                      {event.name}
                    </Typography>
                    <Typography variant="body2">
                      {event.timeD} - {event.timeF}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      sx={{ bgcolor: "#fff" }}
                      onClick={() => handleDelete(event._id)}
                    >
                      <DeleteIcon
                        sx={{ "&:hover": { color: "#ff1744" }, color: "black" }}
                        fontSize="small"
                      />
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <Box>
                <Typography>Aucun événement pour le moment.</Typography>
              </Box>
            )}
          </Box>
        </Box>

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
    </Box>
  );
}

export default Calendrier;
