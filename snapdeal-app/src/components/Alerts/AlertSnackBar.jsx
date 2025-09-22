import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { alertBar } from "../ReduxToolkit/PincodeSlice";

export default function AlertSnackbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = (_, reason) => {
    if (reason === "clickaway") return; // Prevent auto-close on background click
    setOpen(false);
  };

  useEffect(() => {
    handleOpen();
    dispatch(alertBar(false));
  }, []);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000} // hides after 4s
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          mt: 8, // 👈 margin from top (adjust height here)
        }}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%", fontSize: "0.95rem", py: 1.5 }}>
          Oops! Looks like something went wrong, please try again in sometime.
        </Alert>
      </Snackbar>
    </>
  );
}
