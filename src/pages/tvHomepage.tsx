import React from "react";
import TVShowListPageTemplate from "../components/templateTvListPage";
import { getTVShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { DiscoverTVShows, BaseTVShowProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToTVShowFavouritesIcon from "../components/cardIcons/addToTVShowFavourites";

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

const TVHomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>(
    "discover-tv",
    getTVShows
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvShows = data ? data.results : [];
  const displayedTVShows = filterFunction(tvShows);
  // const displayedTVShows = tvShows;

  return (
    <>
      <TVShowListPageTemplate
        title="Discover TV Shows"
        tvShows={displayedTVShows}
        action={(tvShow: BaseTVShowProps) => {
          return <AddToTVShowFavouritesIcon {...tvShow} />;
        }}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default TVHomePage;
