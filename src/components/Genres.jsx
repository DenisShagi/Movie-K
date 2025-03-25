import { useEffect, useState } from "react";
import axios from "axios";

// Задаём значение по умолчанию для genreIds - пустой массив.
const Genres = ({ genreIds = [] }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDk4MzkyZjMyNDAzMjE2ZGU3YTU3ODlmOTU2MzNkOSIsIm5iZiI6MTc0MDk3ODczNi4wMzIsInN1YiI6IjY3YzUzYTMwNDhlZTkwMTVhYjdhNzIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AW8XrxA2kojgQozWLqAqxJqLWGekLs1X8cjI2SKDPf8",
      },
    })
      .then((response) => {
        setAllGenres(response.data.genres);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) return <div>Ошибка загрузки жанров</div>;
  if (!allGenres.length) return <div>Загрузка жанров...</div>;

  const filteredGenres = allGenres.filter((genre) =>
    genreIds.includes(genre.id)
  );

  return (
    <div>
      {filteredGenres.map((genre) => (
        <span
          key={genre.id}
          style={{
            marginRight: "5px",
            padding: "2px 4px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "0.8em",
          }}
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default Genres;
