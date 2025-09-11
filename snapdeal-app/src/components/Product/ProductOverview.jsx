import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardMedia,
} from "@mui/material";
import AddToCartButton from "./AddToCartButton";
import { useLocation } from "react-router-dom";
import ProductDetailsPage from "./ReviewProduct";
import { fetchProductDetails } from "../Utills/commonUtills";
import { useSelector, useDispatch } from "react-redux";
import { storeProduct } from "../ReduxToolkit/ProductSlice";
import { currentCartItem, isBuyNowAction } from "../ReduxToolkit/CartSlice";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(({ products }) => products) || [];

  const getProductDetails = async () => {
    const data = await fetchProductDetails();
    setProduct(data);
    dispatch(storeProduct(data));
  };
  if (!product.length) {
    <div className="nodata">No Data Found</div>;
  }
  const filteredProduct = products.length ? products : product;
  const selectedProduct = filteredProduct?.find(
    (item) => item.id === location?.state?.id
  );
  useEffect(() => {
    if (!products.length) {
      getProductDetails();
    }
  }, []);
  dispatch(currentCartItem(selectedProduct));

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={15}>
          {/* Left Section (Images) */}
          <Grid size={{ xs: 4 }}>
            <Card sx={{ boxShadow: "none" }}>
              <CardMedia
                component="img"
                image={selectedProduct?.img || ""}
                alt="product"
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  objectFit: "cover",
                }}
              />
            </Card>
            {}
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {new Array(4).fill(selectedProduct?.img || "").map((img, idx) => (
                <Grid item xs={3} key={idx}>
                  <Card
                    onClick={() => setSelectedImage(idx)}
                    sx={{
                      border:
                        idx === selectedImage
                          ? "2px solid #e91e63"
                          : "1px solid #ddd",
                      cursor: "pointer",
                    }}>
                    <CardMedia
                      component="img"
                      image={img}
                      alt="thumb"
                      sx={{ height: 80, objectFit: "contain" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Section (Details) */}
          <Grid size={{ xs: 8 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {selectedProduct?.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              ★★★☆☆ (3.7) | 2214 Ratings | 15 Reviews |{" "}
              <a href="#">Have a question?</a>
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through", color: "gray" }}>
                ₹{Number(selectedProduct?.price) * 4.5}
              </Typography>
              <Typography variant="h5" color="error" fontWeight="bold">
                {selectedProduct?.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  border: "1px solid #ddd",
                  px: 1,
                  borderRadius: 1,
                  color: "gray",
                }}>
                78% OFF
              </Typography>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
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
                }}>
                BUY NOW
              </Button>
            </Box>

            {/* Pincode Check */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 3 }}>
              <TextField size="small" placeholder="Enter pincode" />
              <Button
                variant="contained"
                sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}>
                CHECK
              </Button>
              <Typography variant="body2" color="text.secondary">
                Generally delivered in 6 - 10 days
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ProductDetailsPage id={location?.state?.id} products={product} />
    </>
  );
};

export default ProductPage;
