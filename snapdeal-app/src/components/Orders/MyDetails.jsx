import {
  Box,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";

export default function Sidebar({ userName }) {
  return (
    <Box
      sx={{
        width: 500,
        bgcolor: "white",
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 2,
        mr: 3,
        height: "fit-content",
      }}>
      {/* Header */}
      <Typography variant="h6" sx={{ mb: 2, color: "#d32f2f" }}>
        MY ACCOUNT
      </Typography>

      {/* User Avatar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "#d32f2f", mr: 1 }}>
          <AccountCircleIcon />
        </Avatar>
        <Box>
          <Typography variant="body1">Welcome!</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {userName || "Guest"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Orders Section */}
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        ORDERS
      </Typography>
      <List dense>
        <ListItem button>
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>
          <ListItemText
            primary="Orders"
            primaryTypographyProps={{ color: "error" }}
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Profile Section */}
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        PROFILE
      </Typography>
      <List dense>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Saved Addresses" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Saved Cards" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Payments Section */}
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        PAYMENTS
      </Typography>
      <List dense>
        <ListItem button>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="E-Gift Voucher Balance" />
        </ListItem>
      </List>
    </Box>
  );
}
