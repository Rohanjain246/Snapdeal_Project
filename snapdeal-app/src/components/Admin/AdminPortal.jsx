import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import ProductsPage from "./ProductsPage";
import OrdersPage from "./OrdersPage";
import { useNavigate } from "react-router-dom";

export default function AdminPortal() {
  const [selectedPage, setSelectedPage] = useState("products");
  const navigate = useNavigate();
  const renderPage = () => {
    switch (selectedPage) {
      case "products":
        return <ProductsPage />;
      case "orders":
        return <OrdersPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Portal
          </Typography>
          <Button
            sx={{ ml: "auto" }}
            color="inherit"
            onClick={() => navigate("/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: 200,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 200, boxSizing: "border-box" },
        }}
        variant="permanent"
        anchor="left">
        <Toolbar />
        <List>
          <ListItem button onClick={() => setSelectedPage("products")}>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage("orders")}>
            <ListItemText primary="Orders" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          //   ml: `${drawerWidth}px`,
        }}>
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
  );
}
