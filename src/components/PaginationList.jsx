import { ConfigProvider, Pagination } from "antd";

const PaginationList = ({ total, onChange, current }) => {
  return (
    <>
    <ConfigProvider theme={{
      components: {
        Pagination: {
          colorPrimary: '#fff',
          itemActiveBg: '#1890FF'
        }
      }
    }}>
 <Pagination
        defaultCurrent={1}
        align="center"
        total={total}
        onChange={onChange}
        pageSize={6}
        current={current}
      />
    </ConfigProvider>
     
    </>
  );
};

export default PaginationList;
