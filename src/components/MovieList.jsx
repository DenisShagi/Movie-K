import React, { useEffect, useState } from "react";
import { Alert, Button, Spin } from "antd";
import axios from "axios";
import { useDebounce } from "use-debounce";

import MovieCard from "./MovieCard";
import SearchMovie from "./Search";

const MovieList = () => {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 500);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [initialList, setInitialList] = useState([]);
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
        setInitialList(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!debouncedText.trim()) {
      setList(initialList);
      return;
    }
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${debouncedText}`,
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
        console.error(err);
        setLoading(false);
        setError(err);
      });
  }, [debouncedText, initialList]);
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
      {loading ? (
        <Spin />
      ) : (
        <>
          <SearchMovie onChange={(e) => setText(e.target.value)} value={text} />
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
        </>
      )}
    </>
  );
};

export default MovieList;
