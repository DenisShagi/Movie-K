import { Input } from "antd";

const SearchMovie = ({ onChange, value }) => {
  const { Search } = Input;

  return (
    <>
      <Search
        placeholder="Input search text"
        enterButton="Search"
        size="large"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default SearchMovie;
