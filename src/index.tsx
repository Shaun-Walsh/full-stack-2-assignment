import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMovies from "./pages/upcomingMovies"; // NEW
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TVHomePage from "./pages/tvHomepage";
import FavouriteTVShowsPage from "./pages/favouriteTVShowsPage";
import TVShowDetailsPage from "./pages/tvShowDetailsPage";
import TVShowContextProvider from "./contexts/tvShowContext";
import AddTVShowReviewPage from './pages/addTVShowReviewPage';
import TVShowReviewPage from "./pages/tvShowReviewPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import SearchPage from "./pages/searchPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <TVShowContextProvider>
            <Routes>
              <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMovies />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/tv" element={<TVHomePage />} />
              <Route path="/tv/favourites" element={<FavouriteTVShowsPage />} />
              <Route path="/tv/:id" element={<TVShowDetailsPage />} />
              <Route path="/tv/reviews/:id" element={<TVShowReviewPage />} />
              <Route path="/tv/reviews/form" element={<AddTVShowReviewPage />} />
              <Route path="/actor/:id" element={<ActorDetailsPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </TVShowContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

