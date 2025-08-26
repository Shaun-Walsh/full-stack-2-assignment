import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TVShowList from "../tvShowList";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({
  tvShows,
  title,
  action,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TVShowList action={action} tvShows={tvShows}></TVShowList>
      </Grid>
    </Grid>
  );
};
export default TVShowListPageTemplate;
