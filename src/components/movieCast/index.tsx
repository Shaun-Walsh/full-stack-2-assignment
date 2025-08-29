import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { getMovieCredits } from "../../api/tmdb-api";
import { MovieCredits, CastMember } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";

const styles = {
    root: {
        marginTop: 2,
    },
    card: { 
        maxWidth: 200, 
        margin: 1 
    },
    media: { 
        height: 300 
    },
};

interface MovieCastProps {
    movieId: number;
}

const MovieCast: React.FC<MovieCastProps> = ({ movieId }) => {
    const [cast, setCast] = useState<CastMember[]>([]);

    useEffect(() => {
        getMovieCredits(movieId).then((credits: MovieCredits) => {
            setCast(credits.cast);
        });
    }, [movieId]);

    return (
        <>
            <Typography variant="h5" component="h3" sx={styles.root}>
                Cast
            </Typography>

            <Grid container spacing={2}>
                {cast.map((member: CastMember) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={member.credit_id}>
                        <Link to={`/actor/${member.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={styles.card}>
                                <CardMedia
                                    sx={styles.media}
                                    image={
                                        member.profile_path
                                            ? `https://image.tmdb.org/t/p/w300${member.profile_path}`
                                            : img
                                    }
                                    title={member.name}
                                />
                                <CardContent>
                                    <Typography variant="subtitle2" component="p">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="caption" component="p" color="text.secondary">
                                        {member.character}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default MovieCast;
