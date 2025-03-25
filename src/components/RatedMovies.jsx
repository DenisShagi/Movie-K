import { useContext, useEffect, useState } from "react";
import { Alert, Spin } from "antd";
import axios from "axios";

import { SessionContext } from "../SessionProvider";
import MovieCard from "./MovieCard";

const RatedMovies = () => {
  const {
    session,
    loading: sessionLoading,
    error: sessionError,
  } = useContext(SessionContext);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) return;
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/guest_session/${session.guest_session_id}/rated/movies?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDk4MzkyZjMyNDAzMjE2ZGU3YTU3ODlmOTU2MzNkOSIsIm5iZiI6MTc0MDk3ODczNi4wMzIsInN1YiI6IjY3YzUzYTMwNDhlZTkwMTVhYjdhNzIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AW8XrxA2kojgQozWLqAqxJqLWGekLs1X8cjI2SKDPf8",
      },
    })
      .then((response) => {
        setRatedMovies(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setRatedMovies([]);
          setLoading(false);
        } else {
          setError(err);
          setLoading(false);
        }
      });
  }, [session]);

  if (sessionLoading || !session) {
    return <Spin />;
  }
  if (sessionError) {
    return <Alert message="Ошибка загрузки сессии" type="error" />;
  }
  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Alert message={error.message} type="error" />;
  }
  return (
    <div>
      <h2>Оценённые фильмы</h2>
      {ratedMovies.length === 0 ? (
        <p>Вы ещё не оценивали фильмы.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {ratedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.original_title}
              path={movie.backdrop_path}
              date={movie.release_date}
              overview={movie.overview}
              rate={movie.rating}
              genreIds={movie.genre_ids}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RatedMovies;
