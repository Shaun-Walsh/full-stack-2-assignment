import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch"; //NEW Exercise 4 
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

// Pagination is used to navigate through the pages of the upcoming movies by using the page state to send the page number to the getUpcomingMovies function
// keepPreviousData is used to keep the previous data when the page is changed, so that the data is not lost when the page is changed
// Sourced from https://tanstack.com/query/v3/docs/framework/react/guides/paginated-queries

const UpcomingMovies: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError, isFetching } = useQuery<DiscoverMovies, Error>(
    ["upcoming", page],
    () => getUpcomingMovies(page),
    {
      keepPreviousData: true,
    }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

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

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

// MUI Pagination component is used to navigate through the pages of the upcoming movies by using the page state to send the page number to the getUpcomingMovies function 
// source: https://mui.com/material-ui/react-pagination/
  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToMustWatchIcon {...movie} /> //NEW Exercise 4
        }}
      />
      <MovieFilterUI
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
export default UpcomingMovies;