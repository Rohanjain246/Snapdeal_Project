import React from "react";
import { Box, Typography, Button } from "@mui/material";

const DownloadAppSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: { xs: 2, md: 6 },
        bgcolor: "#fff",
        flexWrap: "wrap",
        position: "relative",
      }}>
      {/* Left Side - Phones */}
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          position: "relative",
          minWidth: { md: "300px" },
        }}>
        <img
          src="https://i2.sdlcdn.com/img/appScreenshot@1x.png"
          alt="Snapdeal App Screenshot"
          style={{
            height: "400px",
            position: "relative",
            zIndex: 2,
            maxWidth: "100%",
          }}
        />
      </Box>

      {/* Right Side - Text + Buttons */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", md: "left" },
          mt: { xs: 5, md: 0 },
        }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
          }}>
          Download Snapdeal App Now
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 3, fontSize: "1rem" }}>
          Fast, Simple & Delightful.
          <br /> All it takes is 30 seconds to Download.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: { xs: "center", md: "flex-start" },
          }}>
          <Button
            sx={{ p: 0, minWidth: "150px" }}
            component="a"
            href="https://itunes.apple.com" // replace with actual App Store link
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="/app1.png"
              alt="App Store / Icons"
              style={{ height: "45px", maxWidth: "100%" }}
            />
          </Button>
          {/* If you have a separate Google Play icon, you can use that too */}
          <Button
            sx={{ p: 0, minWidth: "150px" }}
            component="a"
            href="https://play.google.com" // replace with actual Google Play link
            target="_blank"
            rel="noopener noreferrer">
            <img
              src="/app2.png"
              alt="Google Play / Icons"
              style={{ height: "45px", maxWidth: "100%" }}
            />
          </Button>
        </Box>
      </Box>

      {/* Decorative Leaf */}
      <img
        src="https://i2.sdlcdn.com/img/leaves1x.png"
        alt="Decorative Leaf"
        style={{
          position: "absolute",
          right: 0,
          top: "10%",
          height: "120px",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default DownloadAppSection;
