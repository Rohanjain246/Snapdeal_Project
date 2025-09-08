import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { verifyOtp, getToken, fetchLogin } from "../Utills/commonUtills";

export default function OTPDialog() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOtp(new Array(6).fill(""));
    setError("");
    setOpen(true);
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      e.target.previousSibling
    ) {
      e.target.previousSibling.focus();
    }
  };

  const handleClose = () => {
    setOtp(new Array(6).fill(""));
    setOpen(false);
    navigate("/login");
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    const Otp = await verifyOtp({
      phone: localStorage.getItem("phone"),
      enteredOtp,
    });

    if (Otp.success) {
      await getToken();
      setError("");
      const userData = await fetchLogin({
        number: localStorage.getItem("phone"),
      });
      console.log("userData --->", userData);
      if (!userData.success) {
        setError("Login failed. Please try again.");
        return;
      }
      localStorage.setItem("user", JSON.stringify(userData._doc.name));
      alert("✅ OTP Verified Successfully!");
      setOpen(false);
      navigate("/");
    } else {
      setError("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle textAlign="center">OTP Verification</DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center" gutterBottom>
          Enter the 6-digit OTP sent to your registered mobile/email
        </Typography>

        <Grid container justifyContent="center" spacing={1} sx={{ mt: 1 }}>
          {otp.map((data, index) => (
            <Grid item key={index}>
              <TextField
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "20px" },
                }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                sx={{ width: "50px" }}
              />
            </Grid>
          ))}
        </Grid>

        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Verify OTP
        </Button>
      </DialogActions>
    </Dialog>
  );
}
