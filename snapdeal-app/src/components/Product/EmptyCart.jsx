import {
  Card,
  CardActions,
  Typography,
  Button,
  Dialog,
  IconButton,
  CardHeader,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function EmptyCart({ isEmptyCart }) {
  const navigate = useNavigate();
  return (
    <Dialog open={isEmptyCart}>
      <Card
        sx={{
          borderRadius: 3,
          p: 3,
          textAlign: "center",
          boxShadow: 3,
        }}>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/")}>
              <CloseIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Shopping Cart is empty!
            </Typography>
          }
        />

        <CardActions>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: "#E5004E",
              "&:hover": { backgroundColor: "#c2003f" },
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
            onClick={() => navigate("/")}>
            START SHOPPING NOW
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}
