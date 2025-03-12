import { startTransition, useState } from "react";
import { Card, message, Rate } from "antd";

import DateCard from "./DateCard";

const MovieCard = ({
  title,
  path,
  date,
  overview,
  rate,
  movieId,
  onRateUpdate,
}) => {
  const [optimisticRate, setOptimisticRate] = useState(rate);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const trimText = (text) => {
    if (text.length > 202) {
      const truncated = text.substring(0, 200);
      const lastSpaceIndex = truncated.lastIndexOf(" ");
      if (lastSpaceIndex === -1) {
        return text.substring(0, 200) + "...";
      }
      return text.substring(0, lastSpaceIndex) + "...";
    }
    return text;
  };

  const handleRateChange = async (newRate) => {
    const previousRate = optimisticRate;
    // Обновляем оптимистично через startTransition
    startTransition(() => {
      setOptimisticRate(newRate);
    });

    try {
      await onRateUpdate(movieId, newRate);
      message.success("Рейтинг обновлён!");
    } catch (error) {
      startTransition(() => {
        setOptimisticRate(previousRate);
      });
      message.error("Ошибка обновления рейтинга");
    }
  };

  return (
    <Card style={{ display: "flex", alignItems: "center" }}>
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
          <span
            style={{
              borderRadius: "50%",
              border: "1px solid black",
              padding: "4px 8px",
            }}
          >
            {optimisticRate.toFixed(1)}
          </span>
        </header>
        <DateCard date={date} />
        <span>{trimText(overview)}</span>
        <footer>
          <Rate
            allowHalf
            value={optimisticRate}
            count={10}
            onChange={handleRateChange}
          />
        </footer>
      </article>
    </Card>
  );
};

export default MovieCard;
