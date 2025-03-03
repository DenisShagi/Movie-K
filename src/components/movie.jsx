import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios, { Axios } from "axios";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      axios({
        method: "get",
        url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDk4MzkyZjMyNDAzMjE2ZGU3YTU3ODlmOTU2MzNkOSIsIm5iZiI6MTc0MDk3ODczNi4wMzIsInN1YiI6IjY3YzUzYTMwNDhlZTkwMTVhYjdhNzIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AW8XrxA2kojgQozWLqAqxJqLWGekLs1X8cjI2SKDPf8",
        },
      }).then((response) => {
        setMovieList(response.data.results);
      });
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {console.log(movieList)}
      <ul>
        {movieList.map((movie) => (
          <Card key={movie.id}>
            <li>{movie.original_title}</li>
          </Card>
        ))}
      </ul>
    </>
  );
}

export default React.memo(Movie);
