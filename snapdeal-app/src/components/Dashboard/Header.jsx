import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useNavigate } from "react-router";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{ backgroundColor: "#c6003d", color: "#fff", py: 0.5 }}>
        <Grid
          size={{ xs: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}>
          India’s Leading Online Shopping Destination
        </Grid>

        <Grid
          size={{ xs: 6 }}
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Typography variant="body2">Our Blog</Typography>
          <Typography variant="body2">Help Center</Typography>
          <Typography variant="body2">Sell On Snapdeal</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PhoneIphoneIcon fontSize="small" />
            <Typography variant="body2">Download App</Typography>
          </Box>
        </Grid>
      </Grid>

      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#e40046", boxShadow: "none", top: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://i1.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg"
              alt="Snapdeal"
              style={{ height: 35 }}
            />
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 1,
              width: "50%",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              mx: 2,
            }}>
            <InputBase
              placeholder="Search products & brands"
              sx={{
                flex: 1,
                ml: 1,
                fontSize: 14,
              }}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                borderRadius: 0,
                backgroundColor: "#333",
                color: "#fff",
                boxShadow: "none",
                px: 2,
                "&:hover": {
                  backgroundColor: "#111",
                },
              }}>
              Search
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}>
              <ShoppingCartIcon sx={{ color: "#f3eff0ff" }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Cart
              </Typography>
            </Box>

            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
                onClick={() => setOpen((prev) => !prev)}>
                <PersonIcon />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Sign In
                </Typography>
              </Box>

              {open && (
                <Paper
                  elevation={3}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    mt: 1,
                    width: 230,
                    p: 2,
                    bgcolor: "#2c2c2c",
                    color: "white",
                    borderRadius: 1,
                    zIndex: 10,
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1,
                      cursor: "pointer",
                    }}>
                    <AccountCircleOutlinedIcon fontSize="small" />
                    <Typography variant="body2">Your Account</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2,
                      cursor: "pointer",
                    }}>
                    <Inventory2OutlinedIcon fontSize="small" />
                    <Typography variant="body2">Your Orders</Typography>
                  </Box>

                  <Divider
                    sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }}
                  />

                  <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 1, opacity: 0.8 }}>
                    If you are a new user
                  </Typography>
                  <Typography
                    variant="body2"
                    onClick={() => navigate("/register")}
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      cursor: "pointer",
                      color: "#ff4081",
                    }}>
                    Register
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/login")}
                    sx={{
                      bgcolor: "#ff0059",
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#e60050" },
                    }}>
                    LOGIN
                  </Button>
                </Paper>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
