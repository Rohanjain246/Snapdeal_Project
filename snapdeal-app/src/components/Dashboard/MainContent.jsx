import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate, useLocation } from "react-router-dom";

// Sidebar data
const topCategories = [
  { name: "Men's Fashion", img: "/a1.jpg" },
  { name: "Women's Fashion", img: "/a5.jpg" },
  { name: "Home & Kitchen", img: "/a3.jpg" },
  { name: "Toys, Kids' Fashion & more", img: "/a4.jpg" },
  { name: "Beauty, Health & Daily Needs", img: "/p3.jpg" },
];

const moreCategories = [
  "Automotives",
  "Mobile & Accessories",
  "Electronics",
  "Sports, Fitness & Outdoor",
  "Computers & Gaming",
  "Books, Media & Music",
  "Hobbies",
];

const trendingSearches = [
  "Kitchen Product",
  "Shoes For Men",
  "Kurti Set",
  "Sandal Men",
  "Sport Shoe Men",
];

const carouselImages = ["/c1.jpg", "/c2.jpg", "/c3.jpg"];

const products = [
  { id: 1, title: "Shiv Shakti Kavach ", img: "/s1.jpg", price: "₹176" },
  {
    id: 2,
    title: "Battlestar - Tummy Trimmer ",
    img: "/p2.jpg",
    price: "₹310",
  },
  {
    id: 3,
    title: "Shiv Trishul Damru Gold-plated locket",
    img: "/s3.jpg",
    price: "₹135",
  },
  {
    id: 4,
    title: "PRd PU Tan Casual regular Wallet",
    img: "/s4.jpg",
    price: "₹150",
  },
  { id: 6, title: "Aadi Black Casual Shoes", img: "/p1.jpg", price: "₹326" },
];

export default function HomePageLayout() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 2 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              TOP CATEGORIES
            </Typography>
            <List dense>
              {topCategories.map((cat, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>
                    <Avatar src={cat.img} sx={{ width: 30, height: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary={cat.name} />
                </ListItem>
              ))}
            </List>

            <Typography
              variant="subtitle1"
              sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
              MORE CATEGORIES
            </Typography>
            <List dense>
              {moreCategories.map((cat, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={cat} />
                </ListItem>
              ))}
            </List>

            <Typography
              variant="subtitle1"
              sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
              TRENDING SEARCHES
            </Typography>
            <List dense>
              {trendingSearches.map((search, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>
                    <SearchIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={search} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ flexDirection: "column" }}
          size={{ xs: 10 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 9 }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                }}>
                <img
                  src={carouselImages[index]}
                  alt="carousel"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 10,
                    transform: "translateY(-50%)",
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}>
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>

            <Grid size={{ xs: 3 }}>
              <Card
                sx={{
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <LocationOnIcon sx={{ fontSize: 50, color: "goldenrod" }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Your Delivery Pincode
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Enter your pincode to check availability and faster delivery
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter pincode"
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" fullWidth>
                    SUBMIT
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Trending Products
            </Typography>
            <Grid container spacing={2}>
              {products.map((item) => (
                <Grid size={{ xs: 2.4 }} key={item.id}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        cursor: "pointer",
                      },
                    }}>
                    <CardMedia
                      component="img"
                      onClick={() =>
                        navigate(`/product/${item.id}`, {
                          replace: true, // replaces current entry instead of pushing new one
                          state: { ...location.state, id: item.id },
                        })
                      }
                      image={item.img}
                      alt={item.title}
                      sx={{
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography variant="body2" noWrap>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "primary.main",
                          mt: 1,
                          fontWeight: "bold",
                        }}>
                        {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
