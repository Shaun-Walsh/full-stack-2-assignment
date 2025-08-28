import React, { useContext } from "react"
import TVShowListPageTemplate from "../components/templateTvListPage";
import { TVShowContext } from "../contexts/tvShowContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import RemoveFromTVShowFavourites from "../components/cardIcons/removeFromTVShowFavourites";
import WriteTVShowReview from "../components/cardIcons/writeTVShowReview";


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteTVShowsPage: React.FC = () => {
  const { favourites: tvShowIds } = useContext(TVShowContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteTVShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvshow", tvShowId],
        queryFn: () => getTVShow(tvShowId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTVShowQueries.find((t) => t.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTVShowQueries.map((q) => q.data);
  const displayedTVShows = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

 return (
  <TVShowListPageTemplate
    title="Favourite TV Shows"
    tvShows={displayedTVShows}
    action={(tvShow) => {
      return (
        <>
          <RemoveFromTVShowFavourites {...tvShow} />
          <WriteTVShowReview {...tvShow} />
        </>
      );
    }}
  />
);
};

export default FavouriteTVShowsPage;
