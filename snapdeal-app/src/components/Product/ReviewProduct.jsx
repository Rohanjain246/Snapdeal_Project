import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Rating,
  Link,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  TextField,
  CardMedia,
  Paper,
} from "@mui/material";

export default function ProductDetailsPage({ id, products }) {
  const [tabValue, setTabValue] = React.useState(0);

  const product = products.find((item) => item.id === id) || {};

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      {/* Left Section */}
      <Grid item xs={12} md={8}>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Item Details" />
          <Tab label="Ratings & Reviews" />
          <Tab label="Questions & Answers" />
        </Tabs>

        {/* ✅ Item Details */}
        {tabValue === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Highlights</Typography>
            <List>
              {product?.highlights?.map((highlight, i) => (
                <ListItem key={i}>
                  <ListItemText primary={highlight} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Other Specifications</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">
                Country of Origin:{" "}
                <b>{product?.specifications?.countryOfOrigin}</b>
              </Typography>
              <Typography variant="body2">
                Common Name: <b>{product?.specifications?.commonName}</b>
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Description</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {product?.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Terms & Conditions</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              The images represent actual product though color of the image and
              product may slightly differ. Seller is responsible for product
              details.
            </Typography>
          </Box>
        )}

        {/* ✅ Ratings & Reviews */}
        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="h4">{product?.rating}</Typography>
                <Rating value={product?.rating} precision={0.1} readOnly />
                <Typography variant="body2">
                  {product?.reviews?.length} Reviews
                </Typography>
                <Link href="#">View All Reviews</Link>
              </Grid>

              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Grid item>
                <Typography variant="h6">
                  {product?.recommendations}%
                </Typography>
                <Typography variant="body2">
                  Based on recommendations.
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Button variant="outlined" size="small">
                    YES
                  </Button>
                  <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                    NO
                  </Button>
                </Box>
              </Grid>

              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Grid item>
                <Typography variant="body2">
                  Have you used this product?
                </Typography>
                <Button variant="contained" sx={{ mt: 1 }}>
                  REVIEW
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Customer Reviews</Typography>
            <TextField
              size="small"
              placeholder="Search customer reviews"
              sx={{ my: 2, width: "40%" }}
            />

            {product?.reviews?.map((review, i) => (
              <Card key={i} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body2">
                    ⭐{"".repeat(review.stars)} {review.comment} –{" "}
                    <b>{review.user}</b>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Grid>

      {/* ✅ Right Sidebar */}
      <Grid item xs={12} md={4}>
        {/* Seller Info */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="body2">Sold by</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {product?.seller?.name}
          </Typography>
          <Rating value={product?.seller?.rating} readOnly size="small" />
          <Link
            href={product?.seller?.storeLink}
            sx={{ display: "block", mt: 1 }}>
            View Store
          </Link>
        </Paper>

        {/* Explore More */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Explore More &gt; {product?.category}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            More {product?.category} from {product?.brand}
          </Typography>
          <Link href="#">In Same Price &gt;</Link>
        </Paper>

        {/* Product Image + Price */}
        <Card sx={{ textAlign: "center", p: 2 }}>
          <CardMedia
            component="img"
            image={product?.img}
            alt={product?.title}
            sx={{ width: "150px", mx: "auto" }}
          />
          <CardContent>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {product?.title}
            </Typography>
            <Typography variant="h6" color="error">
              Rs. {product.price}{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ textDecoration: "line-through", ml: 1 }}>
                Rs. {product.oldPrice}
              </Typography>
            </Typography>
            <Button variant="contained" color="error" sx={{ mt: 2 }}>
              BUY NOW
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
