import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardMedia,
  Rating,
} from "@mui/material";
import AddToCartButton from "./AddToCartButton";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDetailsPage from "./ReviewProduct";
import { fetchProductDetails } from "../Utills/commonUtills";
import { useSelector, useDispatch } from "react-redux";
import { storeProduct } from "../ReduxToolkit/ProductSlice";
import { currentCartItem, isBuyNowAction } from "../ReduxToolkit/CartSlice";
import SizeChartDialog from "./SizeChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addPincode, removePincode } from "../ReduxToolkit/PincodeSlice";
import ImageZoom from "./ImageZoom";
const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const [selectedSize, setSelectedSize] = useState(null);

  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [selectedSubImage, setSelectedSubImage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(({ products }) => products) || [];
  const { pincode: isPincode } = useSelector(({ pincode }) => pincode);

  const handleClose = () => {
    setOpen(false);
  };

  const getProductDetails = async () => {
    try {
      const data = await fetchProductDetails();
      const url = `http://localhost:7000/api/productDetails`;

      const resp = await fetch(url);
      const prod = await resp.json();
      if (data?.length) {
        setProduct([...data, ...prod]);
        dispatch(storeProduct([...data, ...prod]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const filteredProduct = products.length ? products : product;
  const selectedProduct = filteredProduct?.find(
    (item) => item.id === location?.state?.id
  );

  useEffect(() => {
    if (!products.length) {
      getProductDetails();
    }
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      dispatch(currentCartItem(selectedProduct));
      setSelectedSize(selectedProduct?.sizes?.[0] || null);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return <div className="nodata">No Data Found</div>;

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={15}>
          {/* Left Section (Images) */}
          <Grid size={{ xs: 5 }} container spacing={2}>
            {/* SubColor thumbnails */}
            <Grid size={{ xs: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}>
                {selectedProduct?.colors?.[selectedImage]?.subColors?.map(
                  (sub, i) => (
                    <CardMedia
                      key={i}
                      component="img"
                      src={sub}
                      alt={`sub-${i}`}
                      onClick={() => setSelectedSubImage(i)}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                        cursor: "pointer",
                        border:
                          i === selectedSubImage
                            ? "2px solid #1976d2"
                            : "1px solid #ddd",
                      }}
                    />
                  )
                )}
              </Box>
            </Grid>

            {/* Main Image */}
            <Grid size={{ xs: 10 }}>
              <ImageZoom
                src={
                  selectedProduct?.colors?.[selectedImage]?.subColors?.[
                    selectedSubImage
                  ] ||
                  selectedProduct?.colors?.[selectedImage]?.img ||
                  selectedProduct?.img
                }
                zoom={2.5}
                width={400}
                height={500}
                previewWidth={500}
                previewHeight={500}
                offset={24}
              />
            </Grid>
          </Grid>

          {/* Right Section (Details) */}
          <Grid size={{ xs: 7 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {selectedProduct?.title}
            </Typography>

            {/* Dynamic Ratings */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={selectedProduct?.rating || 0}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({selectedProduct?.rating}) | {selectedProduct?.reviews?.length}{" "}
                Reviews
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through", color: "gray" }}>
                ₹{selectedProduct?.oldPrice}
              </Typography>
              <Typography variant="h5" color="error" fontWeight="bold">
                ₹{selectedProduct?.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  border: "1px solid #ddd",
                  px: 1,
                  borderRadius: 1,
                  color: "gray",
                }}>
                {Math.round(
                  ((selectedProduct?.oldPrice - selectedProduct?.price) /
                    selectedProduct?.oldPrice) *
                    100
                )}
                % OFF
              </Typography>
            </Box>

            {/* Color Selection */}
            <Grid sx={{ mt: 3, alignItems: "center" }} container spacing={4}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Color
              </Typography>
              <Grid container spacing={1} sx={{ mt: 2 }}>
                {selectedProduct?.colors?.map((color, idx) => (
                  <Grid item xs={3} key={idx}>
                    <Card
                      onClick={() => {
                        setSelectedImage(idx);
                      }}
                      sx={{
                        border:
                          idx === selectedImage
                            ? "2px solid #1976d2"
                            : "1px solid #ddd",
                        cursor: "pointer",
                      }}>
                      <CardMedia
                        component="img"
                        image={color.img}
                        alt={color.name}
                        sx={{ height: 80, objectFit: "contain" }}
                      />
                    </Card>
                    <Typography
                      variant="caption"
                      display="block"
                      align="center"
                      sx={{ mt: 0.5 }}>
                      {color.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Size Selection */}
            <Grid sx={{ mt: 3 }} container spacing={2} size={{ xs: 12 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Size
              </Typography>
              <Grid container spacing={2} size={{ xs: 6 }}>
                {selectedProduct?.sizes?.map((size) => (
                  <Button
                    key={size}
                    variant={size === selectedSize ? "contained" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      minWidth: 40,
                      borderRadius: 1,
                      textTransform: "none",
                    }}>
                    {size}
                  </Button>
                ))}
              </Grid>
              <Typography
                variant="body2"
                onClick={() => setOpen(true)}
                sx={{ mt: 1, color: "primary.main", cursor: "pointer" }}>
                Size Chart
              </Typography>
            </Grid>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3, width: 500 }}>
              <AddToCartButton product={{ ...selectedProduct }} />
              <Button
                onClick={() => {
                  dispatch(isBuyNowAction(true));
                  navigate("/cart");
                }}
                variant="contained"
                sx={{
                  bgcolor: "#e91e63",
                  "&:hover": { bgcolor: "#d81b60" },
                  flex: 1,
                  width: 10,
                  height: 50,
                }}>
                <ShoppingCartIcon />
                BUY NOW
              </Button>
            </Box>

            {/* Pincode Check */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 3 }}>
              {isPincode ? (
                <Typography>Item is available at {isPincode}.</Typography>
              ) : (
                <TextField
                  size="small"
                  placeholder="Enter pincode"
                  onChange={(e) => setPincode(e.target.value)}
                />
              )}
              {isPincode ? (
                <Button
                  variant="outlined"
                  onClick={() => dispatch(removePincode())}>
                  Change
                </Button>
              ) : (
                <Button
                  onClick={() => dispatch(addPincode(pincode))}
                  variant="contained"
                  sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}>
                  CHECK
                </Button>
              )}
              <Typography variant="body2" color="text.secondary">
                Generally delivered in 6 - 10 days
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Reviews Section */}
      <ProductDetailsPage id={location?.state?.id} products={product} />
      <SizeChartDialog open={open} onClose={handleClose} />
    </>
  );
};

export default ProductPage;
