import { Card, Rate } from "antd";

import DateCard from "./DateCard";

const MovieCard = ({ title, path, date, overview, rate }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Card styles={{ body: { display: "flex", alignItems: "center" } }}>
      <img
        src={`${imageBaseUrl}${path}`}
        alt={title}
        style={{
          marginRight: "16px",
          width: 183,
          height: 281,
          objectFit: "cover",
        }}
      />
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          textAlign: "left",
          maxWidth: 280,
          height: 260,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ fontSize: 20, margin: 0 }}>{title}</h5>
          <span style={{ borderRadius: 50, border: "1px solid black" }}>
            {rate.toFixed(1)}
          </span>
        </header>
        <DateCard date={date} />
        <span>{overview}</span>
        <footer>
          <Rate disabled allowHalf defaultValue={rate} count={10} />
        </footer>
      </article>
    </Card>
  );
};

export default MovieCard;
