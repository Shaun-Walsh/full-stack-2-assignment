import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { searchMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { TextField, Button, Box, Container } from "@mui/material";

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading, isError, refetch } = useQuery(
    ["search", searchQuery],
    () => searchMovies(searchQuery),
    {
      enabled: false, // Component was searching as soon as user started typing, this is a workaround to disable it
      cacheTime: 0, // Required to stop automatic searches if user types a term already found in cache
    }
  );

  /* Manual search trigger function
    Uses refetch() to manually execute the useQuery call when user clicks search button
    This is necessary because we set enabled: false to prevent auto-searching on every keystroke */
  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      refetch(); // Manually triggers the API call defined in useQuery above
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error)?.message || "An error occurred"}</h1>;
  }

  const results = data ? data.results : [];

  return (
    <>
      <PageTemplate
        title={
          results.length > 0
            ? `Movie Results: "${searchQuery}"`
            : "Search Movies"
        }
        movies={results}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
      />

      <Container sx={{ marginTop: 2, marginBottom: 3 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Search Movies"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
          >
            Search
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SearchPage;
