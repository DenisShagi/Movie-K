import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, ConfigProvider, Spin } from "antd";
import axios from "axios";
import { useDebounce } from "use-debounce";

import { SessionContext } from "../SessionProvider";
import MovieCard from "./MovieCard";
import PaginationList from "./PaginationList";
import SearchMovie from "./Search";

const MovieList = () => {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 500);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ctx = useContext(SessionContext);

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const onRateUpdate = async (movieId, newRate) => {
    try {
      await axios({
        method: "post",
        url: `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${ctx.session.guest_session_id}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDk4MzkyZjMyNDAzMjE2ZGU3YTU3ODlmOTU2MzNkOSIsIm5iZiI6MTc0MDk3ODczNi4wMzIsInN1YiI6IjY3YzUzYTMwNDhlZTkwMTVhYjdhNzIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AW8XrxA2kojgQozWLqAqxJqLWGekLs1X8cjI2SKDPf8",
        },
        data: { value: newRate },
      });
    } catch (error) {
      throw error;
    }
  };

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
    const source = axios.CancelToken.source();
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
      cancelToken: source.token,
    })
      .then((response) => {
        setList(response.data.results);
        setLoading(false);
        setCurrentPage(1);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Запрос отменён:", err.message);
        } else {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      source.cancel("Операция отменена из-за нового запроса.");
    };
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
      ) : ctx.loading || !ctx.session ? (
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
            {list.slice(startIndex, endIndex).map((movie) => (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.original_title}
                path={movie.backdrop_path}
                date={movie.release_date}
                overview={movie.overview}
                rate={movie.vote_average}
                onRateUpdate={onRateUpdate}
                genreIds={movie.genre_ids} // Передаём массив genre_ids
              />
            ))}
          </div>
          <div style={{padding: '10px'}}>
           
            <PaginationList
            total={list.length}
            onChange={(page) => setCurrentPage(page)}
            current={currentPage}
            
          />
          </div>
        </>
      )}
    </>
  );
};

export default MovieList;
