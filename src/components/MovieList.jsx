import React, { useEffect, useState } from "react";
import { Alert, Button, Spin } from "antd";
import axios from "axios";

import MovieCard from "./MovieCard";

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {error && (
        <Alert
          message={error.message}
          showIcon
          description="Error Description. Error Description. Error Description."
          type="error"
          action={
            <Button size="small" danger>
              Detail
            </Button>
          }
        />
      )}
      {console.log(list)}
      {loading ? (
        <Spin />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
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
        </div>
      )}
    </>
  );
};

export default MovieList;
