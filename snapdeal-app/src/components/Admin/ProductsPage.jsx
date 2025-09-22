import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Box,
  CardMedia,
  Tooltip,
} from "@mui/material";
import _ from "lodash";
import { fetchProductDetails } from "../Utills/commonUtills";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ Fetch all products
  const getProductDetails = async () => {
    try {
      const res = await fetchProductDetails();
      const url = `http://localhost:7000/api/productDetails`;

      const resp = await fetch(url);
      const prod = await resp.json();
      setProducts([...res, ...prod]);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleOpen = (product = null) => {
    setEditingProduct(product || {});
    setOpen(true);
  };

  const handleClose = () => {
    // setEditingProduct(null);
    setOpen(false);
  };

  // ✅ Save Product (Add / Update)
  const handleSave = async () => {
    try {
      if (editingProduct.id) {
        // Update existing product
        const res = await fetch(
          `http://localhost:7000/api/productUpdate/${editingProduct.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingProduct),
          }
        );
        const result = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? result : p))
        );
      } else {
        // Add new product
        const res = await fetch("http://localhost:7000/api/productSave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(Math.floor(Math.random() * 100)),
            ...editingProduct,
          }),
        });
        const result = await res.json();
        setProducts((prev) => [...prev, result]);
      }
      handleClose();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // ✅ Delete Product
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:7000/api/productDelete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Product
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Old Price</TableCell>
            <TableCell>Colors</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sizes</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>SubCategory</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Highlights</TableCell>
            <TableCell>Country of Origin</TableCell>
            <TableCell>Common Name</TableCell>
            <TableCell>Seller Name</TableCell>
            <TableCell>Seller Rating</TableCell>
            <TableCell>Seller Store Link</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Recommendations (in %)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p = {}) => (
            <TableRow key={p.id}>
              <TableCell>
                <CardMedia
                  component="img"
                  image={p.img}
                  alt="preview"
                  sx={{
                    width: 100,
                    height: 150,
                    objectFit: "contain",
                    borderRadius: 2,
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>{p.oldPrice ? `₹${p.oldPrice}` : "-"}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {p.colors?.length ? (
                    p.colors.map((c, i) => (
                      <Box key={i} sx={{ textAlign: "center" }}>
                        <CardMedia
                          component="img"
                          src={c.img}
                          alt={c.name}
                          sx={{
                            width: 40,
                            height: 40,
                            objectFit: "contain",
                            borderRadius: 1,
                            mb: 0.5,
                          }}
                        />
                        <Typography variant="caption">{c.name}</Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            mt: 0.5,
                            flexWrap: "wrap",
                          }}>
                          {c.subColors?.map((sub, si) => (
                            <CardMedia
                              key={si}
                              component="img"
                              src={sub}
                              alt={`sub-${si}`}
                              sx={{
                                width: 25,
                                height: 25,
                                borderRadius: "4px",
                                objectFit: "cover",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2">-</Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                {p.colors?.length
                  ? p.colors.map((col) => {
                      return (
                        <Typography>
                          {col.name}-{col.quantity}
                        </Typography>
                      );
                    })
                  : "-"}
              </TableCell>

              {/* ✅ Sizes */}
              <TableCell>
                {p.sizes?.length ? p.sizes.join(", ") : "-"}
              </TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.subCategory || "-"}</TableCell>
              <TableCell>{p.brand}</TableCell>
              <TableCell>
                <Tooltip title={p.description}>
                  {p.description.slice(0, 20) || "-"}
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip
                  title={p.highlights?.length ? p.highlights.join(", ") : "-"}>
                  {p.highlights?.length
                    ? p.highlights.join(", ").slice(0, 20)
                    : "-"}
                </Tooltip>
              </TableCell>
              <TableCell>{p.specifications?.countryOfOrigin || "-"}</TableCell>
              <TableCell>{p.specifications?.commonName || "-"}</TableCell>
              <TableCell>{p.seller?.name || "-"}</TableCell>
              <TableCell>{p.seller?.rating || "-"}</TableCell>
              <TableCell>
                {p.seller?.storeLink ? (
                  <a
                    href={p.seller.storeLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    Store
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Rating value={p.rating || 0} precision={0.1} readOnly />
              </TableCell>
              <TableCell>{p.recommendations || 0}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(p)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct?.id ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          {/* Title */}
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={editingProduct?.title || ""}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
          />

          {/* Image URL */}
          <TextField
            fullWidth
            margin="dense"
            label="Image URL"
            value={editingProduct?.img || ""}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, img: e.target.value })
            }
          />

          {/* Price */}
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            type="number"
            value={editingProduct?.price || ""}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: +e.target.value })
            }
          />

          {/* Old Price */}
          <TextField
            fullWidth
            margin="dense"
            label="Old Price"
            type="number"
            value={editingProduct?.oldPrice || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                oldPrice: +e.target.value,
              })
            }
          />

          {/* Category */}
          <TextField
            fullWidth
            margin="dense"
            label="Category"
            value={_.startCase(editingProduct?.category) || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                category: _.camelCase(e.target.value),
              })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="SubCategory"
            value={_.startCase(editingProduct?.subCategory) || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                subCategory: _.camelCase(e.target.value),
              })
            }
          />

          {/* Brand */}
          <TextField
            fullWidth
            margin="dense"
            label="Brand"
            value={_.startCase(editingProduct?.brand) || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                brand: _.camelCase(e.target.value),
              })
            }
          />

          {/* Description */}
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            minRows={2}
            value={editingProduct?.description || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
          />

          {/* Highlights */}
          <TextField
            fullWidth
            margin="dense"
            label="Highlights (comma separated)"
            value={editingProduct?.highlights?.join(", ") || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                highlights: e.target.value.split(",").map((h) => h.trim()),
              })
            }
          />

          {/* Specifications */}
          <TextField
            fullWidth
            margin="dense"
            label="Country of Origin"
            value={editingProduct?.specifications?.countryOfOrigin || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                specifications: {
                  ...editingProduct.specifications,
                  countryOfOrigin: e.target.value,
                },
              })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Common Name"
            value={editingProduct?.specifications?.commonName || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                specifications: {
                  ...editingProduct.specifications,
                  commonName: e.target.value,
                },
              })
            }
          />

          {/* Seller Details */}
          <TextField
            fullWidth
            margin="dense"
            label="Seller Name"
            value={editingProduct?.seller?.name || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                seller: { ...editingProduct.seller, name: e.target.value },
              })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            type="number"
            label="Seller Rating"
            value={editingProduct?.seller?.rating || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                seller: { ...editingProduct.seller, rating: +e.target.value },
              })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Seller Store Link"
            value={editingProduct?.seller?.storeLink || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                seller: { ...editingProduct.seller, storeLink: e.target.value },
              })
            }
          />

          {/* Rating */}
          <TextField
            fullWidth
            margin="dense"
            type="number"
            label="Rating"
            value={editingProduct?.rating || ""}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, rating: +e.target.value })
            }
          />

          {/* Recommendations */}
          <TextField
            fullWidth
            margin="dense"
            type="number"
            label="Recommendations"
            value={editingProduct?.recommendations || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                recommendations: +e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Colors (format: name|img|sub1;sub2|qty, name|img|sub1;sub2|qty)"
            value={
              editingProduct?.colors
                ?.map(
                  (c) =>
                    `${c.name}|${c.img}|${
                      c.subColors ? c.subColors.join(";") : ""
                    }|${c.quantity ?? 0}`
                )
                .join(", ") || ""
            }
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                colors: e.target.value.split(",").map((c) => {
                  const [name, img, subs, qty] = c
                    .split("|")
                    .map((s) => s.trim());
                  return {
                    name,
                    img,
                    subColors: subs ? subs.split(";").map((s) => s.trim()) : [],
                    quantity: qty ? Number(qty) : 0,
                  };
                }),
              })
            }
          />

          {/* Sizes */}
          <TextField
            fullWidth
            margin="dense"
            label="Sizes (comma separated)"
            value={editingProduct?.sizes?.join(", ") || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />

          {/* Image Preview */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            {editingProduct?.img && (
              <CardMedia
                component="img"
                image={editingProduct.img}
                alt="preview"
                sx={{
                  width: 200,
                  height: 150,
                  objectFit: "contain",
                  borderRadius: 2,
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
