import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  Box,
  Avatar,
} from "@mui/material";
import { fetchOrders, updateOrderStatus } from "../Utills/commonUtills";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getMyOrders = async () => {
    const result = await fetchOrders();
    setOrders(result);
  };

  const handleStatusChange = async (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
    try {
      const order = orders.find((o) => o._id === id);
      const orderStatus =
        (await updateOrderStatus(order.orderId, newStatus)) || {};
      if (orderStatus.hasOwnProperty("order")) {
        alert(orderStatus.message);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      // rollback if needed
      getMyOrders();
    }
    // 🔗 TODO: call API to update status in backend
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Orders History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((o) => (
            <TableRow key={o._id}>
              <TableCell>{o.orderId}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    variant="square"
                    src={o.img}
                    alt={o.title}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Typography>{o.title}</Typography>
                </Box>
              </TableCell>
              <TableCell>{o.category}</TableCell>
              <TableCell>{o.seller?.name}</TableCell>
              <TableCell>{o.quantity}</TableCell>
              <TableCell>₹{o.quantity * o.price}</TableCell>
              <TableCell>
                {new Date(o.createdDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Box sx={{ minWidth: 120 }}>
                  <Select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    size="small">
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
