import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TVShowContext } from "../../contexts/tvShowContext";
import {BaseTVShowProps} from "../../types/interfaces";

const RemoveFromTVShowFavouritesIcon: React.FC<BaseTVShowProps> = (tvShow) => {
  const context = useContext(TVShowContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(tvShow);
  };

return (
  <IconButton
    aria-label="remove from favorites"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromTVShowFavouritesIcon;
