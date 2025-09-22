import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";

const OrderStatus = () => {
  const steps = ["Placed", "Cancelled"];
  const activeStep = 1; // since the order is cancelled

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Status text */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}>
        <Typography variant="body1">
          Status:{" "}
          <Typography component="span" sx={{ color: "green", fontWeight: 500 }}>
            Order Cancelled
          </Typography>
        </Typography>
        <Typography variant="body2" sx={{ color: "green" }}>
          Cancelled: 28 Sep, 2019
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": {
            color: "lightgray",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "green",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "green",
          },
          "& .MuiStepConnector-line": {
            borderColor: "green",
          },
        }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderStatus;
