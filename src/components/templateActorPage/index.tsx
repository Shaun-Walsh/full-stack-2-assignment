import React from "react";  // useState/useEffect redundant 
import ActorHeader from "../headerActor";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ActorDetailsProps } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TemplateActorPageProps {
    actor: ActorDetailsProps;
    children: React.ReactElement;
}

const TemplateActorPage: React.FC<TemplateActorPageProps> = ({actor, children}) => {
    const actorImage = actor.profile_path 
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : img;

    return (
        <>
            <ActorHeader {...actor} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            <ImageListItem
                                sx={styles.gridListTile}
                                cols={1}
                            >
                                <img
                                    src={actorImage}
                                    alt={actor.name}
                                />
                            </ImageListItem>
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateActorPage;
