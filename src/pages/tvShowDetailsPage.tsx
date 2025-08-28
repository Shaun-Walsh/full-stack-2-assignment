import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TVShowDetails from "../components/tvShowDetails";
import PageTemplate from "../components/templateTVShowPage";
// import useTVShow from "../hooks/useTVShow";   Redundant
import { getTVShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TVShowDetailsProps } from "../types/interfaces";

const TVShowDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: tvShow, error, isLoading, isError } = useQuery<TVShowDetailsProps, Error>(
    ["tvshow", id],
    ()=> getTVShow(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tvShow ? (
        <>
        <PageTemplate tvShow={tvShow}> 
          <TVShowDetails {...tvShow} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for TV show details</p>
    )}
    </>
  );
};

export default TVShowDetailsPage;
