export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id: string | number) => {
  //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getMovieCredits = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie credits. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getActor = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get actor data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

// Fixed to fetch actual upcoming movies by using primary_release_date instead of release_date
// This ensures movies returned are upcoming within the specified date range from the .env file
export const getUpcomingMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${
      import.meta.env.VITE_MIN_DATE
    }&primary_release_date.lte=${import.meta.env.VITE_MAX_DATE}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTVShows = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch TV shows. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTVShow = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get TV show data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTVGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch TV genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTVShowImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getTVShowReviews = (id: string | number) => {
  //TV show id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent is used to encode special characters in the query string
   so that it can be safely passed as a URL parameter
   also see: https://www.w3schools.com/tags/ref_urlencode.ASP without encoding the query string it would break the url */
export const searchMovies = (query: string, page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to search movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

/* Discover movies by criteria (genre, year range) using TMDB discover API
   This complements searchMovies by allowing filtering rather than text-based search */
export const discoverMovies = (criteria: any, page = 1) => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: "en-US",
    page: page.toString(),
    sort_by: "popularity.desc",
    include_adult: "false",
  });

  // Add genre filter if selected
  if (criteria.genres?.length > 0) {
    params.append("with_genres", criteria.genres.join(","));
  }

  // Add year range filters if provided
  if (criteria.yearFrom) {
    params.append("primary_release_date.gte", `${criteria.yearFrom}-01-01`);
  }

  if (criteria.yearTo) {
    params.append("primary_release_date.lte", `${criteria.yearTo}-12-31`);
  }

  return fetch(`https://api.themoviedb.org/3/discover/movie?${params}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to discover movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};