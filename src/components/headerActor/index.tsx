import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ActorDetailsProps } from "../../types/interfaces";

const styles = {
    root: {  
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1.5,
    },
};

const ActorHeader: React.FC<ActorDetailsProps> = (actor) => {
  return (
    <Paper component="div" sx={styles.root}>
      <Typography variant="h4" component="h3">
        {actor.name}
      </Typography>
    </Paper>
  );
};

export default ActorHeader;
