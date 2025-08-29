import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
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

// Pagination is used to navigate through the pages of the movies by using the page state to send the page number to the getMovies function
// keepPreviousData shows previous page data while loading new page to prevent UI flickering/loading states
// Sourced from https://tanstack.com/query/v3/docs/framework/react/guides/paginated-queries link in tutors leads to a slightly different implementation of pagination

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError, isFetching } = useQuery<DiscoverMovies, Error>(
    ["discover", page],
    () => getMovies(page),
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

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

// MUI controlled pagination component navigates through movie pages using controlled page state. Pagination is disabled when fetching new data to prevent UI flickering/loading states
// Follows controlled pagination pattern from: https://mui.com/material-ui/react-pagination/#controlled-pagination
  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
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
export default HomePage;
