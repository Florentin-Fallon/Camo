import { Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { setUsers } from "../../Reducer/UserReducer";
import axios from "axios";

function UsersTab() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://neversoft-back.onrender.com/users"
      );
      if (Array.isArray(response.data)) {
        const normalizedUsers = response.data.map((user) => ({
          ...user,
          id: user._id,
        }));
        dispatch(setUsers(normalizedUsers));
      } else {
        console.error(
          "La réponse de l'API n'est pas un tableau:",
          response.data
        );
        setSnackbar({
          open: true,
          message: "Erreur: la réponse API n'est pas un tableau.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setSnackbar({
        open: true,
        message: "Erreur lors de la récupération des utilisateurs.",
        severity: "error",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, fetchUsers, users.length, users]);

  const blurNumber = (number) => {
    const blurredNumber = number.slice(0, 4) + "*".repeat(number.length - 4);
    return blurredNumber;
  };

  const roleColors = {
    Admin: "#e53935",
    Swifteur: "#ffa726",
    "Vice-Président": "#0d47a1",
    Trésoriere: "#f06292",
    default: "#e0e0e0",
  };

  return (
    <TableContainer
      sx={{ boxShadow: 3, maxWidth: "100%", overflowX: "auto" }}
      component={Paper}
    >
      <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
        Nos Membres
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: "#728996" }}>
          <TableRow>
            {["Rôle", "Prénom", "Nom", "Téléphone", "Email", "Réplique"].map(
              (header) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{ color: "#fff", fontWeight: "bold", letterSpacing: 0.5 }}
                >
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(users) && users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          ) : (
            Array.isArray(users) &&
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center">
                  <span
                    style={{
                      backgroundColor:
                        roleColors[user.role] || roleColors.default,
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 5,
                      fontSize: "0.8rem",
                    }}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                  {user.firstname}
                </TableCell>
                <TableCell align="center">{user.lastname}</TableCell>
                <TableCell align="center">{blurNumber(user.number)}</TableCell>
                <TableCell align="center">{blurNumber(user.email)}</TableCell>
                <TableCell align="center">{user.replica}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
}

export default UsersTab;
