import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Drawer,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SecurityIcon from "@mui/icons-material/Security";
import ReplayIcon from "@mui/icons-material/Replay";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../ReduxToolkit/CartSlice";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartBottomSheet() {
  const {
    items: productsData = [],
    isBuyNow = false,
    selectedItem = {},
  } = useSelector(({ cart }) => cart);
  const cartItems = isBuyNow ? [selectedItem] : productsData;
  const isEmptyCart = !cartItems.length;
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(
    cartItems.map((p) => ({ ...p, quantity: 1 }))
  );
  const dispatcht = useDispatch();
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    setOpen(true);
  }, []);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, value) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  const handleRemove = (id) => {
    dispatcht(removeFromCart(id));
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Drawer
        anchor="bottom"
        open={open && !isEmptyCart}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          setOpen(false);
        }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "90vh",
          },
        }}>
        {
          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid #eee",
              }}>
              <Typography variant="h6">
                Shopping Cart{" "}
                {!isBuyNow && (
                  <Typography component="span">
                    ({cart.length} Items)
                  </Typography>
                )}
              </Typography>
              <IconButton
                onClick={() => {
                  setOpen(false);
                  navigate("/");
                }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Items */}
            {cart.map((item) => (
              <Grid
                key={item.id}
                container
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}>
                <Grid item>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: 80, height: 80 }}
                  />
                </Grid>

                {/* Item details */}
                <Grid size={{ xs: 4 }}>
                  <Tooltip title={item.title}>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {item.title}
                    </Typography>
                  </Tooltip>
                  <Typography variant="caption" color="text.secondary">
                    {item.seller?.name}
                  </Typography>
                  <br />
                  {!isBuyNow && (
                    <Button
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => handleRemove(item.id)}>
                      × REMOVE
                    </Button>
                  )}
                </Grid>

                {/* Price */}
                <Grid item xs={2}>
                  <Typography>Rs. {item.price}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ textDecoration: "line-through", color: "gray" }}>
                    Rs. {item.oldPrice}
                  </Typography>
                </Grid>

                {/* Quantity */}
                <Grid item xs={2}>
                  <Select
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }>
                    {[1, 2, 3, 4, 5].map((q) => (
                      <MenuItem key={q} value={q}>
                        {q}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                {/* Subtotal per item */}
                <Grid item xs={2}>
                  <Typography>Rs. {item.price * item.quantity}</Typography>
                </Grid>
              </Grid>
            ))}

            <Divider />

            {/* One-time Pincode Check (Global) */}
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <Button variant="contained">CHECK</Button>
              </Box>
              <Typography variant="caption">
                Check availability and delivery charges for your pincode
              </Typography>
            </Box>

            <Divider />

            {/* Extra info */}
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" gutterBottom>
                Delivery and payment options can be selected later
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <SecurityIcon fontSize="small" />
                <Typography variant="body2">
                  Safe and Secure Payments
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <ReplayIcon fontSize="small" />
                <Typography variant="body2">
                  100% Payment Protection, Easy Returns Policy
                </Typography>
              </Box>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                bgcolor: "#111",
                color: "#fff",
              }}>
              <Box>
                <Typography>Sub Total: Rs. {subtotal}</Typography>
                <Typography>Delivery Charges: FREE</Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ bgcolor: "deeppink", px: 3, py: 1 }}>
                PROCEED TO PAY RS. {subtotal}
              </Button>
            </Box>
          </Box>
        }
      </Drawer>
      <EmptyCart isEmptyCart={isEmptyCart} />
    </>
  );
}
