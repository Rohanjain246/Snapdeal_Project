import {
  Box,
  Grid,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Slider,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  InputBase,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeProduct } from "../ReduxToolkit/ProductSlice";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";

function getColorCodeByName(colorName) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = colorName; // browser parses it
  return ctx.fillStyle; // always returns a valid hex/rgb
}

const getColorCombinations = (prodByCategory = {}) => {
  return prodByCategory.colors?.map((col) => {
    return {
      ...col,
      code: getColorCodeByName(col.name),
    };
  });
};

export default function ProductListingPage() {
  const [priceRange, setPriceRange] = useState([100, 900]);
  const { category, menuCategory = "Mens Fashion" } = useSelector(
    ({ menuItem }) => menuItem
  );
  const [sort, setSort] = useState("popularity");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [prod, setProd] = useState([]);
  const [prodByCategory, setProdByCategory] = useState({
    colors: [],
    subCategories: [],
    sizes: [],
    brands: [],
  });
  const [prodFilters, setProdFilters] = useState({
    color: [],
    subCategory: [],
    size: [],
    brand: [],
    rating: "",
  });

  // Search states for filters
  const [ratingSearch, setRatingSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");
  const [colorSearch, setColorSearch] = useState("");

  const colorsList = getColorCombinations(prodByCategory);

  const fetchProductByCategory = async () => {
    const query = queryString.stringify({ category });
    const url = `http://localhost:7000/api/filterByCategory?${query}`;
    const resp = await fetch(url);
    const prod = await resp.json();
    dispatch(storeProduct(prod));
    setProdByCategory(prod);
  };

  const fetchDataByQuery = async () => {
    const query = queryString.stringify({
      subCategory: prodFilters.subCategory.join(","),
      sort,
      category,
      brand: prodFilters.brand.join(","),
      color: prodFilters.color.join(","),
      size: prodFilters.size.join(","),
      rating: prodFilters.rating,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });
    const url = `http://localhost:7000/api/filterByQuery?${query}`;
    const resp = await fetch(url);
    const result = await resp.json();
    setProd(result);
  };

  useEffect(() => {
    fetchProductByCategory();
  }, [category]);

  useEffect(() => {
    fetchDataByQuery();
  }, [prodFilters, sort, category, priceRange]);

  // Mock filter values
  const ratings = [5, 4, 3, 2, 1];

  return (
    <Box p={2}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/product">
          Products
        </Link>
        <Typography color="text.primary">
          {_.startCase(menuCategory)}/{_.startCase(category)}
        </Typography>
      </Breadcrumbs>
      {/* <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
          🔥 Trending searches:
        </Typography>
        {[
          "kitchen product",
          "shoes for men",
          "kurti set",
          "sandal men",
          "sport shoe men",
          "saree",
          "tshirt",
          "wall stickers",
        ].map((search, idx) => (
          <Button
            key={idx}
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              borderColor: "#ddd",
              color: "text.primary",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
            onClick={() => navigate(`/search?query=${search}`)}>
            {search}
          </Button>
        ))}
      </Box> */}

      <Grid container spacing={2}>
        {/* Left Filters */}
        <Grid size={{ xs: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>

            {/* Category */}
            <Box mb={3}>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 9 }}>
                  <Typography variant="subtitle2">Category</Typography>
                </Grid>
                {prodFilters.subCategory?.length > 0 && (
                  <Grid
                    size={{ xs: 3 }}
                    sx={{ justifyContent: "flex-end", display: "flex" }}>
                    <Button
                      sx={{ color: "red", textTransform: "none" }}
                      onClick={() =>
                        setProdFilters((prev) => ({ ...prev, subCategory: [] }))
                      }>
                      Clear
                    </Button>
                  </Grid>
                )}
              </Grid>
              {prodByCategory.subCategories.map((subCat, index) => (
                <Grid
                  container
                  spacing={4}
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}>
                  <Grid size={{ xs: 10 }}>
                    <FormControlLabel
                      key={`${subCat.subCategory}-${index}`}
                      checked={prodFilters.subCategory.includes(
                        subCat.subCategory
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProdFilters((prev) => {
                            return {
                              ...prev,
                              subCategory: [
                                ...prev.subCategory,
                                subCat.subCategory,
                              ],
                            };
                          });
                        } else {
                          setProdFilters((prev) => {
                            return {
                              ...prev,
                              subCategory: prev.subCategory.filter(
                                (item) => item !== subCat.subCategory
                              ),
                            };
                          });
                        }
                      }}
                      control={<Checkbox />}
                      label={_.startCase(subCat.subCategory)}
                    />
                  </Grid>
                  <Typography variant="caption" color="text.secondary">
                    {subCat.count}
                  </Typography>
                </Grid>
              ))}
            </Box>

            {/* Price */}
            <Box mb={3}>
              <Typography variant="subtitle2">Price</Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={100}
                max={2000}
                sx={{ mt: 1 }}
              />
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  size="small"
                  value={priceRange[0]}
                  sx={{ width: 80 }}
                />
                <Typography> - </Typography>
                <TextField
                  size="small"
                  value={priceRange[1]}
                  sx={{ width: 80 }}
                />
                <Button variant="outlined" size="small">
                  Go
                </Button>
              </Box>
            </Box>

            {/* Rating */}
            {/* Color Filter */}
            <Box mt={3}>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 9 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Color
                  </Typography>
                </Grid>
                {prodFilters.color?.length > 0 && (
                  <Grid
                    size={{ xs: 3 }}
                    sx={{ justifyContent: "flex-end", display: "flex" }}>
                    <Button
                      sx={{ color: "red", textTransform: "none" }}
                      onClick={() =>
                        setProdFilters((prev) => ({ ...prev, color: [] }))
                      }>
                      Clear
                    </Button>
                  </Grid>
                )}
              </Grid>

              <Box
                display="flex"
                alignItems="center"
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  px: 1,
                  mb: 1,
                }}>
                <InputBase
                  placeholder="Search rating..."
                  value={colorSearch}
                  onChange={(e) => setColorSearch(e.target.value)}
                  sx={{ flex: 1 }}
                  setColorSearch
                />
                <IconButton size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>
              {colorsList
                .filter((item) =>
                  item.name.toLowerCase().includes(colorSearch.toLowerCase())
                )
                .map((color, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}>
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      checked={prodFilters.color.includes(color.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProdFilters((prev) => {
                            return {
                              ...prev,
                              color: [...prev.color, color.name],
                            };
                          });
                        } else {
                          setProdFilters((prev) => {
                            return {
                              ...prev,
                              color: prev.color.filter(
                                (item) => item !== color.name
                              ),
                            };
                          });
                        }
                      }}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          {/* Color Box */}
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              border: "1px solid #ccc",
                              backgroundColor: color.code,
                            }}
                          />
                          <Typography variant="body2">{color.name}</Typography>
                        </Box>
                      }
                    />
                    <Typography variant="caption" color="text.secondary">
                      {color.count}
                    </Typography>
                  </Box>
                ))}
            </Box>

            {/* Rating Filter - with Radio */}
            <Box mt={3}>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 9 }}>
                  <Typography variant="subtitle2">Customer Rating</Typography>
                </Grid>
                {prodFilters.rating && (
                  <Grid
                    size={{ xs: 3 }}
                    sx={{ justifyContent: "flex-end", display: "flex" }}>
                    <Button
                      sx={{ color: "red", textTransform: "none" }}
                      onClick={() =>
                        setProdFilters((prev) => ({ ...prev, rating: "" }))
                      }>
                      Clear
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  px: 1,
                  mb: 1,
                }}>
                <InputBase
                  placeholder="Search rating..."
                  value={ratingSearch}
                  onChange={(e) => setRatingSearch(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <IconButton size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>

              <RadioGroup
                name="rating"
                value={prodFilters.rating}
                onChange={(e) =>
                  setProdFilters((prev) => ({
                    ...prev,
                    rating: e.target.value,
                  }))
                }>
                {ratings
                  .filter(
                    (item) =>
                      ratingSearch === ""
                        ? true // show all if search is empty
                        : item.toString().includes(ratingSearch) // partial match
                  )
                  .map((stars) => (
                    <FormControlLabel
                      key={stars}
                      value={stars}
                      control={<Radio size="small" />}
                      label={<span>{"⭐".repeat(stars)} & Up</span>}
                      sx={{ display: "block" }}
                    />
                  ))}
              </RadioGroup>
            </Box>

            {/* Size */}
            <Box mb={3}>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 9 }}>
                  <Typography variant="subtitle2">Size</Typography>
                </Grid>
                {prodFilters.size?.length > 0 && (
                  <Grid
                    size={{ xs: 3 }}
                    sx={{ justifyContent: "flex-end", display: "flex" }}>
                    <Button
                      sx={{ color: "red", textTransform: "none" }}
                      onClick={() =>
                        setProdFilters((prev) => ({ ...prev, size: [] }))
                      }>
                      Clear
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  px: 1,
                  mb: 1,
                }}>
                <InputBase
                  placeholder="Search size..."
                  value={sizeSearch}
                  onChange={(e) => setSizeSearch(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <IconButton size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>
              {prodByCategory.sizes
                .filter((s) =>
                  s.size.toLowerCase().includes(sizeSearch.toLowerCase())
                )
                .map((s) => (
                  <Grid>
                    <FormControlLabel
                      key={s.size}
                      checked={prodFilters.size.includes(s.size)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProdFilters((prev) => {
                            return {
                              ...prev,
                              size: [...prev.size, s.size],
                            };
                          });
                        } else {
                          setProdFilters((prev) => {
                            return {
                              ...prev,
                              size: prev.size.filter((item) => item !== s.size),
                            };
                          });
                        }
                      }}
                      control={<Checkbox />}
                      label={s.size}
                    />
                  </Grid>
                ))}
            </Box>

            {/* Brand */}
            <Box mb={3}>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 9 }}>
                  <Typography variant="subtitle2">Brand</Typography>
                </Grid>
                {prodFilters.brand?.length > 0 && (
                  <Grid
                    size={{ xs: 3 }}
                    sx={{ justifyContent: "flex-end", display: "flex" }}>
                    <Button
                      sx={{ color: "red", textTransform: "none" }}
                      onClick={() =>
                        setProdFilters((prev) => ({ ...prev, brand: [] }))
                      }>
                      Clear
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  px: 1,
                  mb: 1,
                }}>
                <InputBase
                  placeholder="Search brand..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <IconButton size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>
              {prodByCategory.brands
                .filter((b) =>
                  b.brand.toLowerCase().includes(brandSearch.toLowerCase())
                )
                .map((b, index) => (
                  <Grid
                    container
                    spacing={4}
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}>
                    <Grid size={{ xs: 10 }}>
                      <FormControlLabel
                        key={`${b.brand}-${index}`}
                        checked={prodFilters.brand.includes(b.brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProdFilters((prev) => {
                              return {
                                ...prev,
                                brand: [...prev.brand, b.brand],
                              };
                            });
                          } else {
                            setProdFilters((prev) => {
                              return {
                                ...prev,
                                brand: prev.brand.filter(
                                  (item) => item !== b.brand
                                ),
                              };
                            });
                          }
                        }}
                        control={<Checkbox />}
                        label={b.brand}
                      />
                    </Grid>
                    <Typography variant="caption" color="text.secondary">
                      {b.count}
                    </Typography>
                  </Grid>
                ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Products */}
        <Grid size={{ xs: 9 }}>
          {/* Header with count + sort */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}>
            <Typography variant="h6">
              {_.startCase(category)} ({prod.length} Items)
            </Typography>
            <Select
              size="small"
              value={sort}
              onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="popularity">Sort by: Popularity</MenuItem>
              <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
              <MenuItem value="newest">Newest First</MenuItem>
            </Select>
          </Box>

          {/* Product Grid */}
          <Grid container spacing={2}>
            {prod.map((product) => (
              <Grid size={{ xs: 3 }} key={product.id}>
                <Card
                  sx={{
                    position: "relative",
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                      height: "100%",
                    },
                  }}>
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    image={product.img}
                    alt={product.title}
                    sx={{
                      objectFit: "cover",
                      height: 220,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />

                  {/* Product Info */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      pb: 8 /* leave space for bottom bar */,
                    }}>
                    <Typography variant="body2" noWrap fontWeight="bold">
                      {product.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block">
                      {product.brand} • {product.category}
                    </Typography>

                    <Typography variant="subtitle1" fontWeight="bold">
                      Rs. {product.price}{" "}
                      <Typography
                        component="span"
                        sx={{
                          textDecoration: "line-through",
                          color: "gray",
                          fontSize: "0.8rem",
                          ml: 1,
                        }}>
                        Rs. {product.oldPrice}
                      </Typography>
                    </Typography>

                    <Rating
                      name="read-only"
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </CardContent>

                  {/* Quick View - Centered Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      ".MuiCard-root:hover &": { opacity: 1 },
                      background: "rgba(0,0,0,0.4)",
                    }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: "rgba(0,0,0,0.4)",
                        color: "#ffffff",
                        textTransform: "uppercase",
                      }}
                      onClick={() =>
                        navigate(
                          `/product/${_.camelCase(product.title)}/${
                            product.id
                          }`,
                          {
                            replace: true,
                            state: { ...location.state, id: product.id },
                          }
                        )
                      }>
                      Quick View
                    </Button>
                  </Box>

                  {/* Colors & Sizes - Fixed at Bottom */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      p: 1,
                      background: "white",
                      borderTop: "1px solid #eee",
                      display: "none",
                      ".MuiCard-root": {
                        height: "80%",
                      },
                      ".MuiCard-root:hover &": {
                        display: "block",
                      },
                    }}>
                    {/* Colors */}
                    {product.colors && (
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Typography variant="caption" color="text.secondary">
                          Color:
                        </Typography>
                        {product.colors.map((c, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              border: "1px solid #ccc",
                              backgroundColor: c.name.toLowerCase(),
                              cursor: "pointer",
                            }}
                          />
                        ))}
                      </Box>
                    )}

                    {/* Sizes */}
                    {product.sizes && (
                      <Box display="flex" gap={1} flexWrap="wrap">
                        <Typography variant="caption" color="text.secondary">
                          Size:
                        </Typography>
                        {product.sizes.map((s, idx) => (
                          <Typography
                            key={idx}
                            variant="caption"
                            sx={{
                              px: 0.8,
                              py: 0.3,
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}>
                            {s}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
