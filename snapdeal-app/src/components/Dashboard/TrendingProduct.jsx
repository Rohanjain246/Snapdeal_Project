import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import Slider from "react-slick";
import { storeProduct } from "../ReduxToolkit/ProductSlice";
import { fetchProductDetails } from "../Utills/commonUtills";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingProducts = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getProductDetails = async () => {
    try {
      const data = await fetchProductDetails();
      if (data?.length) {
        setProducts(data);
        dispatch(storeProduct(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  // Custom arrows
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          right: -15,
          top: "40%",
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}>
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          left: -15,
          top: "40%",
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}>
        <ArrowBackIos fontSize="small" />
      </IconButton>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ my: 4, position: "relative" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Slider {...settings}>
        {products.map((item) => (
          <Box key={item.id} sx={{ px: 1 }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)", cursor: "pointer" },
              }}
              onClick={() =>
                navigate(`/product/${_.camelCase(item.title)}/${item.id}`, {
                  replace: true,
                  state: { ...location.state, id: item.id },
                })
              }>
              <CardMedia
                component="img"
                image={item.img}
                alt={item.title}
                sx={{
                  height: 150,
                  objectFit: "contain",
                  backgroundColor: "#f9f9f9",
                  p: 1,
                }}
              />

              <CardContent sx={{ p: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    minHeight: 40,
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                  gutterBottom>
                  {item.title}
                </Typography>

                {item.rating && (
                  <Rating
                    name="read-only"
                    value={item.rating}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                )}

                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}>
                  {item.oldPrice && (
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "#878787",
                        fontSize: "0.8rem",
                      }}>
                      ₹{item.oldPrice}
                    </Typography>
                  )}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#333",
                      fontSize: " 13px",
                    }}>
                    ₹{item.price}
                  </Typography>
                  {item.oldPrice && (
                    <Chip
                      label={`${Math.round(
                        ((item.oldPrice - item.price) / item.oldPrice) * 100
                      )}% OFF`}
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        borderRadius: 1,
                        border: "1px solid #ccc",
                        bgcolor: "transparent",
                        color: "#999",
                      }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TrendingProducts;
