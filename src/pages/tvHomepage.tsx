import React, { useState } from "react";
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
import { Pagination, Box } from "@mui/material";

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

// Pagination is used to navigate through the pages of the TV shows by using the page state to send the page number to the getTVShows function
// keepPreviousData is used to keep the previous data when the page is changed, so that the data is not lost when the page is changed
// Sourced from https://tanstack.com/query/v3/docs/framework/react/guides/paginated-queries

const TVHomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError, isFetching } = useQuery<DiscoverTVShows, Error>(
    ["discover-tv", page],
    () => getTVShows(page),
    {
      keepPreviousData: true,
    }
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

// MUI Pagination component is used to navigate through the pages of the TV shows by using the page state to send the page number to the getTVShows function 
// source: https://mui.com/material-ui/react-pagination/
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
      <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 2 }}>
        <Pagination 
          count={data?.total_pages || 1} 
          page={page} 
          onChange={(_, value) => setPage(value)}
          disabled={isFetching}
          color="primary"
          size="large"
        />
      </Box>
      {isFetching && <Box textAlign="center" sx={{ mt: 1 }}>Loading...</Box>}
    </>
  );
};
export default TVHomePage;
