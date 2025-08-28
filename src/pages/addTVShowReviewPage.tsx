import React from "react";
import PageTemplate from "../components/templateTVShowPage";
import TVShowReviewForm from "../components/tvShowReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseTVShowProps, TVShowDetailsProps } from "../types/interfaces";

const WriteTVShowReviewPage: React.FC = () => {
    const location = useLocation()
    const { tvShowId } = location.state;
    const { data: tvShow, error, isLoading, isError } = useQuery<TVShowDetailsProps, Error>(
        ["tvShow", tvShowId],
        () => getTVShow(tvShowId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {tvShow ? (
                    <PageTemplate tvShow={tvShow}>
                        <TVShowReviewForm {...tvShow} />
                    </PageTemplate>
            ) : (
                <p>Waiting for TV show review details</p>
            )}
        </>
    );
};

export default WriteTVShowReviewPage;
