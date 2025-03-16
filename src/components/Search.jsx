import { Input } from "antd";

const SearchMovie = ({ onChange, value }) => {
  const { Search } = Input;

  return (
    <>
      <Search style={{padding: '32px'}}
        placeholder="Type to search..."
        enterButton="Search"
        size="large"
        onChange={onChange}
        value={value}
        autoFocus
      />
    </>
  );
};

export default SearchMovie;
