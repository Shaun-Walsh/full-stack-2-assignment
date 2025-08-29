export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    id: string;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export type FilterOption = "title" | "genre";

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}
export interface Review {
  id: string;
  content: string;
  author: string;
}

export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

export interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}
export interface Review {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

export interface BaseTVShowProps {
  name: string;
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  backdrop_path?: string;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
  origin_country?: string[];
  adult?: boolean;
}

export interface TVShowDetailsProps extends BaseTVShowProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface DiscoverTVShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTVShowProps[];
}

export interface BaseTVShowListProps {
  tvShows: BaseTVShowProps[];
  action: (t: BaseTVShowProps) => React.ReactNode;
}

export interface TVShowListPageTemplateProps extends BaseTVShowListProps {
  title: string;
}

export interface TVShowReview {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  tvShowId: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  credit_id: string;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
}

export interface ActorDetailsProps {
  id: number;
  name: string;
  biography: string;
  birthday?: string;
  place_of_birth?: string;
  profile_path?: string;
  known_for_department: string;
  popularity: number;
}
