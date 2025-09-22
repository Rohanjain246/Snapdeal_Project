import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  LinearProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { fetchOrders } from "../Utills/commonUtills";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import MyDetails from "./MyDetails";

const MyOrdersPage = () => {
  const userName = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getMyOrders = async () => {
    const result = await fetchOrders();
    setOrders(result);
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "Shipped":
        return "orange";
      case "Placed":
        return "blue";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getProgressValue = (status) => {
    switch (status) {
      case "Pending":
        return 25;
      case "Shipped":
        return 60;
      case "Delivered":
        return 100;
      case "Cancelled":
        return 100;
      default:
        return 0;
    }
  };

  // ✅ Group orders by orderId
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = [];
    }
    acc[order.orderId].push(order);
    return acc;
  }, {});

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafafa", p: 4 }}>
      <MyDetails userName={userName} />

      {/* Right My Orders Section */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          MY ORDERS
        </Typography>

        {orders.length === 0 ? (
          <Typography>No orders found</Typography>
        ) : (
          Object.entries(groupedOrders).map(([orderId, items]) => {
            const firstOrder = items[0]; // order details from first item
            const status = firstOrder.status || "Pending";

            return (
              <Card variant="outlined" sx={{ mb: 2 }} key={orderId}>
                <CardContent>
                  <Grid container spacing={2}>
                    {/* Order Info */}
                    <Grid
                      item
                      xs={12}
                      display="flex"
                      justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          Order ID: {orderId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Placed on{" "}
                          {dayjs(firstOrder.createdDate).format("DD MMM, YYYY")}
                        </Typography>
                      </Box>
                    </Grid>

                    <Divider sx={{ width: "100%", my: 1 }} />

                    {/* ✅ All Products in this Order */}
                    {items.map((order, idx) => (
                      <Grid
                        container
                        key={idx}
                        onClick={() => {
                          navigate(
                            `/product/${_.camelCase(order.title)}/${
                              order?.id || 1
                            }`,
                            {
                              replace: true, // replaces current entry instead of pushing new one
                              state: { ...location.state, id: order.id || 1 },
                            }
                          );
                        }}
                        spacing={2}
                        sx={{
                          mb: 2,
                          pl: 2,
                          transition: "transform 0.2s ease-in-out",
                          "&:hover": {
                            cursor: "pointer",
                            transform: "scale(1.02)",
                          },
                        }}>
                        <Grid item xs={3}>
                          <img
                            src={order.img}
                            alt={order.title}
                            style={{
                              width: "100px",
                              border: "1px solid #ddd",
                            }}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {order.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price: ₹{order.price} &nbsp;
                            <s style={{ color: "gray" }}>₹{order.oldPrice}</s>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}>
                            {order.highlights?.join(" • ")}
                          </Typography>
                          {status === "Cancelled" ? (
                            <Typography
                              variant="caption"
                              color="text.secondary">
                              Cancelled on{" "}
                              {dayjs(firstOrder.createdDate).format(
                                "DD MMM, YYYY"
                              )}
                            </Typography>
                          ) : null}
                        </Grid>
                      </Grid>
                    ))}

                    {/* Tracking Progress */}
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 2,
                          color: getStatusColor(status),
                          fontWeight: "bold",
                        }}>
                        Status: {status}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={getProgressValue(status)}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          bgcolor: "#eee",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: getStatusColor(status),
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default MyOrdersPage;
