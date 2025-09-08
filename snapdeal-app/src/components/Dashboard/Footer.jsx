import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const features = [
  {
    icon: <LockIcon sx={{ fontSize: 50, color: "#e40046" }} />,
    title: "100% SECURE PAYMENTS",
    desc: "Moving your card details to a much more secured place",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 50, color: "#2e7d32" }} />,
    title: "TRUSTPAY",
    desc: "100% Payment Protection. Easy Return Policy",
  },
  {
    icon: <HelpOutlineIcon sx={{ fontSize: 50, color: "#0288d1" }} />,
    title: "HELP CENTER",
    desc: "Got a question? Look no further. Browse our FAQs or submit your query here.",
  },
  {
    icon: <SmartphoneIcon sx={{ fontSize: 50, color: "#f57c00" }} />,
    title: "SHOP ON THE GO",
    desc: "Download the app and get exciting app only offers at your fingertips",
  },
];

export default function Footer() {
  return (
    <Box>
      <Box sx={{ p: 4, backgroundColor: "#fff" }}>
        <Grid container spacing={4}>
          {features.map((item, index) => (
            <Grid size={{ xs: 3 }} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  px: 2,
                  borderRight:
                    index !== features.length - 1 ? "1px solid #eee" : "none",
                }}>
                {item.icon}
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mt: 1, mb: 0.5 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ backgroundColor: "#fafafa", p: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 3 }}>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>
              POLICY INFO
            </Typography>
            {[
              "Privacy Policy",
              "Terms of Sale",
              "Terms of Use",
              "Report Abuse & Takedown Policy",
              "Know Your BIS Standard",
              "Products Under Compulsory BIS Certification",
              "FAQ",
            ].map((text, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                {text}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 2 }}>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>COMPANY</Typography>
            {["About Us", "Careers", "Blog", "Sitemap", "Contact Us"].map(
              (text, i) => (
                <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                  {text}
                </Typography>
              )
            )}
          </Grid>

          <Grid size={{ xs: 2 }}>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>
              SNAPDEAL BUSINESS
            </Typography>
            {["Shopping App", "Sell on Snapdeal", "Media Enquiries"].map(
              (text, i) => (
                <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                  {text}
                </Typography>
              )
            )}
          </Grid>

          <Grid size={{ xs: 2 }}>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>
              POPULAR LINKS
            </Typography>
            {[
              "Lehenga",
              "Kid’s Clothing",
              "Sarees",
              "Winter Wear",
              "Sweatshirts",
            ].map((text, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                {text}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 3 }}>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>
              SUBSCRIBE
            </Typography>
            <Box sx={{ display: "flex", mb: 1 }}>
              <TextField
                placeholder="Your email address"
                variant="outlined"
                size="small"
                fullWidth
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#333",
                  borderRadius: 0,
                  ml: 1,
                  "&:hover": { backgroundColor: "#555" },
                }}>
                SUBSCRIBE
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Register now to get updates on promotions and coupons.{" "}
              <span style={{ color: "#0288d1", cursor: "pointer" }}>
                Or Download App
              </span>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={40}
          sx={{ mt: 4, borderTop: "1px solid #eee", pt: 3 }}>
          <Grid size>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>PAYMENT</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="Visa"
                sx={{ width: 50, height: 30, objectFit: "contain" }}
              />
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="MasterCard"
                sx={{ width: 50, height: 30, objectFit: "contain" }}
              />
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg"
                alt="RuPay"
                sx={{ width: 50, height: 30, objectFit: "contain" }}
              />
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg"
                alt="UPI"
                sx={{ width: 50, height: 30, objectFit: "contain" }}
              />
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Netbanking.svg"
                alt="Net Banking"
                sx={{ width: 50, height: 30, objectFit: "contain" }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 2 }}>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>CONNECT</Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <IconButton>
                <FacebookIcon color="primary" fontSize="large" />
              </IconButton>
              <IconButton>
                <TwitterIcon sx={{ color: "#1DA1F2" }} fontSize="large" />
              </IconButton>
              <IconButton>
                <InstagramIcon sx={{ color: "#E4405F" }} fontSize="large" />
              </IconButton>
              <IconButton>
                <LinkedInIcon sx={{ color: "#0A66C2" }} fontSize="large" />
              </IconButton>
              <IconButton>
                <YouTubeIcon sx={{ color: "red" }} />
              </IconButton>
              <IconButton>
                <TelegramIcon sx={{ color: "#229ED9" }} fontSize="large" />
              </IconButton>
              <IconButton>
                <WhatsAppIcon sx={{ color: "#25D366" }} fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#555",
          color: "#fff",
          "&:hover": { bgcolor: "#333" },
        }}>
        <ArrowUpwardIcon />
      </IconButton>
      <Box sx={{ backgroundColor: "#fafafa", p: 4 }}>
        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Men:
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Shirts for Men / Casual Shirts for Men / Formal Shirts for Men /
            Hoodies for Men / Cotton Shirts for Men / T Shirts for Men / Polo T
            shirts / Kurta Pajama for Men / White Shirt / Black Shirt / Lower
            for Men / Trousers for Men / Jacket for Men / Formal Pants for Men /
            Tracksuit for Men / Jeans for Men / Kurta Pyjama Sets / Kurta for
            Men / Blazer for Men / Sweater for Men
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Women:{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Tops for Women / Kurti / Cotton Sarees / Georgette Sarees / Chiffon
            Sarees / Net Sarees / Dresses for Women / Jumpsuit for Women / Jeans
            for Women / Salwar Suit / Bra / Jacket for Women / Night Dress for
            Women / Sweatshirt for Women / Shorts for Women / Readymade Blouse /
            Dupatta / T Shirt for Women / Shirts for Women / Skirts for Women /
            Ethnic wear for Women / Western Dresses for Women / Leggings for
            Women
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Footwear:{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Men’s Footwear / Casual Shoes for Men / Formal Shoes for Men /
            Loafers for Men / Slippers for Men / Boots for Men / Sandals for
            Women / Slippers for Women / Boots for Women / Jutti for Women /
            Sports Shoes for Women
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Home & Kitchen:{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Wall Painting / Wall Stickers / Dream Catcher / Rangoli Designs /
            Clock / Wall Clock / Alarm Clock / Diya / Wall Hanging / Ceiling
            Lights / Table Lamp / Hanging Lights / LED Bulbs / Torch Light /
            Flower Vase / Keychain / Rudraksha / Screwdriver
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Watch:{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Watch For Men / Womens Watches / Smart Watch / Boys Watch / Girls
            Watch
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Home Furnishing:{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Bed Sheet / Mosquito Net / Mattress / Curtains / Sofa Cover /
            Blanket / Pillow / Carpet / Apron / Quilt / Floor Mat / Towel /
            Pillow Cover
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Electronics:{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Bluetooth Speakers / Headphones / Earphone / Ceiling Fan / Geysers /
            Trimmer / Hair Straightener / Hair Dryer / Water Purifier / Mixer
            Grinder / Gas Stove / Electric Kettle / Computer Mouse / Computer
            Keyboard / USB & HDMI Cables / Computer Antivirus
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Mobiles Accessories:{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "inline", color: "text.secondary" }}>
            Mobile Covers / Leather Mobile Covers / Printed Back Covers /
            Tempered Glass
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Snapdeal is India’s leading pure-play value Ecommerce platform.
            Founded in 2010 by Kunal Bahl and Rohit Bansal, Snapdeal is one of
            the top four online lifestyle shopping destinations of India.
            Snapdeal brings together a wide assortment of good quality and
            value- priced merchandise on its platform. Snapdeal’s vision is to
            enable the shoppers of Bharat to experience the joy of living their
            aspirations through reliable, value-for-money shopping. With a
            personalized, multilingual interface and cutting edge technology,
            Snapdeal has simplified the shopping experience for its
            value-conscious buyers by showcasing the most relevant products -
            products that are a good functional fit with their needs and of a
            quality that lasts- thereby delivering true value to its customers.
            With its commitment to high service standards, Snapdeal suppliers
            operate under a well structured ecosystem that enables them to offer
            great quality products at affordable prices. With majority of the
            value-seeking, middle-income, price-conscious buyers coming from the
            non-metros, Snapdeal’s logistics networks powered by third party
            logistics cover more than 96% of India’s pin codes enabling order
            deliveries to more than 2500 towns and cities and expanding.
            Further, Snapdeal’s mission is to become India’s value lifestyle
            omni-channel leader. We are excited about continuing to build a
            complete ecosystem around value commerce, where we can serve Bharat
            consumers wherever they are on their offline to online shopping
            journey. Snapdeal is part of the AceVector Group and one of India’s
            best-known e-commerce companies with an exclusive focus on the value
            segment.
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid #ddd",
              pt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}>
            <Typography variant="body2" color="text.secondary">
              Copyright © 2021, Snapdeal Limited. All Rights Reserved
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              Made for Bharat ❤️
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
