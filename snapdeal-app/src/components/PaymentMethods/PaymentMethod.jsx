import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  Breadcrumbs,
  Link,
  Typography,
  Grid,
  Divider,
  Button,
  Box,
  IconButton,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { clearCart } from "../ReduxToolkit/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trans } from "@lingui/react/macro";
import { activate } from "../../i18n";

export default function CheckoutDialog({ open = true }) {
  const { items, isBuyNow, selectedItem } = useSelector(({ cart }) => cart);
  const [step, setStep] = useState("summary");
  const [selected, setSelected] = useState("");
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedroduct = isBuyNow ? [selectedItem] : items;

  const totalAmount = useMemo(() => {
    return selectedroduct.reduce(
      (sum, item) => sum + Number(item.price) * (item.qty || 1),
      0
    );
  }, [selectedroduct]);

  const mobileNumber = localStorage.getItem("phone");
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    navigate("/cart");
  };

  const handlePayment = async () => {
    try {
      // 1. Create order (backend call with fetch)
      const orderRes = await fetch("http://localhost:7000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }), // 👈 must be "amount" not "totalAmount"
      });

      const { orderId } = await orderRes.json();

      // 2. Razorpay checkout options
      const options = {
        key: "rzp_test_RHTaoS8InBeeVu", // frontend-safe test key
        amount: totalAmount * 100,
        currency: "INR",
        name: "Snapdeal Demo",
        description: "Payment for your order",
        order_id: orderId,
        handler: async function (response) {
          // 3. Verify payment (backend call with fetch)
          const verifyRes = await fetch(
            "http://localhost:7000/api/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const result = await verifyRes.json();
          if (result.success) {
            alert("✅ Payment Successful!");
            navigate("/");
            dispatch(clearCart());
          } else {
            alert("❌ Payment Verification Failed!");
          }
        },
        theme: { color: "#e40046" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const paymentMethods = [
    {
      id: "upi",
      label: <Trans>UPI</Trans>,
      icon: <PaymentsIcon sx={{ color: "#e40046" }} />,
      right: "GPay, PhonePe, Paytm",
    },
    {
      id: "card",
      label: <Trans>Card</Trans>,
      icon: <CreditCardIcon sx={{ color: "#e40046" }} />,
      right: "Visa, Master, Rupay",
    },
    {
      id: "wallet",
      label: <Trans>Wallet</Trans>,
      icon: <AccountBalanceWalletIcon sx={{ color: "#e40046" }} />,
      right: "Paytm Wallet",
    },
    {
      id: "cod",
      label: <Trans>Cash On Delivery</Trans>,
      sub: "Pay at the time of delivery",
      icon: <CurrencyRupeeIcon sx={{ color: "#e40046" }} />,
    },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#e40046",
          px: 2,
          py: 1,
          color: "white",
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            snapdeal
          </Typography>
          <Typography
            sx={{
              bgcolor: "white",
              color: "#e40046",
              borderRadius: "12px",
              px: 1,
              fontSize: "12px",
              fontWeight: "bold",
            }}>
            Razorpay Trusted Business
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Select
            value={lang}
            onChange={(e) => {
              setLang(e.target.value);
              activate(e.target.value);
            }}
            size="small"
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { border: 0 },
            }}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिन्दी</MenuItem>
            <MenuItem value="kn">ಕನ್ನಡ</MenuItem>
          </Select>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        {step === "payments" && (
          <ArrowBackIcon
            sx={{ mr: 1, cursor: "pointer" }}
            onClick={() => setStep("summary")}
          />
        )}
        <Breadcrumbs separator="›">
          <Link
            underline="hover"
            color={step === "summary" ? "text.primary" : "inherit"}
            sx={{ cursor: "pointer" }}
            onClick={() => setStep("summary")}>
            Summary
          </Link>
          <Link
            underline="hover"
            color={step === "payments" ? "text.primary" : "inherit"}
            sx={{ cursor: step === "summary" ? "not-allowed" : "pointer" }}
            onClick={() => step === "payments" && setStep("payments")}>
            Payments
          </Link>
        </Breadcrumbs>
      </Box>

      <DialogContent sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            {step === "summary" ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: "8px",
                  }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <PersonOutlineIcon />
                    <Box>
                      <Typography fontWeight="500">
                        <Trans>Contact Details </Trans>
                      </Typography>
                      <Typography variant="body2">
                        +91 {mobileNumber}
                      </Typography>
                    </Box>
                  </Box>
                  <Link
                    underline="hover"
                    sx={{ color: "#e40046", cursor: "pointer" }}>
                    Change
                  </Link>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: "8px",
                  }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <LocationOnOutlinedIcon />
                    <Box>
                      <Typography fontWeight="500">
                        <Trans> Delivery Address</Trans>
                        <Typography variant="caption">(1 saved)</Typography>
                      </Typography>
                      <Typography variant="body2">Rohan Jain T B</Typography>
                      <Typography variant="body2">
                        <Trans>+91 8277424985</Trans>
                      </Typography>
                      <Typography variant="body2">
                        <Trans>
                          {" "}
                          10, near Aditya medical, nagaravarpalya, CV Raman
                          Nagar,
                        </Trans>
                      </Typography>
                      <Typography variant="body2">
                        <Trans> Bengaluru, Karnataka, India - 560038</Trans>
                      </Typography>
                    </Box>
                  </Box>
                  <Link
                    underline="hover"
                    sx={{ color: "#e40046", cursor: "pointer" }}>
                    <Trans> Add / Change</Trans>
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  UPI, Cards & More
                </Typography>
                {paymentMethods.map((m) => (
                  <Paper
                    key={m.id}
                    elevation={0}
                    onClick={() => setSelected(m.id)}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      cursor: "pointer",
                      bgcolor: selected === m.id ? "#fff0f5" : "white",
                      "&:hover": { borderColor: "#e40046" },
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {m.icon}
                      <Box>
                        <Typography fontWeight={500}>{m.label}</Typography>
                        {m.sub && (
                          <Typography variant="caption" color="text.secondary">
                            {m.sub}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {m.right && (
                      <Typography variant="caption" color="text.secondary">
                        {m.right}
                      </Typography>
                    )}
                  </Paper>
                ))}
              </>
            )}
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box
              sx={{
                p: 2,
                border: "1px solid #eee",
                borderRadius: "8px",
                bgcolor: "white",
              }}>
              <Typography fontWeight="500">Order Summary</Typography>
              <Divider sx={{ my: 1 }} />

              {selectedroduct.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}>
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Box>
                    <Typography variant="body2">{product.title}</Typography>
                    <Typography variant="caption">
                      Qty: {product.qty || 1}
                    </Typography>
                  </Box>
                  <Typography sx={{ ml: "auto" }}>
                    ₹{Number(product.price) * (product.qty || 1)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 1 }} />
              <Grid container justifyContent="space-between">
                <Typography variant="body2">
                  <Trans>Price</Trans>
                </Typography>
                <Typography variant="body2">₹{totalAmount}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant="body2">
                  <Trans>Delivery Charges</Trans>
                </Typography>
                <Typography variant="body2" color="green">
                  <Trans> Free</Trans>
                </Typography>
              </Grid>
              <Divider sx={{ my: 1 }} />
              <Grid container justifyContent="space-between">
                <Typography>
                  <Trans>Total Amount </Trans>
                </Typography>
                <Typography fontWeight="bold">₹{totalAmount}</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          borderTop: "1px solid #eee",
          bgcolor: "white",
        }}>
        <Typography variant="h6">₹{totalAmount}</Typography>
        {step === "summary" ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#e40046",
              px: 4,
              "&:hover": { bgcolor: "#c20038" },
            }}
            onClick={() => setStep("payments")}>
            <Trans> Continue</Trans>
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#e40046",
              px: 6,
              fontSize: "16px",
              "&:hover": { bgcolor: "#c20038" },
            }}
            onClick={handlePayment}>
            <Trans> Pay Now</Trans>
          </Button>
        )}
      </Box>

      <Box sx={{ textAlign: "center", py: 1, fontSize: "12px", color: "gray" }}>
        Secured by <b style={{ color: "#1a73e8" }}>Razorpay Magic</b>
      </Box>
    </Dialog>
  );
}
