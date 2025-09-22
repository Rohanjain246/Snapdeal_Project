import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { createUser, fetchOtp } from "../Utills/commonUtills";

const SignUpDialog = ({ open = true, onClose }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    name: "",
    dob: "",
    password: "",
    keepLoggedIn: true,
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setError("");
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" }); // clear error while typing
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.number) {
      newErrors.number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Enter a valid 10-digit number number";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 6 ||
      !/[0-9]/.test(formData.password) ||
      !/[a-zA-Z]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters, include letters and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      // call API or further logic here
      const { loggedIn } = await createUser(formData);
      if (!loggedIn) {
        alert("Register Successfully , Proceed with Login !!!");
        navigate("/login");
      }
      setLoader(true);
      const response = await fetchOtp({ phone: formData.number });
      localStorage.setItem("phone", formData.number);
      if (!response.success) {
        setLoader(false);
        setError("Login failed. Please try again.");
        return;
      }
      setLoader(false);
      navigate("/otp");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}>
      <IconButton
        onClick={() => navigate("/")}
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
      <DialogContent
        sx={{
          p: 0,
          overflowY: "auto",
          maxHeight: "90vh",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: "100%",
          }}>
          {/* Left Side */}
          <Box
            sx={{
              background: "linear-gradient(135deg,#f6f7fb 80%,#eaeffc 100%)",
              flex: 1,
              px: { xs: 3, md: 4 },
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
              <Box
                sx={{
                  width: 44,
                  height: 54,
                  bgcolor: theme.palette.primary.light,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}>
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
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: theme.palette.warning.light,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}>
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

          {/* Right Side - Form */}
          <Box
            sx={{
              flex: 2,
              p: { xs: 3, md: 4 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: 400,
                borderRadius: 2,
              }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Sign Up
              </Typography>
              <Typography variant="body2" mb={2}>
                Create an account on Snapdeal
              </Typography>

              <TextField
                fullWidth
                required
                label="Email"
                value={formData.email}
                onChange={handleChange("email")}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                fullWidth
                required
                label="Mobile Number"
                value={formData.number}
                onChange={handleChange("number")}
                margin="normal"
                placeholder="+91 Mobile Number"
                error={!!errors.number}
                helperText={errors.number}
              />

              <TextField
                fullWidth
                required
                label="Name"
                value={formData.name}
                onChange={handleChange("name")}
                margin="normal"
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                fullWidth
                required
                label="DOB"
                type="date"
                value={formData.dob}
                onChange={handleChange("dob")}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dob}
                helperText={errors.dob}
              />

              <TextField
                fullWidth
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.keepLoggedIn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        keepLoggedIn: e.target.checked,
                      })
                    }
                  />
                }
                label="Keep me logged in"
              />
              {<Typography color="error">{error}</Typography>}
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                loading={loader}
                sx={{
                  mt: 2,
                  bgcolor: "#E40046",
                  "&:hover": { bgcolor: "#c6003d" },
                  py: 1.2,
                }}>
                CONTINUE
              </Button>

              <Typography
                variant="caption"
                display="block"
                mt={1}
                textAlign="center">
                By registering, I agree to{" "}
                <Typography
                  component="span"
                  variant="caption"
                  color="primary"
                  sx={{ cursor: "pointer" }}>
                  Terms & Conditions
                </Typography>
              </Typography>

              <Divider sx={{ my: 2 }}>or Login Using</Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ py: 1.2 }}>
                Google
              </Button>
            </Paper>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
