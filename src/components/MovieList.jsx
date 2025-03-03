import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./MovieCard";

const MovieList = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDk4MzkyZjMyNDAzMjE2ZGU3YTU3ODlmOTU2MzNkOSIsIm5iZiI6MTc0MDk3ODczNi4wMzIsInN1YiI6IjY3YzUzYTMwNDhlZTkwMTVhYjdhNzIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AW8XrxA2kojgQozWLqAqxJqLWGekLs1X8cjI2SKDPf8",
      },
    })
      .then((response) => {
        setList(response.data.results);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);
  return (
    <>
      {error && <p>{error}</p>}
      {console.log(list)}
      {list.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.original_title}
          path={movie.backdrop_path}
          date={movie.release_date}
          overview={movie.overview}
          rate={movie.vote_average}
        />
      ))}
    </>
  );
};

export default MovieList;
