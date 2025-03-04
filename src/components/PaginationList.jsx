import { Pagination } from "antd";

const PaginationList = ({ total, onChange, current }) => {
  return (
    <>
      <Pagination
        defaultCurrent={1}
        align="center"
        total={total}
        onChange={onChange}
        pageSize={6}
        current={current}
      />
    </>
  );
};

export default PaginationList;
