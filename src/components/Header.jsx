import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ display: "flex", justifyContent: "center" }}>
      <Button type="link">
        <Link to="/" className="hover-underline">
          Search
        </Link>
      </Button>
      <Button type="link">
        <Link to="/rated" className="hover-underline">
          Rated
        </Link>
      </Button>
    </header>
  );
};

export default Header;
