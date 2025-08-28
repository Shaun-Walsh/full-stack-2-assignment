import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {BaseTVShowProps} from "../../types/interfaces"
import { Link } from "react-router-dom";

const WriteTVShowReviewIcon:React.FC<BaseTVShowProps> = (tvShow) => {
  return (
    <Link
    to={'/tv/reviews/form'}
    state={{
        tvShowId: tvShow.id,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteTVShowReviewIcon;
