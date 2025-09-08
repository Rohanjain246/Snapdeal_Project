import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../ReduxToolkit/CartSlice"; // adjust path
import { Button } from "@mui/material";

export default function CartActionButton({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Check if product already exists in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        bgcolor: isInCart ? "red" : "black",
        "&:hover": { bgcolor: isInCart ? "#b30000" : "#333" },
        flex: 1,
      }}>
      {isInCart ? "REMOVE FROM CART" : "ADD TO CART"}
    </Button>
  );
}
