// ImageZoom.js
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Box, CardMedia } from "@mui/material";

/**
 * Usage:
 * <ImageZoom
 *   src={imageUrl}
 *   zoom={2.5}
 *   width={400}
 *   height={400}
 *   lensSize={120}
 *   previewWidth={450}
 *   previewHeight={450}
 *   offset={16}
 * />
 */
export default function ImageZoom({
  src,
  zoom = 2,
  width = 400,
  height = 400,
  lensSize = 120,
  previewWidth = 450,
  previewHeight = 450,
  offset = 16, // distance (px) from image to preview box
}) {
  const imgRef = useRef(null);
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState(null);
  const [portalEl, setPortalEl] = useState(null);

  // create a container div appended to body for the preview (portal)
  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setPortalEl(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  const handleEnter = () => {
    if (!imgRef.current) return;
    setRect(imgRef.current.getBoundingClientRect());
    setShow(true);
  };

  const handleMove = (e) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    let x = e.clientX - r.left; // relative to image
    let y = e.clientY - r.top;
    // clamp inside image
    x = Math.max(0, Math.min(x, r.width));
    y = Math.max(0, Math.min(y, r.height));
    setPos({ x, y });
    setRect(r);
  };

  const handleLeave = () => setShow(false);

  // background size for preview
  const bgW = (rect?.width || width) * zoom;
  const bgH = (rect?.height || height) * zoom;

  // compute top-left of the background area we want to show (in px)
  const rawX = Math.round(pos.x * zoom - previewWidth / 2);
  const rawY = Math.round(pos.y * zoom - previewHeight / 2);

  // clamp background position so we don't show blank areas
  const boundedX = Math.max(0, Math.min(bgW - previewWidth, rawX || 0));
  const boundedY = Math.max(0, Math.min(bgH - previewHeight, rawY || 0));

  // compute preview placement in viewport coords (right side)
  const previewLeft = (rect?.left || 0) + (rect?.width || width) + offset;
  const previewTop = rect?.top || 0;

  return (
    <>
      {/* MAIN IMAGE (stays unchanged) */}
      <Box
        sx={{
          position: "relative",
          width,
          height,
          border: "1px solid #ddd",
          overflow: "hidden",
        }}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}>
        <CardMedia
          component="img"
          ref={imgRef}
          image={src}
          alt="product"
          sx={{ maxWidth: 400, objectFit: "cover" }}
        />

        {/* lens overlay */}
        {show && rect && (
          <Box
            sx={{
              position: "absolute",
              left: pos.x - lensSize / 2,
              top: pos.y - lensSize / 2,
              width: lensSize,
              height: lensSize,
              border: "1px solid rgba(25,118,210,0.9)",
              backgroundColor: "rgba(255,255,255,0.25)",
              pointerEvents: "none",
              boxSizing: "border-box",
            }}
          />
        )}
      </Box>

      {/* PORTAL: Zoom preview rendered into body, positioned beside the image */}
      {portalEl &&
        show &&
        ReactDOM.createPortal(
          <Box
            sx={{
              width: previewWidth,
              height: previewHeight,
              border: "1px solid #ddd",
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${bgW}px ${bgH}px`,
              backgroundPosition: `-${boundedX}px -${boundedY}px`,
              boxShadow: 3,
              position: "absolute",
              left: `${previewLeft}px`,
              top: `${previewTop}px`,
              zIndex: 9999,
            }}
          />,
          portalEl
        )}
    </>
  );
}
