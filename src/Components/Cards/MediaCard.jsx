import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function MediaCard({ title, paragraph, imgsrc, textBtn, link }) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        m: 5,
        boxShadow: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardMedia sx={{ height: 250 }} title="L'airsoft" image={imgsrc} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textOverflow: "ellipsis" }}
        >
          {paragraph}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
          gap: 1.5,
        }}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: "#728996", "&:hover": { bgcolor: "#5f6d7d" } }}
          size="small"
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to={link}>
            {textBtn}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
