import React from "react";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import itemData from "./Image.json";

function StandardImageList() {
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ImageList
        sx={{
          width: { xs: 350, sm: 700, md: 950 },
          height: { xs: 500, sm: 900, md: 550 },
          p: 2,
        }}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleImageClick(item.id)}
            sx={{ cursor: "pointer" }}
          >
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar title={item.title} sx={{ height: 35 }} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default StandardImageList;
