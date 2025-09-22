import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        position: "relative",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: "none",
        mb: 2,
      }}>
      {/* Ribbon */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 0,
          bgcolor: "green",
          color: "white",
          px: 2,
          py: 0.5,
          fontSize: "0.8rem",
          fontWeight: "bold",
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
        }}>
        {address.label}
      </Box>

      <CardContent sx={{ pt: 6 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
          {address.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.street}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.city} - {address.zip}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.state}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {address.landmark}
        </Typography>
        <Typography variant="body2">
          <b>Phone:</b> {address.phone}
        </Typography>

        {/* Actions */}
        <Box sx={{ display: "flex", mt: 2 }}>
          <IconButton color="error" onClick={() => onDelete(address._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            sx={{ ml: 1 }}
            onClick={() => onEdit(address)}>
            <EditIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
