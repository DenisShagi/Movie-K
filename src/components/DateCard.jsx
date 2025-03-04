const DateCard = ({ date }) => {
  const data = new Date(date);
  const formattedDate = data.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <span>{formattedDate}</span>
    </>
  );
};

export default DateCard;
