import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Box,
  Tooltip,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(token);
      const fullName = `${decodedToken.firstname} ${decodedToken.lastname}`;
      setUserName(fullName);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setSnackbar({
      open: true,
      message: "Déconnexion réussie",
      severity: "success",
    });
    setTimeout(() => navigate("/connexion"), 1500);
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
              "&:hover": { color: "#728996" },
            }}
          >
            Neversoft
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              component={Link}
              to="/"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                color: "inherit",
                textDecoration: "none",
                alignItems: "center",
                p: 1.5,
                "&:hover": { color: "#728996" },
              }}
            >
              Neversoft
            </Typography>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem
                component={Link}
                to="/"
                onClick={handleCloseNavMenu}
                sx={{ px: 4 }}
              >
                Accueil
              </MenuItem>
              <Divider variant="middle" sx={{ marginY: 1 }} />
              <MenuItem
                component={Link}
                to="/membres"
                onClick={handleCloseNavMenu}
                sx={{ px: 4 }}
              >
                Membres
              </MenuItem>
              <Divider variant="middle" sx={{ marginY: 1 }} />
              <MenuItem
                component={Link}
                to="/boutique"
                onClick={handleCloseNavMenu}
                sx={{ px: 4 }}
              >
                Boutique
              </MenuItem>
              <Divider variant="middle" sx={{ marginY: 1 }} />
              <MenuItem
                component={Link}
                to="/souvenir"
                onClick={handleCloseNavMenu}
                sx={{ px: 4 }}
              >
                Souvenir
              </MenuItem>
              <Divider variant="middle" sx={{ marginY: 1 }} />
              <MenuItem
                component={Link}
                to="/contact"
                onClick={handleCloseNavMenu}
                sx={{ px: 4 }}
              >
                Contact
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Typography
              component={Link}
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "#728996" },
              }}
            >
              Accueil
            </Typography>
            <Typography
              component={Link}
              to="/membres"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "#728996" },
              }}
            >
              Membres
            </Typography>
            <Typography
              component={Link}
              to="/boutique"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "#728996" },
              }}
            >
              Boutique
            </Typography>
            <Typography
              component={Link}
              to="/souvenir"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "#728996" },
              }}
            >
              Souvenir
            </Typography>
            <Typography
              component={Link}
              to="/contact"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "#728996" },
              }}
            >
              Contact
            </Typography>
          </Box>
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Paramètre">
                <IconButton
                  color="primary"
                  onClick={handleOpenUserMenu}
                  sx={{ pr: 1 }}
                >
                  <AccountCircleIcon
                    sx={{ "&:hover": { color: "#728996" } }}
                    fontSize="large"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  "& .MuiPaper-root": {
                    marginRight: "20px",
                    borderRadius: 5,
                    minWidth: 200,
                  },
                }}
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 0.5,
                    color: "#212121",
                  }}
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2013/07/12/15/55/laurel-wreath-150577_1280.png"
                    alt="Neversoft"
                    style={{ width: 50, height: 45 }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: "bold",
                      marginTop: 1,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {userName ? userName : "Chargement..."}
                  </Typography>
                </MenuItem>
                <Divider sx={{ marginY: 1 }} />
                <MenuItem
                  component={Link}
                  to="/profil"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                  onClick={handleCloseUserMenu}
                >
                  <SettingsIcon fontSize="small" sx={{ color: "#728996" }} />
                  <Typography variant="body2" color="textPrimary">
                    Profil
                  </Typography>
                </MenuItem>
                <Divider sx={{ marginY: 1 }} />
                <MenuItem
                  component={Link}
                  to="/evenement"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                  onClick={handleCloseUserMenu}
                >
                  <CalendarMonthIcon
                    fontSize="small"
                    sx={{ color: "#728996" }}
                  />
                  <Typography variant="body2" color="textPrimary">
                    Événements
                  </Typography>
                </MenuItem>
                <Divider sx={{ marginY: 1 }} />
                <MenuItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                  onClick={handleLogout}
                >
                  <LogoutIcon fontSize="small" sx={{ color: "#d50000" }} />
                  <Typography variant="body2" color="textPrimary">
                    Déconnexion
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}

export default Header;
