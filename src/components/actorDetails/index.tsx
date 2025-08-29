import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import { ActorDetailsProps } from "../../types/interfaces";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
};

const ActorDetails: React.FC<ActorDetailsProps> = (actor) => {
    return (
        <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>

            <Typography variant="h6" component="p">
                {actor.biography || "No biography available."}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                {actor.birthday && (
                    <Chip 
                        icon={<AccessTimeIcon />} 
                        label={`Born: ${actor.birthday}`} 
                    />
                )}
                {actor.place_of_birth && (
                    <Chip 
                        icon={<LocationOnIcon />} 
                        label={actor.place_of_birth} 
                    />
                )}
                <Chip 
                    icon={<WorkIcon />} 
                    label={actor.known_for_department} 
                />
            </Paper>
        </>
    );
};

export default ActorDetails;
