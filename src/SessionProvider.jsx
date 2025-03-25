import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("guestSession");
    if (stored && stored !== "undefined") {
      try {
        const storedSession = JSON.parse(stored);
        setSession(storedSession);
        setLoading(false);
      } catch (e) {
        console.error("Ошибка парсинга сессии из localStorage:", e);
        localStorage.removeItem("guestSession");
      }
    } else {
      axios({
        method: "get",
        url: "https://api.themoviedb.org/3/authentication/guest_session/new",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDk4MzkyZjMyNDAzMjE2ZGU3YTU3ODlmOTU2MzNkOSIsIm5iZiI6MTc0MDk3ODczNi4wMzIsInN1YiI6IjY3YzUzYTMwNDhlZTkwMTVhYjdhNzIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AW8XrxA2kojgQozWLqAqxJqLWGekLs1X8cjI2SKDPf8",
        },
      })
        .then((response) => {
          console.log("Полученная сессия:", response.data);
          if (response.data.success) {
            localStorage.setItem("guestSession", JSON.stringify(response.data));
            setSession(response.data);
          } else {
            console.error("Не удалось создать гостевую сессию:", response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
};
