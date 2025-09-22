import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddressCard from "./AddressCard";

const SavedAddresses = ({}) => {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch addresses on load
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:7000/api/address/${userId}`)
        .then((res) => res.json())
        .then((data) => setAddresses(data))
        .catch((err) => console.error("Failed to fetch addresses:", err));
    }
  }, [userId]);

  // ✅ Delete
  const handleDelete = async (id) => {
    await fetch(`http://localhost:7000/api/deleteAddress/${id}`, {
      method: "DELETE",
    });
    setAddresses(addresses.filter((addr) => addr._id !== id));
  };

  // ✅ Save changes (Add or Update)
  const handleSave = async () => {
    if (editingAddress._id) {
      // Update existing
      const res = await fetch(
        `http://localhost:7000/api/updateAddress/${editingAddress._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingAddress),
        }
      );
      const updated = await res.json();
      setAddresses((prev) =>
        prev.map((addr) => (addr._id === updated._id ? updated : addr))
      );
    } else {
      // Add new
      const res = await fetch("http://localhost:7000/api/saveAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingAddress, userId }),
      });
      const created = await res.json();
      setAddresses([...addresses, created]);
    }
    setOpen(false);
    setEditingAddress(null);
  };

  // ✅ Add new address dialog
  const handleAddNew = () => {
    setEditingAddress({
      label: "home",
      name: "",
      street: "",
      city: "",
      zip: "",
      state: "",
      landmark: "",
      phone: "",
      userId,
    });
    setOpen(true);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        SAVED ADDRESSES
      </Typography>

      {addresses.map((addr) => (
        <AddressCard
          key={addr._id}
          address={addr}
          onEdit={setEditingAddress}
          onDelete={handleDelete}
        />
      ))}

      {/* Add new address button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: "#d32f2f",
          "&:hover": { bgcolor: "#b71c1c" },
          borderRadius: 1,
          mt: 2,
        }}
        fullWidth
        onClick={handleAddNew}>
        ADD NEW ADDRESS
      </Button>

      {/* Edit / Add Address Dialog */}
      <Dialog
        open={open || !!editingAddress}
        onClose={() => setOpen(false)}
        fullWidth>
        <DialogTitle>
          {editingAddress?._id ? "Edit Address" : "Add Address"}
        </DialogTitle>
        <DialogContent>
          {["name", "street", "city", "zip", "state", "landmark", "phone"].map(
            (field) => (
              <TextField
                key={field}
                margin="dense"
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                value={editingAddress?.[field] || ""}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    [field]: e.target.value,
                  })
                }
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavedAddresses;
