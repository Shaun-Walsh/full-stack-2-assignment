import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { discoverMovies, getGenres } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { TextField, Button, Box, Container, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdvancedSearchPage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const navigate = useNavigate();

  const { data: genresData, error: genresError, isLoading: genresLoading } = useQuery<any, Error>(
    "genres",
    getGenres
  );

  const { data, error, isLoading, isError, refetch } = useQuery<any, Error>(
    ["discover", selectedGenre, yearFrom, yearTo],
    () => discoverMovies({ 
      genres: selectedGenre ? [selectedGenre] : [], 
      yearFrom: yearFrom, 
      yearTo: yearTo 
    }),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  const handleAdvancedSearch = () => {
    if (selectedGenre || yearFrom || yearTo) {
      refetch();
    }
  };


  if (genresLoading) {
    return <Spinner />;
  }

  if (genresError) {
    return <h1>{genresError.message}</h1>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <PageTemplate
        title="Advanced Search"
        movies={data ? data.results : []}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
      />

      <Container>
        <Button
          variant="text"
          onClick={() => navigate("/search")}
        >
          ← Back to Simple Search
        </Button>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              label="Genre"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {(genresData?.genres || []).map((genre: any) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="From Year"
            type="number"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
          />

          <TextField
            label="To Year"
            type="number"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
          />

          <Button
            onClick={handleAdvancedSearch}
            disabled={!selectedGenre && !yearFrom && !yearTo}
          >
            Search Movies
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AdvancedSearchPage;
