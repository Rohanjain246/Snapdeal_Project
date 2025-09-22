import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryMenu from "../CategoryMenu/menuItems";
import DownloadAppSection from "./DownLoadPart";
import TrendingProducts from "./TrendingProduct";
import { addPincode, removePincode } from "../ReduxToolkit/PincodeSlice";
import { useDispatch, useSelector } from "react-redux";

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

const carouselImages = [
  "https://g.sdlcdn.com/imgs/l/b/q/DesiPartyGlamdesktop1825-ec448.jpg",
  "https://g.sdlcdn.com/imgs/l/b/q/CelebrationVibesdesktop-2ddc1.jpg",
  "https://g.sdlcdn.com/imgs/l/b/q/StepIntoFestivitydesktop1825-3e105.jpg",
  "https://g.sdlcdn.com/imgs/l/b/q/TyohaarWalaGlowdesktop1825-38fff.jpg",
  "https://g.sdlcdn.com/imgs/l/b/q/FestiveTadkadesktop1825-4d320.jpg",
];
const availablePincodes = ["110001", "560001", "400001", "122001"];

export default function HomePageLayout() {
  const [index, setIndex] = useState(0);
  const { pincode: isPincode } = useSelector(({ pincode }) => pincode);
  const [pincode, setPincode] = useState(isPincode);
  const [message, setMessage] = useState("");
  const [pinVal, setPinValue] = useState("");
  const dispatch = useDispatch();

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };
  const handleCheck = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setMessage("❌ Please enter a valid 6-digit pincode.");
      return;
    }

    if (availablePincodes.includes(pincode)) {
      setMessage("✅ Delivery is available at your location.");
      setPinValue(pincode);
      dispatch(addPincode(pincode));
    } else {
      setMessage("❌ Sorry, delivery is not available in your area.");
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 2 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              TOP CATEGORIES
            </Typography>
            {/* <List dense>
              {topCategories.map((cat, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>
                    <Avatar src={cat.img} sx={{ width: 30, height: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary={cat.name} />
                </ListItem>
              ))}
            </List> */}
            <CategoryMenu />

            <Typography
              variant="subtitle1"
              sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
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
              sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
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
                  {pinVal ? (
                    <Typography>Pincode :{pinVal}</Typography>
                  ) : (
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      placeholder="Enter pincode"
                      onChange={(e) => setPincode(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  )}
                  {message && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: message.includes("✅") ? "green" : "red",
                      }}>
                      {message}
                    </Typography>
                  )}
                  {pinVal ? (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        setPinValue("");
                        dispatch(removePincode());
                        setMessage("");
                      }}>
                      Change Pin Code
                    </Button>
                  ) : (
                    <Button variant="contained" fullWidth onClick={handleCheck}>
                      SUBMIT
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TrendingProducts title={"Recently viewed products"} />
          </Grid>
        </Grid>
      </Grid>
      <TrendingProducts title={"TRENDING PRODUCTS"} />
      <DownloadAppSection />
    </Box>
  );
}
