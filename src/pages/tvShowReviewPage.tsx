import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTVShowPage";
import TVShowReview from "../components/tvShowReview";

const TVShowReviewPage: React.FC = () => {
  const { state : {tvShow, review } } = useLocation()
  return (
    <PageTemplate tvShow={tvShow}>
      <TVShowReview {...review} />
    </PageTemplate>
  );
};

export default TVShowReviewPage;
