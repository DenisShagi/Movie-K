import { BrowserRouter, Route, Routes } from "react-router";

import MovieList from "./components/MovieList";
import RatedMovies from "./components/RatedMovies";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/rated" element={<RatedMovies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
