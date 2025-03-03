import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import axios, { Axios } from "axios";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          justifyContent: "center",
        }}
      >
        {movieList.map((movie) => (
          <Card key={movie.id} style={{ width: "450px", marginBottom: 30 }}>
            <span style={{ display: "flex", flexWrap: "nowrap" }}>
              <img
                src={`${imageBaseUrl}${movie.backdrop_path}`}
                alt=""
                style={{ maxWidth: 300 }}
              />
              <li>{movie.original_title}</li>
            </span>
          </Card>
        ))}
      </div>
    </>
  );
}

export default React.memo(Movie);
