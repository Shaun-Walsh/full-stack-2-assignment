import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { TVShowDetailsProps } from "../../types/interfaces"; 
import FavoriteIcon from "@mui/icons-material/Favorite";
import { json } from "react-router-dom";

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};


const TVShowHeader: React.FC<TVShowDetailsProps> = (tvShow) => {
  const favourites = JSON.parse(localStorage.getItem("tvfavourites") || "[]");
  const isFavourite = favourites.some(fav => fav.id === tvShow.id);
  
  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {tvShow.name}{"   "}
        <a href={`https://www.themoviedb.org/tv/${tvShow.id}`}>
          <HomeIcon color="primary"  fontSize="large"/>
        </a>
        <br />
        <span>{`First Air Date: ${tvShow.first_air_date}`} </span>
        {isFavourite && <FavoriteIcon color="error" fontSize="large" />}
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TVShowHeader;
