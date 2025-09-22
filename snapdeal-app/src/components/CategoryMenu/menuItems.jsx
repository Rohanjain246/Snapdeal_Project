import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  Grid,
  Typography,
  Divider,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  menuCategory,
  selectedCategory,
  subCategory,
} from "../ReduxToolkit/MenuItemSlice";
import _ from "lodash";
// Left categories
const topCategories = [
  {
    name: "Men's Fashion",
    img: "/a1.jpg",
    subImage: "https://g.sdlcdn.com/imgs/i/1/o/MF-05994.jpg",
  },
  {
    name: "Women's Fashion",
    img: "/a5.jpg",
    subImage:
      "https://g.sdlcdn.com/imgs/i/n/g/MS_WomenWatches_LeftNav1Aug-e15a1.jpg",
  },
  {
    name: "Home & Kitchen",
    img: "/a3.jpg",
    subImage: "https://g.sdlcdn.com/imgs/i/1/r/GM_28oct-e8cd1.jpg",
  },
  { name: "Toys, Kids' Fashion & more", img: "/a4.jpg" },
  { name: "Beauty, Health & Daily Needs", img: "/p3.jpg" },
];

// Right panel menu data
const menuData = {
  "Men's Fashion": {
    Footwear: [
      "Sports Shoes",
      "Casual Shoes",
      "Slippers & Flip Flops",
      "Sandals & Floaters",
      "Formal Shoes",
      "Loafers",
      "Sneakers",
      "Ethnic Footwear",
      "Shoe Accessories",
    ],
    Clothing: ["T-Shirts & Polos", "Shirts", "Jeans", "Trousers & Chinos"],
    "Winter Wear": ["Jackets", "Sweatshirts", "Sweaters", "Thermals"],
    Accessories: ["Wallets", "Belts", "Hats & Caps", "Gift Sets"],
  },
  "Women's Fashion": {
    CLOTHING: ["Dresses", "Tops", "Jeans", "Kurtas & Suits"],
    FOOTWEAR: ["Heels", "Flats", "Sandals", "Sneakers"],
  },
  "Home & Kitchen": {
    KITCHENWARE: ["Cookware", "Storage", "Appliances"],
    "HOME DECOR": ["Curtains", "Bedsheets", "Cushions"],
  },
};

export default function CategoryMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const subImages = topCategories.find(
    (item) => item.name === activeCategory
  )?.subImage;

  return (
    <Box display="flex" position="relative">
      {/* Left Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: 250,
          height: 250,
          position: "relative",
          zIndex: 2,
          borderRight: "1px solid #ddd",
        }}>
        <List dense>
          {topCategories.map((cat, index) => (
            <ListItem
              button
              key={index}
              onMouseEnter={() => {
                setActiveCategory(cat.name);
                dispatch(menuCategory(_.camelCase(_.startCase(cat.name))));
              }}
              sx={{
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}>
              <ListItemIcon>
                <Avatar src={cat.img} sx={{ width: 30, height: 30 }} />
              </ListItemIcon>
              <ListItemText
                primary={cat.name}
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Right Mega Menu */}
      {activeCategory && menuData[activeCategory] && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            left: 200,
            top: 0,
            width: 800,
            height: 400,
            p: 2,
            backgroundColor: "#fff",
            borderLeft: "1px solid #ddd",
            zIndex: 1,
          }}
          onMouseEnter={() => {
            setActiveCategory(activeCategory);
            dispatch(menuCategory(activeCategory));
          }}
          onMouseLeave={() => setActiveCategory(null)}>
          <Grid container spacing={3}>
            {Object.entries(menuData[activeCategory]).map(
              ([section, items], idx) => (
                <Grid key={section}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#333" }}>
                    {section}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  {items.map((item) => {
                    return (
                      <Typography
                        key={item}
                        variant="body2"
                        onClick={() => {
                          navigate("/product");
                          dispatch(selectedCategory(_.camelCase(section)));
                          dispatch(subCategory(_.camelCase(item)));
                        }}
                        sx={{
                          cursor: "pointer",
                          py: 0.5,
                          "&:hover": { color: "red" },
                        }}>
                        {item}
                      </Typography>
                    );
                  })}
                </Grid>
              )
            )}
            <Grid>
              <CardMedia
                component="img"
                image={subImages}
                alt="preview"
                sx={{
                  width: 200,
                  height: 400,
                  objectFit: "contain",
                  borderRadius: 2,
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
