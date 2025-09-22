import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const sizeData = {
  inch: [
    { uk: 6, eu: 6, us: 6, length: 6 },
    { uk: 7, eu: 7, us: 7, length: 7 },
    { uk: 8, eu: 8, us: 8, length: 8 },
    { uk: 9, eu: 9, us: 9, length: 9 },
    { uk: 10, eu: 10, us: 10, length: 10 },
  ],
  cm: [
    { uk: 6, eu: 39, us: 6, length: 24.5 },
    { uk: 7, eu: 40, us: 7, length: 25.4 },
    { uk: 8, eu: 42, us: 8, length: 26.2 },
    { uk: 9, eu: 43, us: 9, length: 27.1 },
    { uk: 10, eu: 44, us: 10, length: 27.9 },
  ],
};

const SizeChartDialog = ({ open, onClose }) => {
  const [unit, setUnit] = useState("inch");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Size Chart</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Toggle Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <ToggleButtonGroup
            value={unit}
            exclusive
            onChange={(e, newUnit) => newUnit && setUnit(newUnit)}>
            <ToggleButton value="inch">Inch</ToggleButton>
            <ToggleButton value="cm">CM</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UK</TableCell>
              <TableCell>EU</TableCell>
              <TableCell>US</TableCell>
              <TableCell>
                Length ({unit === "inch" ? "in inch" : "in cm"})
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizeData[unit].map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.uk}</TableCell>
                <TableCell>{row.eu}</TableCell>
                <TableCell>{row.us}</TableCell>
                <TableCell>{row.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default SizeChartDialog;
