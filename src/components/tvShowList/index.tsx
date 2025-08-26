import React from "react";
import TVShowCard from "../tvShowCard/";
import Grid from "@mui/material/Grid";
import { BaseTVShowListProps } from "../../types/interfaces";

const TVList: React.FC<BaseTVShowListProps> = ({tvShows, action}) => {

  const tvShowCards = tvShows.map((t) => (
    <Grid key={t.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TVShowCard key={t.id} tvShow={t} action={action}/>

    </Grid>
  ));
  return tvShowCards;
}

  export default TVList;