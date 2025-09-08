import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { fetchOtp } from "../Utills/commonUtills";

export default function LoginDialog() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState();
  const [error, setError] = useState("");

  const theme = useTheme();
  const onClose = () => {
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSubmit = async () => {
    if (!input || input.match(/[0-9]{10}/) === null) {
      setError("Please enter a valid input");
      return;
    }
    setError("");
    const response = await fetchOtp({ phone: input });
    localStorage.setItem("phone", input);
    if (!response.success) {
      setError("Login failed. Please try again.");
      return;
    }
    navigate("/otp");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      sx={{
        borderRadius: "16px",
        boxShadow: 8,
        overflow: "visible",
      }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 18,
          right: 18,
          zIndex: 2,
          bgcolor: "grey.100",
          boxShadow: 1,
          "&:hover": { bgcolor: "grey.200" },
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}>
          {/* Left info column */}
          <Box
            sx={{
              background: "linear-gradient(135deg,#f6f7fb 80%,#eaeffc 100%)",
              flex: 1,
              px: { xs: 4, md: 4 },
              py: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: { md: 294 },
              borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
              borderRight: { md: "1px solid #eee" },
              gap: 4,
            }}>
            <Box display="flex" alignItems="flex-start" gap={2}>
              {/* Pin icon circle */}
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: theme.palette.primary,
                  color: theme.palette.primary.main,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}>
                {/* Example location icon */}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle
                    cx="14"
                    cy="14"
                    r="12"
                    fill={theme.palette.primary.main}
                    opacity="0.15"
                  />
                  <path
                    d="M14 7a5 5 0 0 1 5 5c0 3.75-5 9-5 9s-5-5.25-5-9a5 5 0 0 1 5-5zm0 7a2 2 0 1 0 0.001-4.001A2 2 0 0 0 14 14z"
                    stroke={theme.palette.primary.main}
                    strokeWidth="1.5"
                  />
                </svg>
              </Box>
              <Box>
                <Typography fontWeight={700} fontSize="1.07rem">
                  MANAGE YOUR ORDERS
                </Typography>
                <Typography color="text.secondary" fontSize="0.97rem">
                  Track orders, manage cancellations & returns.
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="flex-start" gap={2}>
              {/* Bell icon circle */}
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: theme.palette.warning,
                  color: theme.palette.warning.main,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}>
                {/* Example bell icon */}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle
                    cx="14"
                    cy="14"
                    r="12"
                    fill={theme.palette.warning.main}
                    opacity="0.15"
                  />
                  <path
                    d="M14 20a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-5v-5c0-3.2-1.7-5.88-4.65-6.55V7c0-.83-.67-1.5-1.5-1.5S12 6.17 12 7v.45C8.93 8.12 7.25 10.8 7.25 14v5l-1.75 1.75a1 1 0 0 0 .7 1.75h14.6a1 1 0 0 0 .7-1.75L20 15z"
                    stroke={theme.palette.warning.main}
                    strokeWidth="1.5"
                  />
                </svg>
              </Box>
              <Box>
                <Typography fontWeight={700} fontSize="1.07rem">
                  AWESOME OFFERS UPDATES FOR YOU
                </Typography>
                <Typography color="text.secondary" fontSize="0.97rem">
                  Be first to know about great offers and save.
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Right form column */}
          <Box
            sx={{
              flex: 1.15,
              px: { xs: 4, md: 6 },
              py: { xs: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "background.paper",
              minWidth: { md: 310 },
              borderRadius: { xs: "0 0 16px 16px", md: "0 16px 16px 0" },
            }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Login/Sign Up On Snapdeal
            </Typography>
            <Typography
              color="text.secondary"
              mb={3}
              align="center"
              fontSize="1rem">
              Please provide your Mobile Number or Email to Login/Sign Up on
              Snapdeal
            </Typography>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              placeholder="Mobile Number/ Email"
              variant="outlined"
              size="large"
              error={Boolean(error)}
              helperText={error}
              sx={{
                mb: 2,
                bgcolor: "#f6f7fb",
                borderRadius: 1.5,
                "& .MuiInputBase-input": { py: 1.3 },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                mb: 2,
                py: 1.4,
                fontWeight: 700,
                fontSize: "1.08rem",
                boxShadow: 2,
                borderRadius: "7px",
                bgcolor: "#ff0059",
              }}>
              CONTINUE
            </Button>
            <Divider sx={{ width: "100%", my: 2 }}>or Login Using</Divider>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => {}}
              sx={{
                fontWeight: 700,
                textTransform: "none",
                bgcolor: "white",
                boxShadow: 1,
                borderRadius: "7px",
                py: 1.3,
                gap: 1.5,
                color: "#24292f",
                "&:hover": {
                  bgcolor: "#f6f7fb",
                },
              }}>
              Google
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
